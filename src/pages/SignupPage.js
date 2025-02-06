import React, { useState } from 'react';
import { TextField, Button, Typography, Container, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const validateForm = () => {
    if (!name || !email || !password) {
      alert('Please fill in all the fields.');
      return false;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(signupUser({ name, email, password }, navigate));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>Signup</Typography>
      <form onSubmit={handleSignup}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ marginTop: 3, padding: 2 }}>
          {loading ? <CircularProgress size={24} /> : 'Signup'}
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}

    </Container>
  );
};

export default SignupPage;
