import theme from '../theme';

export const tableListStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  width: '100%',
  height: '100vh',
  '@media (max-width: 600px)': {
    padding: theme.spacing(1),
    gap: theme.spacing(1),
  },
};

export const tableStyles = {
  width: '90%',
  display: 'table',
  margin: 'auto',
  overflowY: 'auto',
  '@media (max-width: 600px)': {
    width: '100%',
    margin: '0',
  },
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
  marginTop: 8,
  width: '100%',
  height:'100vh',
};

export const scrollBoxStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  overflowY: 'auto',
  '&::-webkit-scrollbar': { width: '8px', backgroundColor: '#f1f1f1', borderRadius: '8px' },
  '&::-webkit-scrollbar-thumb': { backgroundColor: theme.palette.secondary.main, borderRadius: '8px', transition: 'background-color 0.3s ease-in-out' },
  '&::-webkit-scrollbar-thumb:hover': { backgroundColor: theme.palette.accent.main },
  '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1', borderRadius: '8px' },
  '@media (max-width: 600px)': {
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    padding: theme.spacing(1),
    gap: theme.spacing(1),
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
