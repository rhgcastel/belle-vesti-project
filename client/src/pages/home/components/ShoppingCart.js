import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartMenu from './ShoppingCartMenu';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { MenuList } from '@mui/material';

function ShoppingCart({ value }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                color='inherit'
                variant='outlined'
                id="button"
                aria-controls={open ? 'menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ backgroundColor: 'black', gap: 2, paddingRight: 3 }}>
                <Badge badgeContent={value.state.cartQty} color='error'  >
                    <ShoppingCartIcon />
                </Badge>
                <Typography>
                    £{Number.parseFloat(value.state.cartTotal).toFixed(2)}
                </Typography>
            </Button>

            <Menu
                id="menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'button',
                }}
            >
                {value.state.cartQty === 0
                    ? <Typography variant="subtitle1" component='h2' style={{ fontWeight: 600, margin: 20 }}>Your cart is empty</Typography>
                    :
                    <div>
                        <IconButton style={{ position: 'relative', left: 370 }} onClick={handleClose} >
                            <CloseIcon />
                        </IconButton>
                        <ShoppingCartMenu value={value} />
                    </div>
                }
            </Menu>
        </div>
    )
}

export default ShoppingCart