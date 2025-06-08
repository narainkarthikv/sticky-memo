import theme from '../../theme';

export const tableRowStyles = (item) => ({
  color: theme.palette.text.primary,
  backgroundColor: item.checked
    ? theme.palette.success.light
    : item.held
    ? theme.palette.warning.light
    : theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
});

export const buttonStyle = {
  color: theme.palette.primary.contrastText,
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(0.5),
  minWidth: { xs: 40, sm: 44 }, // Touch-friendly minimum size
  minHeight: { xs: 40, sm: 44 },
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    transform: 'scale(1.05)',
  },
  transition: 'all 0.2s ease-in-out',
  // Touch device optimizations
  '@media (hover: none)': {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      transform: 'none',
    },
  },
};

export const boxStyles = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const contentBoxStyles = {
  alignSelf: 'center',
  wordBreak: 'break-all',
};

export const popoverTypographyStyles = {
  backgroundColor: theme.palette.primary.main,
  padding: '0.5',
  display: 'flex',
  justifyContent: 'space-around',
};

export const createRowBoxStyles = {
  width: '100%',
  maxWidth: theme.spacing(50),
  height: 'auto',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  borderRadius: theme.spacing(2),
  border: `3px ${theme.palette.primary.light} outset`,
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
};

export const textFieldStyles = {
  display: 'flex',
  flexDirection: 'column',
  fontSize: '1em',
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily,
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5),
  },
};

export const iconButtonStyles = {
  right: '-70px',
  bottom: '5px',
  backgroundColor: theme.palette.secondary.main,
  fontSize: '1.3em',
  color: theme.palette.primary.contrastText,
  border: 'none',
  borderRadius: '50%',
  width: '2em',
  height: '2em',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  cursor: 'pointer',
  outline: 'none',
  transition: 'background-color 0.2s ease, transform 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(1px)',
  },
};

export const cardStyles = (item) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
  },
});
