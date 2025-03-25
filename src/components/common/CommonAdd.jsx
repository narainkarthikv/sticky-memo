import React, { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRecoilState } from "recoil";
import { snackbarState } from "../../utils/state";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventIcon from '@mui/icons-material/Event';
import { useTheme } from '@mui/material/styles';

function CommonAdd({ onAdd, itemType, boxStyles, textFieldStyles, iconButtonStyles }) {
  const [item, setItem] = useState({
    title: "",
    content: "",
    startDate: "",
    dueDate: "",
  });

  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const theme = useTheme();

  function submitItem(event) {
    event.preventDefault();
    const success = onAdd(item, setSnackbar, itemType);
    if (success) {
      setItem({
        title: "",
        content: "",
        startDate: "",
        dueDate: "",
      });
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  }

  return (
    <Box sx={boxStyles}>
      <TextField
        size="small"
        id="title"
        name="title"
        value={item.title}
        placeholder="Title"
        onChange={handleChange}
        autoComplete="true"
        fullWidth
        variant="standard"
        sx={textFieldStyles}
      />
      <TextField
        size="small"
        id="content"
        name="content"
        value={item.content}
        placeholder="Type your Content !..."
        onChange={handleChange}
        autoComplete="true"
        multiline
        rows={4}
        fullWidth
        variant="standard"
        sx={textFieldStyles}
      />
      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <TextField
          size="small"
          id="startDate"
          name="startDate"
          label="Start Date"
          type="date"
          value={item.startDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <CalendarTodayIcon 
                fontSize="small" 
                sx={{ mr: 1, color: theme.palette.primary.main }} 
              />
            ),
          }}
          sx={{ 
            flex: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.primary.light,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        />
        <TextField
          size="small"
          id="dueDate"
          name="dueDate"
          label="Due Date"
          type="date"
          value={item.dueDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <EventIcon 
                fontSize="small" 
                sx={{ mr: 1, color: theme.palette.secondary.main }} 
              />
            ),
          }}
          sx={{ 
            flex: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.secondary.light,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.secondary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.secondary.main,
              },
            },
          }}
        />
      </Box>
      <IconButton
        size="small"
        color="primary"
        onClick={submitItem}
        sx={iconButtonStyles}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default CommonAdd;
