import theme from '../theme';

export const boardListStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  gap: '10px',
  marginTop: 8,
  width: '100%' ,
  height:'100vh'  
};

export const scrollBoxStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: '1em',
  overflowY: 'auto',
  wordWrap: 'break-word',
  '&::-webkit-scrollbar': { width: '8px', backgroundColor: '#f1f1f1', borderRadius: '8px' },
  '&::-webkit-scrollbar-thumb': { backgroundColor: theme.palette.secondary.main, borderRadius: '8px', transition: 'background-color 0.3s ease-in-out' },
  '&::-webkit-scrollbar-thumb:hover': { backgroundColor: theme.palette.accent.main },
  '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1', borderRadius: '8px' },
};

