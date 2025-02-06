import React, { useEffect, useState } from 'react';
import { Typography, Button, CircularProgress, Box, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';
import { getUserOrderHistoryAction, getAllOrdersAction } from '../redux/actions/orderActions';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ProfilePage = () => {
  const token = localStorage.getItem('token');
  const { user } = useSelector((state) => state.auth);

  const [openOrderDetails, setOpenOrderDetails] = useState({});

  const { orders = [], orderStatus, orderError } = useSelector((state) => state.orders || {});
  const { orderHistory = [], orderHistoryStatus, orderHistoryError } = useSelector((state) => state.orders || {});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        dispatch(getAllOrdersAction(token));
      } else {
        dispatch(getUserOrderHistoryAction(token));
      }
    }
  }, [dispatch, user, token]);

  if (user?.isAdmin && orderStatus === 'loading') {
    return <CircularProgress />;
  }

  if (!user?.isAdmin && orderHistoryStatus === 'loading') {
    return <CircularProgress />;
  }

  const ordersToDisplay = user?.isAdmin ? orders : orderHistory;

  const handleToggleOrderDetails = (orderId) => {
    setOpenOrderDetails((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* User Details*/}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <Button variant="text" color="secondary" onClick={() => navigate(-1)} startIcon={<ArrowBackIosIcon />}>
          Back
        </Button>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Profile</Typography>
      </div>
      <Typography variant="body1"><strong>Name: </strong>{user?.name}</Typography>
      <Typography variant="body1"><strong>Email: </strong>{user?.email}</Typography>

      <Divider sx={{ my: 3 }} />

      {/* Order History */}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Order History</Typography>
      <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 2 }}>
        Orders Count: {ordersToDisplay.length}
      </Typography>

      {(user?.isAdmin ? orderStatus : orderHistoryStatus) === 'failure' && (
        <Typography color="error">
          {user?.isAdmin ? orderError : orderHistoryError}
        </Typography>
      )}

      {/* Orders List */}
      <Box>
        {ordersToDisplay.length > 0 ? (
          ordersToDisplay.map((order) => (
            <Box key={order._id} sx={{ padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="body1">Order ID: {order._id}</Typography>
              <Typography variant="body1"><strong>Total Amount:</strong> ${order.totalPrice}</Typography>

              {/*Admin:User Details */}
              {user?.isAdmin && (
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1"><strong>User:</strong> {order.user.name} ({order.user.email})</Typography>
                </Box>
              )}

              <Divider sx={{ my: 2 }} />

              {/* Product Details*/}
              <Button
                variant="outlined"
                onClick={() => handleToggleOrderDetails(order._id)}
                sx={{ marginBottom: 2 }}
              >
                {openOrderDetails[order._id] ? 'Hide Product Details' : 'Show Product Details'}
              </Button>

              {/* Product List*/}
              {openOrderDetails[order._id] && (
                <Box sx={{ paddingLeft: 2 }}>
                  <Typography variant="body1" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Products in this Order</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {order.products.map((product) => (
                      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }} key={product._id}>
                        <img
                          src={product.productId?.image || 'default-image-url'}
                          alt={product.productId?.name}
                          style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 10 }}
                        />
                        <Typography variant="body2" sx={{ flex: 1 }}>
                          <strong>{product.productId?.name || 'Unknown Product'}</strong> x {product.quantity} = ${product.price}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          ))
        ) : (
          <Typography>No orders found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
