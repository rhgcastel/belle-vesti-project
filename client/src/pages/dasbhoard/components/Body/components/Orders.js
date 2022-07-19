import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Orders = () => {
    const [selection, setSelection] = useState([]);

    const columns = [
        { field: 'order', headerName: 'Order', width: 200 },
        { field: 'item', headerName: 'Item', width: 600 },
        { field: 'total', headerName: 'Total(£)', width: 100 },
        { field: 'dispacthTo', headerName: 'Dispacth To', width: 400 },
        { field: 'orderPlaced', headerName: 'Order Placed', width: 200 },
        { field: 'estimatedDelivery', headerName: 'Estimated Delivery', width: 200 },
    ];

    const rows = {
        lastName: '',
        firstName: ''
    }


    const CustomNoRowsOverlay = () => {
        return (
            <Box style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                marginTop: 35,
            }}>
                <Typography variant='subtitle2'>NO ORDERS TO DISPLAY</Typography>
            </Box>

        )
    }

    return (
        <div sx={{ height: '100%', width: "100%" }}>
            <Typography variant='h4' style={{ textAlign: 'center' }}>Orders</Typography>
            <DataGrid
                components={{
                    NoRowsOverlay: CustomNoRowsOverlay,
                }}
                autoHeight="true"
                columns={columns}
                rows={rows}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                getRowHeight={() => 'auto'}
                onSelectionModelChange={newSelection => {
                    setSelection(newSelection);
                }}
            />
            <IconButton><RefreshIcon onClick={() => window.location.reload()} /></IconButton>
            <div style={{ float: "right", marginTop: 10 }}>

                <Button
                    variant="contained"
                    style={{ marginRight: 10 }}
                >
                    View Details
                </Button>
                <Button
                    variant="contained"
                    style={{ marginRight: 10 }}
                >
                    Track
                </Button>
                <Button
                    variant="contained"
                    style={{ marginRight: 10 }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    style={{ marginRight: 10 }}
                >
                    Return
                </Button>
            </div>
        </div>
    )
}

export default Orders