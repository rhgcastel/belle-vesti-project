import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import api from '../../../services/api';
import Chip from '@mui/material/Chip';

function Body({ itemDetails, itemFunctions, prod, value }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadItems = async () => {
            const response = await api.get('/api/items-list')
            setItems(response.data)        }
        loadItems()
    }, [])


    return (
        <main>
            {items.length <= 0 &&
                <div style={{
                    "position": "relative",
                    "marginTop": 50,
                    "left": 0,
                    "top": 0,
                    "right": 0,
                    "bottom": 0,
                    "display": "flex", 
                    "justifyContent": "center", 
                    "alignItems": "center"
                }}>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/9/92/Loading_icon_cropped.gif' alt='Loading'></img>
                </div>}
            <Container sx={{ py: 8 }} maxWidth="md">

                <Grid container spacing={4} columns={12}>
                    {items.map((item, index) => (
                        <Grid item key={index} xs={8} sm={6} md={4}>
                            <Card
                                variant='outlined'
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >

                                <CardContent sx={{ height: 250, }}>
                                    <CardMedia
                                        component="img"
                                        image={item.image || 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'}
                                        alt="random"
                                        sx={{ height: '100%', width: '100%', objectFit: 'contain' }}
                                    />
                                    <Chip variant='contained' style={{ width: '40%', marginTop: -60, backgroundColor: 'black', color: 'white' }} label={
                                        <Typography>
                                            £{Number.parseFloat(item.price).toFixed(2)}
                                        </Typography>
                                    }></Chip>
                                </CardContent>

                                <CardContent sx={{ flexGrow: 1, display: 'block' }}>
                                    <Typography gutterBottom variant="p" component="h4">
                                        {item.title}
                                    </Typography>
                                    <Typography gutterBottom variant="p" component="p">
                                        {item.category}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{ justifyContent: 'center' }}>
                                    <Button color='success' variant='contained' size="small" onClick={() => value.dispatch({ type: 'ADD_ITEM', payload: item })}>
                                        Add to Cart
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </main>
    )
}

export default Body