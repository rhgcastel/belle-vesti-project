import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LinkMUI from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../../services/api';
import { warningBox } from '../components/WarningBox';
import Copyright from '../components/Copyright';
import useAuth from '../../hooks/useAuth';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      secondary: '#b2b2b2'
    }
  }
});

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  // useEffect(() => {
  //   if(!isLoggedIn && localStorage.getItem('&token') !== null) {
  //     navigate(-1)
  //   }
  // }, [isLoggedIn, navigate])

  const handleLogin = async (e) => {
    e.preventDefault();
    (!email || !password) && warningBox('Please, fill in all the fields.')
    const loginData = { email, password }
    try {
      const response = await api.post('/api/user/login', loginData, { headers: { 'Content-type': 'application/json' } })
      console.log(response)
      warningBox(`Welcome ${response.data.payload.first_name}`)
      localStorage.setItem('&token', response.data.accessToken)
      setIsLoggedIn(true)
      navigate(-1)
    } catch (err) {
      warningBox(err.response.data)
    }
  };

  const handleChange = (e) => {
    setChecked(e.target.checked); 
    !checked ? setShowPassword(true) : setShowPassword(false)
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <Box component='form' onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              id='password'
              autoComplete='current-password'
              onChange={e => setPassword(e.target.value)}

            />
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleChange} color='primary' />}
              label='Show password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <LinkMUI href='#' variant='body2'>
                  Forgot password?
                </LinkMUI>
              </Grid>
              <Grid item>
                <LinkMUI href='sign-up' variant='body2'>
                  {`Don't have an account? Sign Up`}
                </LinkMUI>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}