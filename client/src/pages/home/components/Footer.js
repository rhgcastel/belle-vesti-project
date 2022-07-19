import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Copyright from '../../components/Copyright';

export default function Footer() {
    return (
        <>
            <Typography variant="h6" align="center">
                Follow Us
            </Typography>
            <Stack alignItems='center'>
                <ButtonGroup size='large' variant='string'>
                    <Button href='https://www.facebook.com/'><FacebookIcon /></Button>
                    <Button href='https://www.instagram.com/'><InstagramIcon /></Button>
                    <Button href='https://twitter.com/'><TwitterIcon /></Button>
                    <Button href='https://www.youtube.com/'><YouTubeIcon /></Button>
                </ButtonGroup>
            </Stack>
            <br />
                <Copyright />
            <br />
        </>
    );
}