import React, {FC, useEffect, useState} from "react";
import "./productSingle.scss";
import {useToggler} from "../../hooks/useToggler";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {Product} from "../../types/types";
import {useParams} from "react-router";
import {useGetProductByIdQuery} from "../../store/query/productsApi";
import {MainButton} from "../UI/MainButton/MainButton";
import ImageView from "../UI/ImageView/ImageView";
import {Breadcrumbs} from "../UI/Breadcrumbs/Breadcrumbs";
import {Loader} from "../UI/Loader/Loader";
import {NotFound} from "../UI/NotFound/NotFound";
import {Counter} from "../UI/Counter/Counter";
import {cartActions} from "../../store/slices/cartSlice";

export interface SizesState {
    [key: string]: { count: number, name: string, maxCount: number };
}

const ProductSingle: FC = () => {
    const params = useParams<{ id: string }>();
    const profile = useAppSelector(state => state.userReducer.userProfile);
    const {data, refetch, isSuccess, isError, isFetching} = useGetProductByIdQuery(params.id as string);
    const [product, setProduct] = useState<Product>();
    const [sizes, setSizes] = useState<SizesState>({});
    const [currentSku, setCurrentSku] = useState(0);
    const [imageView, setImageViewHandler] = useToggler(false);
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [maxCounts, setMaxCounts] = useState<{ [key: string]: string | number }>({});
    const cartItems = useAppSelector(state => state.cartReducer.items);
    const [isEmpty, setIsEmpty] = useState(true);
    const dispatch = useAppDispatch();

    function setSelectedImageHandler(i: number) {
        return function () {
            setSelectedImage(i);
        };
    }


    function imageClickHandler(index: number) {
        return function () {
            setSelectedImageHandler(index)();
            setImageViewHandler(true);

        };
    }

    useEffect(() => {
        Object.values(sizes).some(item => item.count) ? setIsEmpty(false) : setIsEmpty(true);
    }, [sizes]);

    function addToCartHandler(e: React.MouseEvent<HTMLButtonElement>) {
        addToCart(e);
        setSizes(prev => {
            const clearedSizes: any = {};
            Object.keys(prev).map(item => {
                clearedSizes[item] = {
                    ...prev[item],
                    count: 0,
                };
            })
            return clearedSizes;

        })
    }

    function addToCart(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        product && dispatch(cartActions.addItem({
            id: product.id,
            attributes: product.attributes,
            addedSizes: sizes,
        }));

    }

    useEffect(() => {
        const findedElem = cartItems.find(item => item.id === product?.id);
        console.log(findedElem)
        if (findedElem) {
            Object.keys(findedElem.addedSizes).map(item => {
                setMaxCounts(prevState => {
                    return {
                        ...prevState,
                        [item]: Math.max(+findedElem.addedSizes[item].maxCount - +findedElem.addedSizes[item].count, 0),
                    }
                })
            })
        }
    }, [cartItems, product]);
    console.log('max', maxCounts)
    console.log('sizes',sizes)
    useEffect(() => {
        if (data) setProduct(data.data);
    }, [data]);
    useEffect(() => {
        refetch();
    }, [params.id]);
    return (
        <section className="product-single">
            <div className="product-single__wrapper container">
                {
                    isFetching ? <Loader/> : isError ? <NotFound/> : (product && data) ?
                        <>
                            <div className="product-single__breadcrumbs">
                                {<Breadcrumbs items={data.breadcrumbs}/>}
                            </div>
                            <div className="product-single__main">
                                <div className="product-single__view">
                                    <div onClick={imageClickHandler(0)} className="product-single__view-main">
                                        <img src={product.attributes.media[0].attributes.generated_conversions.list}
                                             alt=""/>
                                    </div>
                                    <div className="product-single__view-other">
                                        {product.attributes.media.map((item, index) =>
                                            index !== 0 ?
                                                <img key={index} onClick={imageClickHandler(index)}
                                                     src={item.attributes.generated_conversions.list} alt=""/> : "")}
                                    </div>
                                </div>
                                <div className="product-single__info">
                                    <h1 className="product-single__info-title main-h1">
                                        {product.attributes.name}
                                    </h1>
                                    <span
                                        className="product-single__code">Артикул: {product.attributes.skus[0].attributes.code}</span>
                                    {profile && <h1 className="product-single__info-price main-h2">
                                        {product.attributes.skus[currentSku].attributes.price.formatted}

                                    </h1>}
                                    <div className="product-single__character">
                                        {product.attributes.skus[currentSku].attributes.attributeOptions.map((attrs, index) =>
                                            <div key={index} className="product-single__character-item">
                                                {attrs.attributes.label}: <b>{attrs.attributes.value}</b>
                                            </div>
                                        )}
                                    </div>

                                    {profile && <>
                                        <div className="product-single__sizes">
                                            <h2 className="product-single__sizes-title ">Размеры:</h2>
                                            <div className="product-single__sizes-list">
                                                {product.attributes.skus[0].attributes.sizes.map((item, index) => (
                                                    <div key={
                                                        index
                                                    } className="product-single__sizes-item">
                                                <span
                                                    className="product-single__sizes-item-name">{item.attributes.name}:</span>
                                                        <Counter item={item} sizes={sizes} setSizes={setSizes}
                                                                 maxCount={maxCounts[item.attributes.name] !== undefined ? maxCounts[item.attributes.name] : item.attributes.stock}/>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>

                                        <MainButton
                                                    isDisabled={isEmpty} onClick={addToCartHandler}
                                                    text="Добавить в корзину"/>
                                    </>}
                                </div>
                            </div>
                            <ImageView display={imageView} setDisplay={setImageViewHandler}
                                       data={product.attributes.media}
                                       indexSelectedImage={selectedImage}/>
                        </> : ''
                }
            </div>

        </section>
    );
};

export default ProductSingle;