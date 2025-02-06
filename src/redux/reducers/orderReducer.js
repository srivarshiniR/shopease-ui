const initialState = {
  orders: [],
  orderStatus: null,
  orderError: null,
  orderHistory: [],
  orderHistoryStatus: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ORDER_HISTORY_REQUEST':
      return { ...state, orderHistoryStatus: 'loading', orderError: null };

    case 'GET_ORDER_HISTORY_SUCCESS':
      return {
        ...state,
        orderHistory: action.payload,
        orderHistoryStatus: 'success',
        orderError: null,
      };

    case 'GET_ORDER_HISTORY_FAILURE':
      return { ...state, orderHistoryStatus: 'failure', orderError: action.payload };

    case 'GET_ALL_ORDERS_REQUEST':
      return { ...state, orderStatus: 'loading', orderError: null };

    case 'GET_ALL_ORDERS_SUCCESS':
      console.log("Action Payload:", action.payload);
      return {
        ...state,
        orders: action.payload,
        orderStatus: 'success',
        orderError: null,
      };

    case 'GET_ALL_ORDERS_FAILURE':
      return { ...state, orderStatus: 'failure', orderError: action.payload };


    default:
      return state;
  }
};

export default orderReducer;
