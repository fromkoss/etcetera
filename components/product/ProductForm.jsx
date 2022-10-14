import React, { useEffect, useState, useMemo } from 'react';
import ProductOptions from './ProductOptions.jsx';
import ProductCartModal from "./ProductCartModal.jsx";
import ProductOOS from "./ProductOOS.jsx";
import ProductPrice from "./ProductPrice.jsx";

const updateUrlParameter =  (url, key, value) => {
  const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
  const separator = url.indexOf('?') === -1 ? '?' : '&';

  if (url.match(re)) {
    return url.replace(re, '$1' + key + '=' + value + '$2');
  } else {
    return url + separator + key + '=' + value;
  }
};

const ProductForm = ({
  product,
  onVariantChange,
  variant,
  updateHistory = false
}) => {
  const [isModalOpened, setModalOpened] = useState(false);
  const [isOutOfStockOpened, setOutOfStockOpened] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [price, setPrice] = useState(variant.price);
  const [promoCode, setPromoCode] = useState('');
  const [compareAtPrice, setCompareAtPrice] = useState(
      variant.compare_at_price,
  );

  const handleOptionChange = (value, position) => {
    const options = [...(variant.options || [])];
    options[position] = value;

    const newVariant = product.variants.find(
      (item) => item.options.join('|') === options.join('|'),
    );
    if (newVariant) {
      onVariantChange(newVariant);
      setPrice(newVariant.price);
      setCompareAtPrice(newVariant.compare_at_price);
      if (updateHistory) {
        window.history.replaceState('', '', updateUrlParameter(window.location.href, "variant", newVariant.id));
      }
    }
  };

  const addToCartHandle = (event) => {
    event.preventDefault();
    const promises = [];
    setLoading(true);
    promises.push(
      window.addToCartItems([
        {
          id: variant.id,
          quantity: 1,
        }
      ])
    );
    if (promoCode.length) {
      promises.push(
          window.applyDiscount(promoCode)
      );
    }
    Promise.all(promises).finally(() => {
      setLoading(false);
      setModalOpened(true);
    });
  }

  return (
    <>
      <ProductPrice price={price} compareAtPrice={compareAtPrice}/>
      <div className="product-single__policies rte">{window.translations.product.inStock}: {variant.quantity}</div>
      <div className="product-form">
        {!product.has_only_default_variant && (
            <ProductOptions
                product={product}
                options={product.options}
                variants={product.variants}
                currentVariant={variant}
                changeOption={handleOptionChange}
            />
        )}
        <div>
          <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder={window.translations.cart.enterCode}/>
        </div>
        <div className="product-single__cart-submit-wrapper product-single__shopify-payment-btn">
          {variant.available && !product.metafields?.details?.disabled ? (
              <button
                  type="button"
                  className="btn product-single__cart-submit shopify-payment-btn btn--secondary"
                  onClick={addToCartHandle}
              >
                <span id="AddToCartText">{window.translations.product.addToCart}</span>
              </button>
          ) : (
              <div className="shopify-payment-button">
                <button
                    type="button"
                    className="btn product-single__cart-submit shopify-payment-btn btn--primary"
                    onClick={()=>setOutOfStockOpened(true)}
                >
                  <span>{window.translations.newsletter.contactUs}</span>
                </button>
              </div>
          )}
        </div>
        {isLoading && (
            <div className="product-form--loader">
              <img src={window.loaderUrl}/>
            </div>
        )}
      </div>
      <ProductCartModal opened={isModalOpened} onClose={()=>setModalOpened(false)}/>
      <ProductOOS opened={isOutOfStockOpened} onClose={()=>setOutOfStockOpened(false)}/>
    </>
  );
};

export default ProductForm;
