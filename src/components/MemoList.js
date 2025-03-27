import React from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MemoList = ({ memos }) => {
  const theme = useTheme();

  return (
    <Container>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {memos.map((memo) => (
          <Box key={memo.id} width={{ xs: '100%', sm: '48%', md: '31%' }}>
            <Paper sx={{ p: 2, backgroundColor: theme.palette.background.paper }}>
              <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>{memo.title}</Typography>
              <Typography sx={{ color: theme.palette.text.secondary }}>{memo.content}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default MemoList;
