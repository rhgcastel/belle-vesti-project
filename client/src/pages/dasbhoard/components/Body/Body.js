import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box';
import Copyright from '../../../components/Copyright';

export default function Body() {
    return (
        <>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>
                                <Outlet />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Copyright sx={{ pt: 4 }} />
                </Container>
            </Box>
        </>
    )
}