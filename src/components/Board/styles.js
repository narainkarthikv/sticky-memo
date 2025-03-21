import theme from '../../theme';

export const cardStyles = (item) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: item.checked ? theme.palette.success.main : item.held ? theme.palette.warning.main : theme.palette.accent.main,
  borderRadius: '12px',
  width: '250px',
  height: '150px',
  padding: '1em',
  transition: 'transform 0.3s ease-in, background-color 0.3s ease-in',
  margin: '20px 15px 0px 0px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': { transform: 'scale(1.02)', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)' },
});

export const buttonStyle = {
  color: theme.palette.primary.contrastText,
  borderRadius: '100%',
  backgroundColor: theme.palette.secondary.main,
  padding: '3px',
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
};

export const boxStyles = {
  width: '250px',
  height: '120px',
  backgroundColor: theme.palette.background.paper,
  padding: '1.3em',
  margin: '1.3em',
  borderRadius: '20px',
  border: `3px ${theme.palette.primary.light} outset`,
  boxShadow: 'solid 10 2px 5px #aaa;',
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
