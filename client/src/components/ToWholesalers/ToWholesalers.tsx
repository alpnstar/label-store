import React, {FC} from "react";
import {About} from "../About/About";


export const ToWholesalers: FC = () => {

    return (
        <About title={'Оптовикам'}>
            <p>Для того,чтобы сделать заказ в нашем интернет-магазине и получить открытый доступ к ценам Вам
                необходимо зарегистрироваться как оптовый покупатель.</p>

            <p>Чтобы заказ был сформирован нужно лишь добавить товар в корзину и нажать кнопку оформить заказ. В
                течение 1 часа наш менеджер свяжется с Вами для уточнения сроков поставки и метода оплаты.</p>

            <h2>Условия работы и доставка</h2>

            <ul>
                <li>Заказ на сумму от 30 000 руб.</li>
                <li>Отправка заказов осуществляется после 100% оплаты.</li>
                <li>Оплата производится в рублях по безналичному расчету на наш расчетный счет.</li>
                <li>Продукция высылается транспортными компаниями, после согласования с покупателем. Услуги
                    транспортной компании оплачивает покупатель.
                </li>
                <li>Доставка грузов осуществляется любой транспортной компанией.</li>
            </ul>

            <p>Телефон/whtsp: +7 (920) 872-70-40
                Телефон/whtsp: +7 (925) 888-94-83</p>

            <p>E-mail: <a href="mailto:bayevs@mail.ru">bayevs@mail.ru</a></p>

            <h2>Обмен и возврат товара</h2>

            <p>Возврат или обмен товара, возможен, только в случае производственного брака, в течение 14 календарных
                дней с момента получения груза и при условии сохранности упаковки и бирки. Возврат товаров
                осуществляется за счет Покупателя. Возврат по причинам, не связанным с производственным браком,
                руководствуется законодательством РФ. При осуществлении согласованного возврата, деньги возвращаются
                Покупателю в течение 7 календарных дней с момента получения товара Поставщиком.</p>
        </About>
    );
};