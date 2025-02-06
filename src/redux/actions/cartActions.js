

export const addToCart = (product) => {
  return {
    type: 'ADD_TO_CART',
    payload: product,
  };
};

export const removeFromCart = (_id) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: _id,
  };
};

export const updateCartItem = (_id, quantity) => {
  return {
    type: 'UPDATE_CART_ITEM',
    payload: { _id, quantity },
  };
};


export const clearCart = () => {
  return {
    type: 'CLEAR_CART',
  };
};


