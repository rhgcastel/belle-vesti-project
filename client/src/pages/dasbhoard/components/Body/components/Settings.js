import React from "react";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";

const Settings = () => {
    return (
        <div sx={{ height: '100%', width: "100%" }}>
            <Typography variant='h4' style={{ textAlign: 'center', marginBottom: 20 }}>Settings</Typography>
            <Typography variant='h6' style={{ textAlign: 'center', marginBottom: 20 }}>Change Account Information</Typography>

            <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                <Stack
                    component="form"
                    sx={{
                        width: "35ch",
                    }}
                    spacing={2}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-required"
                        label="First Name" />
                    <TextField
                        id="outlined-required"
                        label="Last Name" />
                    <TextField
                        id="outlined-required"
                        label="Password" />
                </Stack>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 10}}>
                    <Button
                        variant="contained"
                        style={{ marginTop: 20, height: 40 }}
                    >Edit
                    </Button>
                    <Button
                        variant="contained"
                        color='error'
                        style={{ marginTop: 20, height: 40  }}
                    >Delete Account
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default Settings