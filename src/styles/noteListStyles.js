import theme from '../theme';

export const noteListStyles = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  width: '100%',
  overflow: 'hidden',
  bgcolor: 'background.default',
  color: 'text.primary',
};

export const scrollBoxStyles = {
  width: '100%',
  bgcolor: 'background.default',
  color: 'text.primary',
};

export const noteListContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1.5), // Reduced gap
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(1.5), // Reduced padding
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
