import React, { useEffect, useState } from 'react';
import {createRoot} from "react-dom/client";
import ProductForm from "./ProductForm.jsx";

const Product = ({ product }) => {
    const [variant, setVariant] = useState({...product.variants.find(variant => variant.id === product.current_variant.id)});
    return (
        <>
            <ProductForm
                product={product}
                variant={variant}
                updateHistory={true}
                onVariantChange={(variant) => setVariant({...variant})}
            />
        </>
    );
};

const container = document.getElementById('product-main');

if (container) {
    const root = createRoot(container);
    const data = JSON.parse(document.getElementById('product-main-data').innerHTML);
    root.render(<Product product={data} />);
}
