import React, { useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, CardMedia, Divider, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrderAction } from '../redux/actions/orderActions';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CheckoutPage = () => {
  const token = localStorage.getItem('token');
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const totalCost = cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else if (cartItems.length === 0) {
      alert('No items in cart!');
    } else {
      if (token) {
        dispatch(placeOrderAction(token, cartItems));
        alert('Order placed successfully!');
        navigate('/profile');
      } else {
        alert('User not authenticated');
      }
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <Button variant="text" color="secondary" onClick={() => navigate(-1)} startIcon={<ArrowBackIosIcon />}>
          Back
        </Button>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Checkout</Typography>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* User Details */}
          <Box sx={{ marginBottom: 3, padding: 2, borderRadius: 2, border: '1px solid #ddd' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>User Details</Typography>
            <Typography><strong>Name:</strong> {user?.name}</Typography>
            <Typography><strong>Email:</strong> {user?.email}</Typography>
            <Typography><strong>Address:</strong> Coimbatore</Typography>
          </Box>

          <Divider sx={{ marginY: 3 }} />

          {/* Product Details */}
          <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Products in Your Order</Typography>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, padding: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CardMedia component="img" sx={{ width: 80, height: 80, objectFit: 'cover' }} image={item.image} alt={item.name} />
                <Box>
                  <Typography variant="body1"><strong>{item.name}</strong></Typography>
                  <Typography variant="body2" color="primary">Price: ${item.sellingPrice}</Typography>
                  <Typography variant="body2">Quantity: {item.quantity}</Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 2, borderRadius: 2, height: 'fit-content' }}>
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Order Summary</Typography>
            <Typography><strong>Total Items:</strong> {cartItems.length}</Typography>
            <Typography color="primary"><strong>Total Cost:</strong> ${totalCost}</Typography>
            <Typography><strong>Payment Method:</strong> Cash on Delivery</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Button variant="contained" color="primary" fullWidth onClick={handlePlaceOrder} sx={{ padding: 2 }}>
              Place Order
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;
