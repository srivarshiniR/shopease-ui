import React, { useState } from 'react';
import { TextField, Button, Typography, Container, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const validateForm = () => {
    if (!email || !password) {
      alert('Both email and password are required.');
      return false;
    }
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(loginUser({ email, password }, navigate));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>Login</Typography>

      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ marginTop: 3, padding: 2 }}>
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}

    </Container>
  );
};

export default LoginPage;
