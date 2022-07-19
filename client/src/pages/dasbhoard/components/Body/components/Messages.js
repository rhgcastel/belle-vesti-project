import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Messages = () => {
    const [selection, setSelection] = useState([]);

    const columns = [
        { field: 'from', headerName: 'From', width: 200 },
        { field: 'subject', headerName: 'Subject', width: 600 },
        { field: 'receivingDate', headerName: 'Received At', width: 200 },
    ];

    const rows = {
        from: 'ha',
        subject: '',
        receivingDate: ''
    }

    const CustomNoRowsOverlay = () => {
        return (
            <Box style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
            }}>
                <Typography variant='subtitle2'>NO MESSAGES TO DISPLAY</Typography>
            </Box>

        )
    }

    return (
        <div sx={{ height: '100%', width: "100%" }}>
            <Typography variant='h4' style={{ textAlign: 'center' }}>Messages</Typography>
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
                onSelectionModelChange={newSelection => {
                    setSelection(newSelection);
                }}
            />
            <IconButton><RefreshIcon onClick={() => window.location.reload()} /></IconButton>
            <div style={{ float: "right", marginTop: 10, }}>


                <Button
                    variant="contained"
                    style={{ marginRight: 10 }}
                >
                    New
                </Button>
                <Button
                    variant="contained"
                    style={{ marginRight: 10 }}
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default Messages