import theme from '../../theme';

export const cardStyles = (item) => ({
  display: 'flex',
  flexDirection: 'column',
  background: `linear-gradient(135deg, ${
    item.checked ? theme.palette.success?.light || '#d4edda' : 
    item.held ? theme.palette.warning?.light || '#fff3cd' : 
    '#e2e3e5'
  }, ${
    item.checked ? theme.palette.success?.main || '#28a745' : 
    item.held ? theme.palette.warning?.main || '#ffc107' : 
    '#6c757d'
  })`,
  borderRadius: theme.spacing(1.5),
  width: '280px', // Reduced width
  minHeight: theme.spacing(28), // Adjusted height
  padding: theme.spacing(1.5), // Reduced padding
  margin: theme.spacing(1.5), // Reduced margin
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '90%', // Adjusted for smaller screens
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
});

export const buttonStyle = {
  color: theme.palette.primary.contrastText,
  borderRadius: '100%',
  backgroundColor: theme.palette.secondary.main,
  padding: '3px',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
};

export const typographyStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
};

export const popoverStyles = {
  display: 'flex',
  flexDirection: 'column',
  padding: '5px',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '4px',
  gap: '4px',
};

export const textFieldStyles = {
  '& .MuiInputBase-root': {
    color: 'white',
    '&:before': {
      borderBottomColor: 'rgba(255, 255, 255, 0.42)',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'rgba(255, 255, 255, 0.87)',
    },
    '&.Mui-focused:after': {
      borderBottomColor: 'white',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: 'white',
    },
  },
};

export const dateContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1), // Reduced gap
  flexWrap: 'wrap',
  marginTop: theme.spacing(2),
  padding: theme.spacing(1), // Reduced padding
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5),
  },
};

export const dateFieldStyles = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.15)',
  padding: '6px 10px',
  borderRadius: '4px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
};

export const dateValueStyles = {
  fontSize: '0.875rem',
  color: theme.palette.text.primary,
  fontWeight: 500,
};
