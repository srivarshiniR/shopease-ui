import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Typography, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Search, GridView, ViewList } from '@mui/icons-material';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../utils/api';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('grid');

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await getAllProducts();
      setProducts(productData);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: 2 }}>
      {/* Sticky Search Bar */}
      <Box sx={{ position: 'sticky', top: 70, zIndex: 1, backgroundColor: 'white', padding: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
          <Typography variant="h5" sx={{ flex: 1, textAlign: "left", fontWeight: 'bold' }}>
            Products
          </Typography>

          {/* Search Bar */}
          <TextField
            placeholder="Search by name, description"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ maxWidth: 500, borderRadius: '50px', bgcolor: 'white', flex: 2, mx: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Toggle Buttons */}
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(e, newView) => newView && setView(newView)}
            sx={{ flex: 1, justifyContent: 'flex-end' }}
          >
            <ToggleButton value="grid">
              <GridView />
            </ToggleButton>
            <ToggleButton value="list">
              <ViewList />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Products Display */}
      {filteredProducts.length > 0 ? (
        view === 'grid' ? (
          <Grid container spacing={3}>
            {filteredProducts.map(product => (
              <Grid item key={product._id} xs={12} sm={6} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box>
            {filteredProducts.map(product => (
              <Box key={product._id} sx={{ marginBottom: 2 }}>
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>
        )
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Typography variant="body1">No products found</Typography>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
