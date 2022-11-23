import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Body from "./components/Body/Body";

const mdTheme = createTheme({
    palette: {
        primary: {
            main: "#000000",
            secondary: "#b2b2b2",
        },
    },
});

function DashboardContent() {
    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <Header />
                <Navbar />
                <Body />
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}
