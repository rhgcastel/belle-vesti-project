import React, { useState, useEffect } from 'react'
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom'

import AccountMenu from './AccountMenu';

import ShoppingCart from './ShoppingCart.js';
import { MenuItem, Typography } from '@mui/material';

function Header({ value }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const checkToken = localStorage.getItem('token')

    useEffect(() => {
        checkToken && setIsLoggedIn(true)
    }, [])

    return (
        <div>
            <AppBar position="fixed" >
                <Toolbar sx={{ justifyContent: 'right', gap: 1 }}>
                    {isLoggedIn
                        ? <AccountMenu />
                        : <Link to='login' style={{ color: 'white', textDecoration: 'none' }}>
                            <MenuItem href='/login'>Login</MenuItem>
                          </Link>
                    }
                    <ShoppingCart
                        value={value}
                    />
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default Header