import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import { Remove, Add, Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateCartItem, removeFromCart } from '../redux/actions/cartActions';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
    dispatch(updateCartItem(item.id, quantity + 1));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      dispatch(updateCartItem(item.id, quantity - 1));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="body1">${item.price} x {quantity}</Typography>
        <div>
          <IconButton onClick={handleDecrease}>
            <Remove />
          </IconButton>
          <IconButton onClick={handleIncrease}>
            <Add />
          </IconButton>
          <IconButton onClick={handleRemove}>
            <Delete />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
