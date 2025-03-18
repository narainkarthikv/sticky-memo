import theme from '../theme';

export const tableListStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflowY: 'hidden',
};

export const tableStyles = {
  width: '90%',
  display: 'table',
  margin: 'auto',
  overflowY: 'auto',
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
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  gap: '10px',
};

export const scrollBoxStyles = {
  width: '90%',
  overflowY: 'auto',
  margin: '0 auto',
  '&::-webkit-scrollbar': { width: '8px', backgroundColor: '#f1f1f1', borderRadius: '8px' },
  '&::-webkit-scrollbar-thumb': { backgroundColor: theme.palette.secondary.main, borderRadius: '8px', transition: 'background-color 0.3s ease-in-out' },
  '&::-webkit-scrollbar-thumb:hover': { backgroundColor: theme.palette.accent.main },
  '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1', borderRadius: '8px' },
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
