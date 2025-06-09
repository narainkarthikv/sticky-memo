import theme from '../theme';

export const tableListStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: {
    xs: theme.spacing(1),
    sm: theme.spacing(1.5),
    md: theme.spacing(2),
  },
  padding: {
    xs: theme.spacing(1),
    sm: theme.spacing(1.5),
    md: theme.spacing(2),
  },
  width: '100%',
  minHeight: '100vh',
};

export const tableStyles = {
  width: {
    xs: '100%',
    sm: '95%',
    md: '90%',
    lg: '85%',
  },
  display: 'table',
  margin: 'auto',
  overflowY: 'auto',
  overflowX: 'auto',
  borderRadius: theme.spacing(1),
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

export const tableHeadStyles = {
  backgroundColor: theme.palette.primary.main,
};

export const tableCellStyles = {
  fontWeight: 'bold !important',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
};

export const boxStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
  width: '100%',
  minHeight: '100vh',
  maxHeight: '100vh',
  overflow: 'hidden',
  bgcolor: 'background.default',
  color: 'text.primary',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
};

export const scrollBoxStyles = {
  flex: 1,
  width: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: theme.spacing(1),
  '&::-webkit-scrollbar': {
    width: '6px',
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.action.disabled,
    borderRadius: '3px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
};

export const noteListContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  padding: '16px',
  '@media (max-width: 600px)': {
    gap: theme.spacing(1),
    padding: theme.spacing(1),
  },
};

export const addButtonContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  minHeight: '100px', // Ajusta según sea necesario
  '@media (max-width: 600px)': {
    minHeight: '80px',
  },
};
