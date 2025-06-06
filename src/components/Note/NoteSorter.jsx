import React, { useState } from 'react';
import { MenuItem, Select } from '@mui/material';

// eslint-disable-next-line react/prop-types
const NoteSorter = ({onSort, sort, SORT}) => {
  return (
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={sort}
        onChange={onSort}
        placeholder="Sort by..."
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={SORT.TitleDown}>⬇️ Abc</MenuItem>
        <MenuItem value={SORT.TitleUp}>⬆️ Abc</MenuItem>
        <MenuItem value={SORT.Check}>✅ Checked</MenuItem>
        <MenuItem value={SORT.UnCheck}>❎ Unchecked</MenuItem>
        <MenuItem value={SORT.Hold}>🛑 Hold</MenuItem>
        <MenuItem value={SORT.UnHold}>🟢 Unhold</MenuItem>
      </Select>
  );
};

export default NoteSorter;