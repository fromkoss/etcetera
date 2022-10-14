import React, {useEffect, useMemo, useState} from 'react';
import ProductPrice from "../product/ProductPrice.jsx";
import QuickView from "../quick-view/QuickView.jsx";

const ProductCard = ({ product, showBtn = true, ...props }) => {
    const [isQuickViewOpened, setQuickViewOpened] = useState(false);
    const [variant, setVariant] = useState({...product.variants.find(variant => variant.id === product.current_variant.id)});

    const badge = useMemo(() => {
        const badges = [];
        product.tags.forEach((tag) => {
           if (window.productBadges[tag]){
               badges.push(window.productBadges[tag]);
           }
        });
        return badges[0] || null;
    }, [product]);
    return (
        <div className="product">
            <a href={product.url} className="product__image-wrapper" title={product.title} >
                <img src={product.featured_image} className="product__image " alt={product.title}/>
            </a>
            <div className="product__title product__title--card text-center">
                <a href={product.url}>{product.title}</a>
            </div>
            {!!badge && (
                <span className="badge badge--sale"><span>{badge}</span></span>
            )}
            <ProductPrice className="product__prices text-center" price={product.price} compareAtPrice={product.compare_at_price}/>
            <div className="product__btns">
                {showBtn && (
                    <button
                        className="btn btn--secondary btn--full"
                        onClick={() => setQuickViewOpened(true)}
                    >
                        {window.translations.product.addToCart}
                    </button>
                )}
                <a className="btn btn--primary btn--full" href={product.url}>{window.translations.product.details}</a>
            </div>
            <QuickView
                product={product}
                opened={isQuickViewOpened}
                variant={variant}
                onVariantChange={(variant) => setVariant({...variant})}
                onClose={()=>setQuickViewOpened(false)
            }/>
        </div>
    );
};

export default ProductCard;
