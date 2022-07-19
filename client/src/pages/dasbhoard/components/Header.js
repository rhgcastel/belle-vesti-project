import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';


export default function Header() {
  const AppBar = styled(MuiAppBar)(({ theme }) => ({
    width: '85%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  })
  )

  return (
    <>
      <CssBaseline />
      <AppBar position='absolute'>
        <Toolbar
          sx={{
            pr: '24px'
          }}
        >
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            align='center'
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}
