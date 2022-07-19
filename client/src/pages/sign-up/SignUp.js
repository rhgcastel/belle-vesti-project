import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../../api/api';
import { warningBox } from '../components/WarningBox';
import Copyright from '../components/Copyright';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      secondary: '#b2b2b2'
    }
  }
});

export default function SignUp() {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmation: ''
  })


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = newUser;
    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password)
      return warningBox("Please, fill in all the fields.");
    if (newUser.firstName.length < 2 || newUser.lastName.length < 2)
      return warningBox('First and last names should be more than 1 letter.')
    if ((/[0-9]$/.test(newUser.firstName)) || (/[0-9]$/.test(newUser.lastName)))
      return warningBox('First and last names should only contain letters.')
    if (newUser.confirmation !== newUser.password)
      return warningBox("Passwords do not match.");
    try {
      const response = await api.post("/api/user", data);
      warningBox(response.data);
      return setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmation: ''
      })
    } catch (err) {
      warningBox(err.response.data);
    }
  }



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
            Sign up
          </Typography>
          <Box component='form' sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name='firstName'
                  required
                  fullWidth
                  id="outlined-error"
                  label='First Name'
                  autoComplete='given-name'
                  value={newUser.firstName}
                  onChange={e => setNewUser({ ...newUser, firstName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                  value={newUser.lastName}
                  onChange={e => setNewUser({ ...newUser, lastName: e.target.value  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  value={newUser.password}
                  onChange={e => setNewUser({ ...newUser, password: e.target.value   })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='confirmation'
                  label='Confirm Password'
                  type='password'
                  id='confirmation'
                  value={newUser.confirmation}
                  onChange={e => setNewUser({ ...newUser, confirmation: e.target.value   })}
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit}
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='login' variant='body2'>
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}