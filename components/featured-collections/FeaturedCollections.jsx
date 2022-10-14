import React, { useEffect, useState } from 'react';
import {createRoot} from "react-dom/client";
import Slider from "react-slick";
import ProductCard from "../product-card/ProductCard.jsx";


const FeaturedCollection = ({ settings }) => {
    const [activeTab, setActiveTab] = useState(0);
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: settings.items_desktop || 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: settings.items_mobile || 1,
                }
            }
        ]
    };
    return (
        <div className="featured-collections">
            <div className="featured-collections__tabs">
                {settings.tabs?.map((tab, index) => (
                    <div
                        className={`featured-collections__tab ${activeTab === index ? 'featured-collections__tab--active': ''}`}
                        key={index}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.title}
                    </div>
                ))}
            </div>
            <div className="featured-collections__products">
                {settings.tabs?.map((tab, index) => index === activeTab ? (
                    <Slider {...sliderSettings} key={index}>
                        {settings.tabs[activeTab].products.map((product) => (
                            <ProductCard key={product.id} product={product} showBtn={settings.show_cart_btn}/>
                        ))}
                    </Slider>
                ) : null )}

            </div>
        </div>
    );
};

const container = document.getElementById('featured-collections');
if (container) {
    const root = createRoot(container);
    const data = JSON.parse(document.getElementById('featured-collections-data').innerHTML);
    root.render(<FeaturedCollection settings={data} />);
}
