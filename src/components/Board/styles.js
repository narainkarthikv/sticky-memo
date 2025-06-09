import theme from '../../theme';
import { styled } from '@mui/system';

export const cardStyles = (item, isCompact = false) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  background: `linear-gradient(135deg, ${
    item.checked
      ? theme.palette.success.light
      : item.held
      ? theme.palette.warning.light
      : theme.palette.accent.light
  }, ${
    item.checked
      ? theme.palette.success.main
      : item.held
      ? theme.palette.warning.main
      : theme.palette.accent.main
  })`,
  borderRadius: theme.spacing(isCompact ? 1 : 2),
  width: '100%',
  minHeight: theme.spacing(isCompact ? 18 : 24),
  maxHeight: theme.spacing(isCompact ? 32 : 40),
  padding: theme.spacing(isCompact ? 1 : 2),
  boxShadow: isCompact
    ? '0 1px 4px rgba(0, 0, 0, 0.1)'
    : '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: isCompact
      ? '0 2px 8px rgba(0, 0, 0, 0.15)'
      : '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: theme.spacing(isCompact ? 16 : 20),
    padding: theme.spacing(isCompact ? 0.75 : 1.5),
  },
});

export const buttonStyle = {
  color: theme.palette.primary.contrastText,
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(0.25),
  minWidth: { xs: 40, sm: 44 }, // Touch-friendly minimum size
  minHeight: { xs: 40, sm: 44 },
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    transform: 'scale(1.05)',
  },
  transition: 'all 0.2s ease-in-out',
  // Touch device optimizations
  '@media (hover: none)': {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      transform: 'none',
    },
  },
};

export const typographyStyles = {
  minHeight: { xs: theme.spacing(5), sm: theme.spacing(6) },
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: {
    xs: `0 ${theme.spacing(1)}`,
    sm: `0 ${theme.spacing(1.5)}`,
    md: `0 ${theme.spacing(2)}`,
  },
  borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
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
