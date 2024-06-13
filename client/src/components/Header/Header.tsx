import {FC} from "react";

import HeaderTop from "./HeaderTop";
import HeaderMiddle from "./HeaderMiddle";
import HeaderBottom from "./HeaderBottom";


export const Header: FC = () => {
    return (
        <header className="header">
            <div className="header__wrapper">
                <HeaderTop/>
                <HeaderMiddle/>
                <HeaderBottom/>
            </div>
        </header>
    );
};
