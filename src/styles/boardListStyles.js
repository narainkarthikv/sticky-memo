import theme from '../theme';

export const boardListStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  margin: theme.spacing(5),
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  width: '100%',
  height: 'auto',
  bgcolor: 'background.default',
  color:  'text.primary',
  minHeight: '100vh',
  '@media (max-width: 600px)': {
    padding: theme.spacing(1),
    gap: theme.spacing(1),
    margin: theme.spacing(3),
  },
};

export const scrollBoxStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Reduced min width
  gap: theme.spacing(5), // Reduced gap
  padding: theme.spacing(1), // Reduced padding
  overflowY: 'auto',
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

