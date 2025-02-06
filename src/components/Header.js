import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Button, Typography, Menu, MenuItem, Divider, Box } from '@mui/material';
import { ShoppingCart, AccountCircle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';
import Person3Icon from '@mui/icons-material/Person3';

const Header = ({ isLoggedIn, cartItems }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
    handleMenuClose();
    navigate('/');
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#ccc",
        boxShadow: "none",
        width: '100%',
        padding: 0,
        minHeight: '80px',
        margin: 0,
      }}
    >
      <Toolbar sx={{
        width: '100%',
        padding: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '80px',
      }}>
        <Typography variant="h5" component="div" sx={{ color: "black", fontWeight: 'bold' }}>
          ShopEase
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '40px' }}>
          {!isLoggedIn ? (
            <>
              <Button sx={{ color: "black" }} component={Link} to="/login">Login</Button>
              <Button sx={{ color: "black" }} component={Link} to="/signup">Signup</Button>
            </>
          ) : (
            <>
              <Button sx={{ color: "black" }} onClick={handleMenuOpen}>
                <Person3Icon sx={{ color: "black" }} />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
          <IconButton sx={{ color: "black" }} component={Link} to="/cart">
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCart sx={{ color: "black" }} />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
