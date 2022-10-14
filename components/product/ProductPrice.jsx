import React from 'react';
import {formatMoney} from "@shopify/theme-currency";

const ProductPrice = ({ price, compareAtPrice, className = 'product-single__prices', ...props }) => {
  return (
      <div className={className}>
        <span className="product-single__price">{formatMoney(price, window.theme.moneyFormat)}</span>
        {compareAtPrice > price && (
            <s className="product-single__price--compare" id="ComparePrice">
              {formatMoney(compareAtPrice, window.theme.moneyFormat)}
            </s>
        )}
      </div>
  );
};

export default ProductPrice;
