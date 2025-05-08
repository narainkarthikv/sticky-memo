import React from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ThemeSelector = ({ selectedTheme, setSelectedTheme }) => {
  const theme = useTheme();

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
    localStorage.setItem("selectedTheme", event.target.value);
  };

  return (
    <Select
      value={selectedTheme}
      onChange={handleThemeChange}
      sx={{
        marginLeft: "auto",
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        borderRadius: "8px",
        "&:hover": { backgroundColor: theme.palette.action.hover },
        [theme.breakpoints.down("sm")]: { fontSize: "0.875rem", padding: theme.spacing(0.5) },
      }}
    >
      <MenuItem value="atlassian">Atlassian</MenuItem>
      <MenuItem value="azure">Azure</MenuItem>
      <MenuItem value="fireflies">Fireflies</MenuItem>
    </Select>
  );
};

export default ThemeSelector;
