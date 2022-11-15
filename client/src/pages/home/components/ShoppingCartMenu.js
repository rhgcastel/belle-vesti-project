import React from 'react'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

function ShoppingCartMenu({ value }) {

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  return (
    <>
      {value.state.items.map((item, index) => (
        <div key={index}>
          <MenuItem style={{ gap: 10, display: 'flex', flexDirection: 'column', whiteSpace: 'normal' }}>
            <Paper
              sx={{
                p: 2,
                key: index,
                margin: 'auto',
                width: 370,
                height: 160,
              }}
            >
              <Grid container spacing={2} sx={{ height: '100%', width: '100%' }}>
                <Grid item>
                  <ButtonBase sx={{ width: 80, height: 80}}>
                    <Img alt="complex" src={item.image} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs >
                      <Typography gutterBottom variant="p" component="div" >
                        {item.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Price: {`£${Number.parseFloat(item.price).toFixed(2)}`}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item marginLeft={5} style={{textAlign : 'center'}}>
                    <Typography variant="subtitle1" component="div" style={{ fontWeight: 600 }}>
                      {`£${Number.parseFloat(item.subTotal).toFixed(2)}`}
                    </Typography>
                    <Typography variant="subtitle2" component="div" style={{ fontWeight: 600 }}>
                      {`Qty:${item.subQty}`}
                    </Typography>
                    <IconButton title='Remove Item' onClick={() => value.dispatch({ type: 'REMOVE_ITEM', payload: item })}>
                        -
                    </IconButton>
                    <IconButton title='Add Item' onClick={() => value.dispatch({ type: 'ADD_ITEM', payload: item })}>
                        +
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </MenuItem>
        </div>
      ))
      }
      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Typography style={{ fontWeight: 600, textAlign: 'right', marginRight: 20}}>
          Total: {`£${Number.parseFloat(value.state.cartTotal).toFixed(2)}`}
        </Typography>
        <Button variant='contained' color='warning' style={{width: 200}}>Checkout</Button>
        <Button variant='outlined' style={{width: 200}} onClick={() => value.dispatch({ type: 'EMPTY_BAG' })}>
          Empty Bag
          </Button>
      </div>

    </>
  )
}

export default ShoppingCartMenu