import React, {useEffect} from 'react';
import {useParams} from "react-router";
import './news.scss';
import {useLazyGetNewsByIdQuery} from "../../store/query/newsApi";

const NewsCard = () => {
    const params = useParams();
    const [trigger, {data, isError, isFetching, isSuccess}] = useLazyGetNewsByIdQuery();

    useEffect(() => {
       params.id && trigger(params.id);
    }, [params.id]);

    return (
        data ?
            <div className="news-card">
                <div className="news-card__wrapper container">
                    <h1 className="news-card__title main-h1">
                        {data.data.attributes.title}</h1>

                    <div className="news-card__content">

                        <p><span className="news-card__img-wrapper">
                            <img src={data.data.attributes.media[0].attributes.generated_conversions.list} alt=""/>
                        </span>{data.data.attributes.content}</p>
                    </div>

                </div>
            </div>
             : ''
    )
        ;
};

export default NewsCard;