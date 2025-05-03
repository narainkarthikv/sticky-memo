import React, { useState } from "react";
import { AppBar, Box, IconButton, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Tooltip, styled, useTheme, Select, MenuItem, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { themeState } from '../../utils/state';
import MenuIcon from "@mui/icons-material/Menu";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import NoteIcon from "@mui/icons-material/Note";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const drawerWidth = 240;

const StyledAppBar = styled(AppBar)(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  [theme.breakpoints.down('sm')]: {
    height: '56px',
    padding: theme.spacing(1),
  },
}));

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
  ...(!open && {
    "& .MuiDrawer-paper": {
      width: theme.spacing(7),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
    },
  }),
  [theme.breakpoints.down('sm')]: {
    "& .MuiDrawer-paper": {
      width: open ? drawerWidth : theme.spacing(9),
    },
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const MainContent = styled(Box)(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: open ? drawerWidth : theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  overflow: "hidden",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    marginLeft: 0,
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useRecoilState(themeState);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
    localStorage.setItem('selectedTheme', event.target.value);
  };

  const drawerItems = (
    <List>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Tooltip title="Boards" placement="right" arrow>
            <ListItemButton component={RouterLink} to="/boards">
              <ListItemIcon>
                <DashboardOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Boards" />
            </ListItemButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Tooltip title="Tables" placement="right" arrow>
            <ListItemButton component={RouterLink} to="/tables">
              <ListItemIcon>
                <TableChartOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Tables" />
            </ListItemButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Tooltip title="Notes" placement="right" arrow>
            <ListItemButton component={RouterLink} to="/">
              <ListItemIcon>
                <NoteIcon />
              </ListItemIcon>
              <ListItemText primary="Notes" />
            </ListItemButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Tooltip title="Roadmap" placement="right" arrow>
            <ListItemButton component={RouterLink} to="/roadmap">
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="Roadmap" />
            </ListItemButton>
          </Tooltip>
        </Grid>
      </Grid>
    </List>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <StyledAppBar position="fixed" open={drawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ ...(drawerOpen && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: '500',
              marginLeft: 2,
              [theme.breakpoints.down('sm')]: { fontSize: '1rem', marginLeft: 1 },
            }}
          >
            Sticky Memo
          </Typography>
          <Select
            value={selectedTheme}
            onChange={handleThemeChange}
            sx={{
              marginLeft: 'auto',
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.default,
              borderRadius: '8px',
              '&:hover': { backgroundColor: theme.palette.action.hover },
              [theme.breakpoints.down('sm')]: { fontSize: '0.875rem', padding: theme.spacing(0.5) },
            }}
          >
            <MenuItem value="atlassian">Atlassian</MenuItem>
            <MenuItem value="azure">Azure</MenuItem>
            <MenuItem value="fireflies">Fireflies</MenuItem>
          </Select>
        </Toolbar>
      </StyledAppBar>
      <StyledDrawer variant="permanent" open={drawerOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        {drawerItems}
      </StyledDrawer>
      <MainContent open={drawerOpen}>
        <Grid container spacing={2}>
          {/* Main content goes here */}
        </Grid>
      </MainContent>
    </Box>
  );
};

export default Navbar;
