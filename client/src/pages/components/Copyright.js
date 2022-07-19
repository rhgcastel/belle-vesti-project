import React from 'react'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright() {
    return (
        <Typography variant='body2' color='text.secondary' align='center' style={{ marginTop: 50 }}>
            {'Copyright © '}
            <Link color='inherit' href='/'>
                Belle Vesti Ltd.
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}