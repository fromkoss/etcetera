import React from 'react';
import ProductOption from './ProductOption.jsx';

const ProductOptions = ({ options, ...props }) => {
  return (
    <div className="product-options">
      {options.map((option, index) => (
        <ProductOption
          key={index}
          option={option}
          position={index}
          {...props}
        />
      ))}
    </div>
  );
};

export default ProductOptions;
