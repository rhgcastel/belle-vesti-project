import React, { useReducer, useEffect } from 'react';
import Body from './components/Body';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './components/Footer';
import Title from './components/Title';
import { shoppingCartReducer } from '../../reducers/ShoppingReducers';
import api from '../../services/api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      secondary: '#b2b2b2'
    }
  }
});

export default function Home() {
  const [state, dispatch] = useReducer(shoppingCartReducer, {
    items: [],
    cartQty: 0,
    cartTotal: 0.00
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        value={{ state, dispatch }}
      />
      <Title />
      <Body
        value={{ state, dispatch }}
      />
      <Footer />
    </ThemeProvider >
  );
}