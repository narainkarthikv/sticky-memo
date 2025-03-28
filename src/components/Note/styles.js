import theme from '../../theme';

export const cardStyles = (item) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: item.checked ? theme.palette.success.main : item.held ? theme.palette.warning.main : theme.palette.accent.main,
  borderRadius: '8px',
  width: '300px',
  height: 'auto',
  minHeight: '250px',
  padding: 0,
  transition: 'transform 0.3s ease-in, background-color 0.3s ease-in',
  margin: '20px 15px 20px 0px',
  border: 'none',
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.02)',
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
  gap: 1,
  flexWrap: 'wrap',
  mt: 2,
};

export const dateFieldStyles = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.15)',
  padding: '6px 10px',
  borderRadius: '4px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: theme.palette.accent.contrastText,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
};

export const dateValueStyles = {
  fontSize: '0.875rem',
  color: theme.palette.accent.contrastText,
  fontWeight: 500,
};
