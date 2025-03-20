import React, { useState } from "react";
import { AppBar as MuiAppBar, Box, IconButton, Typography, Drawer as MuiDrawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Tooltip, styled, useTheme, Slide } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import NoteIcon from "@mui/icons-material/Note";
import { drawerStyles, drawerHeaderStyles, appBarStyles, mainContentStyles } from './styles';
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const Navbar = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const drawerItems = (
    <List>
      <Tooltip title="Boards" placement="right" arrow>
        <ListItem button component={RouterLink} to="/boards">
          <ListItemIcon>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          <Slide direction="right" in={drawerOpen} timeout={300}>
            <ListItemText
              primary="Boards"
              sx={{ opacity: drawerOpen ? 1 : 0 }}
            />
          </Slide>
        </ListItem>
      </Tooltip>
      <Tooltip title="Tables" placement="right" arrow>
        <ListItem button component={RouterLink} to="/tables">
          <ListItemIcon>
            <TableChartOutlinedIcon />
          </ListItemIcon>
          <Slide direction="right" in={drawerOpen} timeout={300}>
            <ListItemText
              primary="Tables"
              sx={{ opacity: drawerOpen ? 1 : 0 }}
            />
          </Slide>
        </ListItem>
      </Tooltip>
      <Tooltip title="Notes" placement="right" arrow>
        <ListItem button component={RouterLink} to='/'>
          <ListItemIcon>
            <NoteIcon />
          </ListItemIcon>
          <Slide direction="right" in={drawerOpen} timeout={300}>
            <ListItemText
              primary="Notes"
              sx={{ opacity: drawerOpen ? 1 : 0 }}
            />
          </Slide>
        </ListItem>
      </Tooltip>
    </List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <MuiAppBar position="fixed" open={drawerOpen} sx={appBarStyles(theme, drawerOpen)}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(drawerOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Sticky Memo
          </Typography>
        </Toolbar>
      </MuiAppBar>
      <MuiDrawer variant="permanent" open={drawerOpen} sx={drawerStyles(theme, drawerOpen)}>
        <Box sx={drawerHeaderStyles(theme)}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>
        {drawerItems}
      </MuiDrawer>
      <Box component="main" sx={mainContentStyles(theme, drawerOpen)}>
        <Box />
        {/* Main content goes here */}
      </Box>
    </Box>
  );
};

export default Navbar;
