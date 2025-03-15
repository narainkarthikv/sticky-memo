import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddButton = ({ onClick }) => {
  return (
    <Fab color="primary" aria-label="add" onClick={onClick}>
      <AddIcon />
    </Fab>
  );
};

export default AddButton;