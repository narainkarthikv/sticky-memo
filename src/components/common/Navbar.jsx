import React, { useState } from "react";
import { AppBar, Box, IconButton, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Tooltip, styled, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import NoteIcon from "@mui/icons-material/Note";
import TimelineIcon from "@mui/icons-material/Timeline"; // Import icon for roadmap
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const drawerWidth = 240;

const StyledAppBar = styled(AppBar)(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
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
}));

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...theme.mixins.drawer,
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
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const MainContent = styled("main")(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerItemButton = styled(ListItemButton)(({ theme, open }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(1),
  padding: theme.spacing(1),
  "&:hover": {
    ...(!open
      ? { backgroundColor: theme.palette.action.hover }
      : { backgroundColor: theme.palette.primary.light }),
  },
}));

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
        <DrawerItemButton component={RouterLink} to="/boards" open={drawerOpen}>
          <ListItemIcon>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Boards" />}
        </DrawerItemButton>
      </Tooltip>
      <Tooltip title="Tables" placement="right" arrow>
        <DrawerItemButton component={RouterLink} to="/tables" open={drawerOpen}>
          <ListItemIcon>
            <TableChartOutlinedIcon />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Tables" />}
        </DrawerItemButton>
      </Tooltip>
      <Tooltip title="Notes" placement="right" arrow>
        <DrawerItemButton component={RouterLink} to="/" open={drawerOpen}>
          <ListItemIcon>
            <NoteIcon />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Notes" />}
        </DrawerItemButton>
      </Tooltip>
      <Tooltip title="Roadmap" placement="right" arrow>
        <DrawerItemButton component={RouterLink} to="/roadmap" open={drawerOpen}>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Roadmap" />}
        </DrawerItemButton>
      </Tooltip>
    </List>
  );

  return (
    <Box sx={{ display: "flex" }}>
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
          <Typography variant="h6" noWrap>
            Sticky Memo
          </Typography>
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
        <DrawerHeader />
        {/* Main content goes here */}
      </MainContent>
    </Box>
  );
};

export default Navbar;
