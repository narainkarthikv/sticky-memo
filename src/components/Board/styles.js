import theme from '../../theme';
import { styled } from '@mui/system';

export const cardStyles = (item) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  background: `linear-gradient(135deg, ${
    item.checked ? theme.palette.success.light : item.held ? theme.palette.warning.light : theme.palette.accent.light
  }, ${
    item.checked ? theme.palette.success.main : item.held ? theme.palette.warning.main : theme.palette.accent.main
  })`,
  borderRadius: theme.spacing(2),
  width: '280px', // Reduced width for better spacing
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
  padding: '2px', // Reduced padding for compactness
};

export const typographyStyles = {
  height: '2em',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 1em',
  borderRadius: '8px 8px 0 0',
};

export const popoverStyles = {
  backgroundColor: theme.palette.primary.main,
  padding: '0.5',
  display: 'flex',
  justifyContent: 'space-around',
};

export const textFieldStyles = {
  padding: '1em',
  flexGrow: 1,
  maxHeight: '150px',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.light,
    borderRadius: '3px',
  },
};

export const boxStyles = {
  width: '100%',
  maxWidth: theme.spacing(50),
  height: 'auto',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  borderRadius: theme.spacing(2),
  border: `3px ${theme.palette.primary.light} outset`,
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
};

export const iconButtonStyles = {
  right: '-85px',
  bottom: '5px',
  backgroundColor: theme.palette.secondary.main,
  fontSize: '1.3em',
  color: theme.palette.primary.contrastText,
  border: 'none',
  borderRadius: '50%',
  width: '2em',
  height: '2em',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  cursor: 'pointer',
  outline: 'none',
  transition: 'background-color 0.2s ease, transform 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    transform: 'scale(1.1)',
  },
};

// New styles for date fields
export const dateContainerStyles = {
  display: 'flex', 
  flexDirection: 'column',
  gap: 2,
  mt: 2,
  px: 2,
  pb: 2,
  borderTop: `1px solid ${theme.palette.divider}`,
  pt: 2,
  backgroundColor: 'transparent',
};

export const dateFieldStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  p: 1,
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
};

export const dateValueStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flex: 1,
};
