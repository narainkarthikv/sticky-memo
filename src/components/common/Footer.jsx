import React from 'react';
import { Box, Link, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import { footerStyles } from './styles';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box component="footer" sx={{ ...footerStyles.footer, backgroundColor: theme.palette.primary.main }}>
      <Typography variant="body2" sx={{ ...footerStyles.inlineText, color: theme.palette.primary.contrastText }}>
        &#169; 2024 Open-Source Project -
      </Typography>
      <IconButton
        href="https://www.github.com/narainkarthikv/Sticky-Memo"
        target="_blank"
        rel="noopener noreferrer"
        sx={footerStyles.iconButton}
      >
        <GitHubIcon />
      </IconButton>
      <Typography variant="body2" sx={{ ...footerStyles.inlineText, ml: 0.5, color: theme.palette.primary.contrastText }}>
        Developed By
      </Typography>
      <IconButton
        href="https://www.github.com/narainkarthikv"
        target="_blank"
        rel="noopener noreferrer"
        sx={footerStyles.iconButton}
      >
        <DeveloperModeIcon />
      </IconButton>
      <Link
        href="https://www.github.com/narainkarthikv"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ ...footerStyles.link, color: theme.palette.secondary.main }}
      />
    </Box>
  );
}

export default Footer;
