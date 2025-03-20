import theme from '../../theme';

export const footerStyles = {
  footer: {
    width: 'auto',
    textAlign: 'center',
    padding: theme.spacing(1),
    position: 'relative',
    bottom: 0,
    left: 0,
    fontSize: '0.9em',
    backgroundColor: theme.palette.primary.main,
    zIndex: 1,
  },
  inlineText: {
    display: 'inline',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    fontWeight: 'bold',
    marginLeft: '5px',
    transition: 'color 0.3s ease',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  iconButton: {
    color: 'black',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  }
};

export const navbarStyles = {
  iconButton: {
    width: "3rem",
    height: "3rem",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    color: "black",
    "&:hover": {
      width: "6rem",
      borderRadius: "20px",
      backgroundColor: "white",
    },
  },
  link: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
  },
  label: {
    ml: 0.5,
    display: "none",
    transition: "display 0.3s ease",
    "&.MuiIconButton-hovered &": {
      display: "inline",
    },
    color: "black",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 1rem",
    backgroundColor: theme.palette.primary.main,
  },
  navItems: {
    display: "flex",
    gap: "10px",
  },
};

export const drawerWidth = 200;

export const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

export const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const drawerHeaderStyles = (theme) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
});

export const appBarStyles = (theme, open) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
});

export const drawerStyles = (theme, open) => ({
  width: open ? '10%' : '5%',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
});

export const mainContentStyles = (theme, open) => ({
  flexGrow: 1,
  width: open ? '90%' : '95%',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: open ? '10%' : '5%',
});

