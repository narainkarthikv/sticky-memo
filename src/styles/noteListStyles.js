import theme from '../theme';

export const noteListStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  margin: theme.spacing(5),
  backgroundColor: theme.palette.background.default,
  width: '100%',
  height: 'auto',
  minHeight: '52vh',
  bgcolor: 'background.default',
  color:  'text.primary',
  '@media (max-width: 600px)': {
    padding: theme.spacing(1),
    gap: theme.spacing(1),
  },
};

export const scrollBoxStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Reduced min width
  gap: theme.spacing(5), // Reduced gap
  padding: theme.spacing(1), // Reduced padding
  overflowY: 'auto',
  bgcolor: 'background.default',
  color:  'text.primary',
  '&::-webkit-scrollbar': { width: '2px', backgroundColor: '#f1f1f1', borderRadius: '8px' },
  '&::-webkit-scrollbar-thumb': { backgroundColor: theme.palette.secondary.main, borderRadius: '8px', transition: 'background-color 0.3s ease-in-out' },
  '&::-webkit-scrollbar-thumb:hover': { backgroundColor: theme.palette.accent.main },
  '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1', borderRadius: '8px' },
  '@media (max-width: 600px)': {
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', // Adjusted for smaller screens
    padding: theme.spacing(1),
    gap: theme.spacing(1),
  },
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
