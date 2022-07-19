import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';

import AccountMenu from './AccountMenu';

import ShoppingCart from './ShoppingCart.js';

function Header({ value }) {
    return (
        <div>
            <AppBar position="fixed" >
                <Toolbar sx={{ justifyContent: 'right', gap: 1 }}>
                    <AccountMenu />
                    <ShoppingCart 
                    value={value}
                    />
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default Header