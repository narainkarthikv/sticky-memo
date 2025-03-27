import theme from '../theme';

export const noteListStyles = {
  display: 'flex',
  marginTop: 8,
  width: '100%',
  height:'100vh',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
};

export const scrollBoxStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  overflowY: 'auto',
  width: '100%',
  margin: '0 auto',
  padding: '0.5em',
  '&::-webkit-scrollbar': { width: '8px', backgroundColor: '#f1f1f1', borderRadius: '8px' },
  '&::-webkit-scrollbar-thumb': { backgroundColor: theme.palette.secondary.main, borderRadius: '8px', transition: 'background-color 0.3s ease-in-out' },
  '&::-webkit-scrollbar-thumb:hover': { backgroundColor: theme.palette.accent.main },
  '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1', borderRadius: '8px' },
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    width: 'auto',
    paddingRight: '0em',
    alignItems: 'center'
  },
};

export const noteListContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  padding: '16px',
};

export const addButtonContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  minHeight: '100px', // Ajusta según sea necesario
};
