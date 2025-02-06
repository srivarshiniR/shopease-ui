import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, updateCartItem, removeFromCart } from '../redux/actions/cartActions';
import { Box, Grid, Button, Typography, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector(state => state.cart);

  const handleClearCart = () => dispatch(clearCart());

  const handleIncrement = (item) => dispatch(updateCartItem(item._id, item.quantity + 1));

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateCartItem(item._id, item.quantity - 1));
    } else {
      dispatch(removeFromCart(item._id));
    }
  };

  const handleRemoveFromCart = (itemId) => dispatch(removeFromCart(itemId));

  return (
    <Box sx={{ padding: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <Button variant="text" color="secondary" onClick={() => navigate(-1)} startIcon={<ArrowBackIosIcon />}>
          Back
        </Button>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Cart Details</Typography>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {cartItems.length > 0 ? cartItems.map((item) => (
            <Card key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, padding: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 100, height: 100, objectFit: 'cover' }}
                  image={item.image}
                  alt={item.name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginTop: 0.5 }}>{item.description}</Typography>
                  <Typography variant="body1" color="primary" sx={{ marginTop: 0.5 }}>Price: <strong>${item.sellingPrice}</strong></Typography>
                </Box>
              </Box>

              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  variant="outlined"
                  onClick={() => handleDecrement(item)}
                  style={{ margin: '0 0.5rem' }}
                >
                  -
                </Button>
                <Button
                  variant="outlined"
                  style={{ margin: '0 0.5rem', color: 'black', cursor: 'default' }}
                >
                  {item.quantity}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleIncrement(item)}
                  style={{ margin: '0 0.5rem' }}
                >
                  +
                </Button>
                <IconButton onClick={() => handleRemoveFromCart(item._id)} color="secondary" sx={{ marginLeft: 1 }}>
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          )) : (
            <Typography variant="body1">Cart is Empty!</Typography>
          )}
        </Grid>

        {/* Cart Actions */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="secondary" fullWidth sx={{ marginTop: 2, marginRight: 20, padding: 2 }} onClick={handleClearCart}>
            Clear Cart
          </Button>
          <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2, marginLeft: 20, padding: 2 }} onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
