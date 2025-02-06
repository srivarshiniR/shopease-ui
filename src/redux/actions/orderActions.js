import { placeOrder, getOrderHistory, getAllOrders } from '../../utils/api';

export const placeOrderAction = (userToken, cartItems) => async (dispatch) => {
  try {
    console.log('Cart Items in Action:', cartItems);

    const response = await placeOrder(userToken, cartItems);
    dispatch({ type: 'PLACE_ORDER_SUCCESS', payload: response });
  } catch (error) {
    console.error('Error placing order', error);
    dispatch({ type: 'PLACE_ORDER_FAILURE', payload: error.response?.data || error.message });
  }
};



export const getUserOrderHistoryAction = (userToken) => async (dispatch) => {
  dispatch({ type: 'GET_ORDER_HISTORY_REQUEST' });

  try {
    const response = await getOrderHistory(userToken);

    console.log("Order History API Response in Action:", response);

    dispatch({ type: 'GET_ORDER_HISTORY_SUCCESS', payload: response });
  } catch (error) {
    console.error('Error fetching order history', error);
    dispatch({ type: 'GET_ORDER_HISTORY_FAILURE', payload: error.response?.data || error.message });
  }
};



export const getAllOrdersAction = (userToken) => async (dispatch) => {
  dispatch({ type: 'GET_ALL_ORDERS_REQUEST' });

  try {
    const response = await getAllOrders(userToken);
    dispatch({ type: 'GET_ALL_ORDERS_SUCCESS', payload: response });
  } catch (error) {
    dispatch({ type: 'GET_ALL_ORDERS_FAILURE', payload: error.message });
  }
};

