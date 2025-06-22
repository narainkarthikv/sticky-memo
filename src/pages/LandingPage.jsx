import React from 'react';
import { Box, Typography, Button, Container, Stack, Grid, Card, CardContent, Avatar, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const features = [
  {
    title: 'Sticky Notes',
    desc: 'Quickly jot down and organize your thoughts with ease.',
  },
  {
    title: 'Boards & Tables',
    desc: 'Visualize your workflow with flexible boards and tables.',
  },
  {
    title: 'Roadmap View',
    desc: 'Plan ahead and track progress with a beautiful timeline.',
  },
  {
    title: 'Dark & Light Themes',
    desc: 'Switch themes for comfortable viewing any time of day.',
  },
];

const testimonials = [
  {
    name: 'Alex J.',
    text: 'Sticky Memo has transformed the way I organize my projects. The boards and notes are a game changer!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Priya S.',
    text: 'The clean UI and dark mode make it a joy to use every day. Highly recommended!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

const seoDescription = 'Sticky Memo is your all-in-one workspace for notes, boards, and tables. Organize, plan, and collaborate with a beautiful, fast, and secure web app.';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      {/* SEO meta tags */}
      <title>Sticky Memo - Organize Notes, Boards & Tables</title>
      <meta name="description" content={seoDescription} />
      <meta property="og:title" content="Sticky Memo - Organize Notes, Boards & Tables" />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:image" content="/favicon.svg" />
      <Container maxWidth="md" sx={{ pt: 10, pb: 6 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <Typography variant="h2" fontWeight="bold" gutterBottom align="center" sx={{
            background: 'linear-gradient(90deg, #1976d2 30%, #ff9800 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Welcome to Sticky Memo
          </Typography>
          <Typography variant="h5" color="text.secondary" align="center" gutterBottom>
            Organize your notes, boards, and tables in one beautiful workspace.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => navigate('/notes')}
              aria-label="Get Started with Sticky Memo"
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              onClick={() => navigate('/roadmap')}
              aria-label="View Roadmap"
            >
              View Roadmap
            </Button>
          </Stack>
        </motion.div>
        <Box mt={10}>
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
            Features
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} mt={4} alignItems="center" justifyContent="center">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                style={{ width: 250 }}
              >
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: 3,
                    p: 3,
                    minHeight: 160,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom align="center">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" align="center">
                    {feature.desc}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Stack>
        </Box>
        {/* Testimonials Section */}
        <Box mt={10}>
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
            What Our Users Say
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((t, idx) => (
              <Grid item xs={12} md={6} key={t.name}>
                <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2 }}>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar src={t.avatar} alt={t.name} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">{t.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{t.text}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* Call to Action Section */}
        <Box mt={10} textAlign="center">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Ready to boost your productivity?
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={() => navigate('/notes')}
            aria-label="Start Now"
          >
            Start Now
          </Button>
        </Box>
        {/* SEO Links */}
        <Box mt={6} textAlign="center">
          <Link href="/privacy" color="inherit" underline="hover" sx={{ mx: 2 }}>
            Privacy Policy
          </Link>
          <Link href="/terms" color="inherit" underline="hover" sx={{ mx: 2 }}>
            Terms of Service
          </Link>
        </Box>
      </Container>
      <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
        <Typography variant="body2">© {new Date().getFullYear()} Sticky Memo. All rights reserved.</Typography>
      </Box>
    </Box>
  );
}
