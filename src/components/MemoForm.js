import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MemoForm = ({ addMemo }) => {
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addMemo({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <Paper sx={{ p: 2, mb: 2, backgroundColor: theme.palette.background.paper }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" color={theme.palette.text.primary}>
              Add a new memo
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Memo
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default MemoForm;
