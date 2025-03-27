import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                bgcolor: theme.palette.background.default,
                textAlign: "center",
                px: 2,
            }}
        >
            <Typography variant="h1" sx={{ fontSize: "96px", fontWeight: "bold", color: theme.palette.primary.main }}>
                404
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                Oops! The page you are looking for doesn’t exist.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
                sx={{ mt: 2 }}
            >
                Go Back to Home
            </Button>
        </Box>
    );
};

export default NotFoundPage;
