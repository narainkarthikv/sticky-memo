import theme from '../theme';

export const boardListStyles = {
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

export const gridContainerStyles = {
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5),
  },
};
