const addItemToCart = (payload, state) => {
    const updatedCart = [...state.items];
    const updatedItemIndex = updatedCart.findIndex(e => e.sku === payload.sku)

    if (updatedItemIndex < 0) {
        updatedCart.push({ ...payload, subQty: 1, subTotal: payload.price });
    } else {
        const updatedItem = { ...updatedCart[updatedItemIndex] };
        updatedItem.subQty++;
        updatedItem.subTotal += payload.price;
        updatedCart[updatedItemIndex] = updatedItem;
    }

    return { ...state, items: updatedCart, cartQty: state.cartQty + 1, cartTotal: state.cartTotal + payload.price };
}

const removeItemFromCart = (payload, state) => {
    const updatedCart = [...state.items];
    const updatedItemIndex = updatedCart.findIndex(e => e.sku === payload.sku)
    const updatedItem = { ...updatedCart[updatedItemIndex] };
    updatedItem.subQty--;
    updatedItem.subTotal -= payload.price;
    if (updatedItem.subQty <= 0) {
        updatedCart.splice(updatedItemIndex, 1);
    } else {
        updatedCart[updatedItemIndex] = updatedItem;
    }

    return { ...state, items: updatedCart, cartQty: state.cartQty -1, cartTotal: state.cartTotal - payload.price  };
};


export const shoppingCartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return addItemToCart(action.payload, state);
        case 'REMOVE_ITEM':
            return removeItemFromCart(action.payload, state)
        case 'EMPTY_BAG':
            return {
                items: [],
                cartQty: 0,
                cartTotal: 0.00
              };
        default:
            throw new Error();
    }
}