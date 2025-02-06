import React from 'react';
import { Card, CardContent, Typography, Button, IconButton, Box, CardMedia } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCartItem, removeFromCart } from '../redux/actions/cartActions';
import { Add, Remove } from '@mui/icons-material';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const productInCart = useSelector(state =>
    state.cart.cartItems.find(item => item._id === product._id)
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleIncrement = () => {
    if (productInCart) {
      dispatch(updateCartItem(product._id, productInCart.quantity + 1));
    }
  };

  const handleDecrement = () => {
    if (productInCart && productInCart.quantity > 1) {
      dispatch(updateCartItem(product._id, productInCart.quantity - 1));
    } else {
      dispatch(removeFromCart(product._id));
    }
  };

  const discount = Math.round(((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100);

  return (
    <Card sx={{ width: 250, borderRadius: 2, boxShadow: 3, margin: 1 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
      />
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: '5px' }}>
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through', marginRight: 1 }}>
            ${product.originalPrice}
          </Typography>
          <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold', marginRight: 1 }}>
            ${product.sellingPrice}
          </Typography>
          <Typography variant="body2" sx={{ color: 'green', fontWeight: 'bold' }}>
            ({discount}% OFF)
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {!productInCart ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            sx={{ width: '100%' }}
          >
            Add to Cart
          </Button>
        ) : (

          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              variant="outlined"
              onClick={handleDecrement}
              style={{ margin: '0 0.5rem' }}
            >
              -
            </Button>
            <Button
              variant="outlined"
              style={{ margin: '0 0.5rem', color: 'black', cursor: 'default' }}
            >
              {productInCart.quantity}
            </Button>
            <Button
              variant="outlined"
              onClick={handleIncrement}
              style={{ margin: '0 0.5rem' }}
            >
              +
            </Button>
          </Box>

        )}
      </Box>
    </Card>
  );
};

export default ProductCard;
