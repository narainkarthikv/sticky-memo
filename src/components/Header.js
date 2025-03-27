import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ mb: 2, backgroundColor: theme.palette.primary.main }}>
      <Toolbar>
        <Container>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: theme.palette.primary.contrastText }}>
              Sticky Memo
            </Typography>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
