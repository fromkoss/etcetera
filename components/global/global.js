/**
 *
 * @param {Array} items
 * @returns {Promise<any>}
 */
window.addToCartItems = (items) => {
    return fetch('/cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
    }).then((response) => {
        const event = new CustomEvent('addToCart');
        document.dispatchEvent(event);
        return response.json();
    });
};

/**
 *
 * @param discount
 * @returns {Promise<Response>}
 */
window.applyDiscount = (discount) => {
    return fetch(`/checkout?discount=${discount}`);
};