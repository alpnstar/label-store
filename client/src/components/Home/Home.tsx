import React, {FC} from "react";
import Slider from "../Slider/Slider";
import PopularProducts from "../PopularProducts/PopularProducts";
import HomeAbout from "../HomeAbout/HomeAbout";

const Home: FC = () => {
    return (
        <div className="home">
            <Slider/>
            <PopularProducts/>
            <HomeAbout/>

        </div>
    );
};

export default Home;