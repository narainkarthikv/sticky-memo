import theme from '../../theme';

export const cardStyles = (item, isCompact = false) => ({
  display: 'flex',
  flexDirection: 'column',
  background: `linear-gradient(135deg, ${
    item.checked
      ? theme.palette.success?.light || '#d4edda'
      : item.held
      ? theme.palette.warning?.light || '#fff3cd'
      : '#e2e3e5'
  }, ${
    item.checked
      ? theme.palette.success?.main || '#28a745'
      : item.held
      ? theme.palette.warning?.main || '#ffc107'
      : '#6c757d'
  })`,
  borderRadius: theme.spacing(isCompact ? 1 : 2),
  width: '100%', // Responsive width
  minHeight: {
    xs: theme.spacing(isCompact ? 16 : 20),
    sm: theme.spacing(isCompact ? 18 : 24),
    md: theme.spacing(isCompact ? 20 : 28),
  },
  maxHeight: {
    xs: theme.spacing(isCompact ? 28 : 36),
    sm: theme.spacing(isCompact ? 32 : 40),
    md: theme.spacing(isCompact ? 36 : 44),
  },
  padding: {
    xs: theme.spacing(isCompact ? 1 : 1.5),
    sm: theme.spacing(isCompact ? 1.5 : 2),
    md: theme.spacing(isCompact ? 1.5 : 2.5),
  },
  boxShadow: isCompact
    ? '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
    : '0 2px 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: isCompact
      ? '0 2px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.24)'
      : '0 4px 12px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.24)',
  },
  // Touch device optimizations
  '@media (hover: none)': {
    '&:hover': {
      transform: 'none',
      boxShadow: isCompact
        ? '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
        : '0 2px 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24)',
    },
  },
});

export const buttonStyle = {
  color: theme.palette.primary.contrastText,
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(0.5),
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: {
    xs: theme.spacing(1),
    sm: theme.spacing(1.5),
    md: theme.spacing(2),
  },
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
};

export const popoverStyles = {
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
  gap: theme.spacing(0.5),
  minWidth: { xs: 200, sm: 240 },
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
  padding: {
    xs: theme.spacing(0.75),
    sm: theme.spacing(1),
    md: theme.spacing(1.25),
  },
  borderRadius: theme.spacing(0.5),
  border: `1px solid rgba(255, 255, 255, 0.2)`,
  color: theme.palette.text.primary,
  minHeight: { xs: 36, sm: 40 }, // Touch-friendly height
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  transition: 'background-color 0.2s ease-in-out',
};

export const dateValueStyles = {
  fontSize: '0.875rem',
  color: theme.palette.text.primary,
  fontWeight: 500,
};
