import theme from '../../theme';

export const cardStyles = (item) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: item.checked ? theme.palette.success.main : item.held ? theme.palette.warning.main : theme.palette.accent.main,
  borderRadius: '8px',
  width: '250px',
  height: '175px',
  padding: 0,
  transition: 'transform 0.3s ease-in, background-color 0.3s ease-in',
  margin: '20px 15px 0px 0px',
  border: 'none',
  overflow: 'hidden',
  '&:hover': { transform: 'scale(1.01)' },
});

export const typographyStyles = {
  backgroundColor: theme.palette.primary.main,
  height: '2.6em',
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  alignContent: 'center',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
};

export const buttonStyle = {
  color: theme.palette.primary.contrastText,
  borderRadius: '100%',
  backgroundColor: theme.palette.secondary.main,
  padding: '3px',
};

export const popoverStyles = {
  backgroundColor: theme.palette.primary.main,
  padding: '0.5',
  alignSelf: 'end',
};

export const textFieldStyles = {
  display: "flex",
  flexDirection: "column",
  fontSize: "1em",
  fontWeight: "bold",
  fontFamily: theme.typography.fontFamily,
};

export const boxStyles = {
  width: "250px",
  height: "120px",
  backgroundColor: theme.palette.background.paper,
  padding: "1.3em",
  margin: "1.3em",
  borderRadius: "20px",
  border: `3px ${theme.palette.primary.light} outset`,
  boxShadow: "solid 10 2px 5px #aaa;"
};

export const iconButtonStyles = {
  right: '-85px',
  bottom: '5px',
  backgroundColor: theme.palette.secondary.main,
  fontSize: "1.3em",
  color: theme.palette.primary.contrastText,
  border: "none",
  borderRadius: "50%",
  width: "2em",
  height: "2em",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  cursor: "pointer",
  outline: "none",
  transition: "background-color 0.2s ease, transform 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
    transform: "translateY(-2px)",
  },
  "&:active": {
    transform: "translateY(1px)",
  },
};
