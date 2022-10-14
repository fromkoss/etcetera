import React, { useEffect } from 'react';


const SelectOptionValue = ({
  value,
  position,
  currentVariant,
}) => {
  const options = [...(currentVariant.options || [])];
  options[position] = value;
  return (
    <option value={value}>
      {value}
    </option>
  );
};

const SelectOption = ({
  option,
  position,
  currentValue,
  currentVariant,
  product,
  changeOption,
}) => {
  return (
    <div
      className="selector-wrapper"
    >
      <label>{option.name}</label>
      <select
          className="product-option__select"
          aria-label="Option select"
          value={currentValue}
          onChange={(event) => changeOption(event.target.value, position)}
      >
        {option.values.map((value, index) => (
            <SelectOptionValue
                value={value}
                currentVariant={currentVariant}
                product={product}
                position={position}
                key={index}
            />
        ))}
      </select>
    </div>
  );
};

const ProductOption = ({
  currentVariant,
  position,
  product,
  option,
  ...props
}) => {
  const options = [...(currentVariant.options || [])];
  const currentValue = options[position];

  return (
    <SelectOption
      currentValue={currentValue}
      currentVariant={currentVariant}
      product={product}
      position={position}
      option={option}
      {...props}
    />
  );
};

export default ProductOption;
