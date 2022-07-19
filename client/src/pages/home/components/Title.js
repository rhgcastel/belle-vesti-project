import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Title() {
  return (
    <div>
            <Typography variant="h3" sx={{ textAlign: 'center', marginTop: 12, marginBottom: 5 }} >
                BELLE VESTI
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
                <Typography sx={{ minWidth: 80 }}>WOMEN</Typography>
                <Typography sx={{ minWidth: 80 }}>MEN</Typography>
                <Typography sx={{ minWidth: 80 }}>GIRLS</Typography>
                <Typography sx={{ minWidth: 80 }}>BOYS</Typography>
                <Typography sx={{ minWidth: 80 }}>SALE</Typography>
            </Box>
    </div>
  )
}

export default Title