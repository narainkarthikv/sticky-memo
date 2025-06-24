import React from 'react';
import { Box, Typography, Button, Container, Stack, Grid, Card, CardContent, Avatar, Link, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <StickyNote2OutlinedIcon color="primary" sx={{ fontSize: 40 }} />, title: 'Smart Pinning', desc: 'Pin important notes to keep them at the top and never lose track of critical tasks.'
  },
  {
    icon: <DashboardOutlinedIcon color="primary" sx={{ fontSize: 40 }} />, title: 'Color Coding', desc: 'Organize with priority-based colors: green for low, orange for medium, red for high priority.'
  },
  {
    icon: <TimelineOutlinedIcon color="primary" sx={{ fontSize: 40 }} />, title: 'Advanced Filtering', desc: 'Filter by status, date, or title to find exactly what you’re looking for instantly.'
  },
];

const views = [
  { icon: <StickyNote2OutlinedIcon color="success" />, title: 'Notes View', desc: 'Card-based layout for visual organization' },
  { icon: <DashboardOutlinedIcon color="primary" />, title: 'Boards View', desc: 'Kanban-style boards for workflow management' },
  { icon: <TableChartOutlinedIcon color="info" />, title: 'Tables View', desc: 'Detailed spreadsheet-like data view' },
  { icon: <TimelineOutlinedIcon color="warning" />, title: 'Roadmap View', desc: 'Timeline visualization for project planning' },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Sticky Memo has revolutionized how our team manages projects. The color coding and multiple views make everything so much clearer.'
  },
  {
    name: 'Mike Chen',
    role: 'Software Developer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'The filtering and sorting features save me hours every week. I can find any note or task in seconds.'
  },
  {
    name: 'Emma Davis',
    role: 'Design Lead',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    text: 'Beautiful interface and intuitive design. It feels like using real sticky notes but with all the digital advantages.'
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#F8FAFF', color: 'text.primary', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          width: '100%',
          minHeight: { xs: 420, md: 420 },
          px: 0,
          py: 0,
          background: 'linear-gradient(135deg, #6a82fb 0%, #fc5c7d 100%)',
          color: '#fff',
          borderRadius: 0,
          boxShadow: '0 2px 16px 0 rgba(80,80,180,0.06)',
          borderBottom: '1px solid #e5e8ef',
          position: 'relative',
        }}
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Container maxWidth="lg" sx={{ pt: 7, pb: 0, px: { xs: 2, md: 4 }, minHeight: 420, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1, minWidth: 320 }}>
            <Typography variant="h2" fontWeight={800} sx={{ fontSize: { xs: 32, md: 40 }, lineHeight: 1.15, mb: 2 }} gutterBottom>
              Organize Your Ideas<br />with Digital Sticky Notes
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: 'rgba(255,255,255,0.92)', fontWeight: 400, fontSize: { xs: 16, md: 20 }, maxWidth: 520 }}>
              Transform your productivity with Sticky Memo – the intuitive note-taking app that brings the simplicity of sticky notes to the digital world.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 0 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ fontWeight: 700, fontSize: 16, px: 3, py: 1.5, borderRadius: 2, boxShadow: '0 2px 8px 0 rgba(80,80,180,0.10)' }}
                onClick={() => navigate('/notes')}
                component={motion.button}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Taking Notes
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                sx={{ fontWeight: 700, fontSize: 16, px: 3, py: 1.5, borderRadius: 2, borderColor: '#fff', color: '#fff', '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,0.08)' } }}
                component={motion.button}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.97 }}
              >
                Watch Demo
              </Button>
            </Stack>
          </Box>
          {/* Demo Cards Illustration */}
          <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', alignItems: 'center', minWidth: 340 }}>
            <Paper elevation={6} sx={{ p: 2.5, borderRadius: 4, bgcolor: '#fff', minWidth: 340, maxWidth: 380, boxShadow: '0 8px 32px 0 rgba(80,80,180,0.10)' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ bgcolor: '#e3fcec', borderRadius: 2, p: 1.2, mb: 1.2, minHeight: 56 }}>
                    <Typography variant="body2" sx={{ color: '#2ecc71', fontWeight: 700, fontSize: 15 }}>Design Review</Typography>
                    <Typography variant="caption" color="text.secondary">Due: Today</Typography>
                  </Box>
                  <Box sx={{ bgcolor: '#fff4e3', borderRadius: 2, p: 1.2, minHeight: 56 }}>
                    <Typography variant="body2" sx={{ color: '#ff9800', fontWeight: 700, fontSize: 15 }}>Bug Fixes</Typography>
                    <Typography variant="caption" color="text.secondary">Due: Friday</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ bgcolor: '#ffe3e3', borderRadius: 2, p: 1.2, mb: 1.2, minHeight: 56 }}>
                    <Typography variant="body2" sx={{ color: '#e74c3c', fontWeight: 700, fontSize: 15 }}>Client Meeting</Typography>
                    <Typography variant="caption" color="text.secondary">Due: Tomorrow</Typography>
                  </Box>
                  <Box sx={{ bgcolor: '#e3eaff', borderRadius: 2, p: 1.2, minHeight: 56 }}>
                    <Typography variant="body2" sx={{ color: '#2980ef', fontWeight: 700, fontSize: 15 }}>Team Standup</Typography>
                    <Typography variant="caption" color="text.secondary">Due: Weekly</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, px: { xs: 1, md: 0 } }}>
        <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={800} sx={{ fontSize: { xs: 26, md: 32 }, mb: 1.5 }}>
            Powerful Features for Better Organization
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 5, color: '#A0A7B8', fontSize: 17, fontWeight: 400 }}>
            Everything you need to manage your tasks and ideas efficiently
          </Typography>
        </Box>
        <Grid container spacing={3.5} justifyContent="center" sx={{ maxWidth: 1100, mx: 'auto' }}>
          {features.map((feature, idx) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
              <Card
                component={motion.div}
                whileHover={{ y: -8, boxShadow: '0 8px 32px rgba(80,80,180,0.18)' }}
                transition={{ type: 'spring', stiffness: 200 }}
                elevation={0}
                sx={{ borderRadius: 4, p: 4, minHeight: 220, alignItems: 'center', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 16px 0 rgba(80,80,180,0.06)' }}
              >
                <Box mb={2}>{feature.icon}</Box>
                <Typography variant="h6" fontWeight={700} sx={{ fontSize: 20, mb: 1 }} align="center">{feature.title}</Typography>
                <Typography variant="body2" align="center" sx={{ color: '#7A869A', fontSize: 15 }}>{feature.desc}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Views Section */}
      <Box sx={{ width: '100%', bgcolor: '#F5F7FA', py: { xs: 8, md: 10 }, borderTop: '1px solid #e5e8ef', borderBottom: '1px solid #e5e8ef' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 1, md: 0 } }}>
          <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={800} sx={{ fontSize: { xs: 26, md: 32 }, mb: 1.5 }}>
              Multiple Views for Every Workflow
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 5, color: '#A0A7B8', fontSize: 17, fontWeight: 400 }}>
              Switch between different views to match your working style
            </Typography>
          </Box>
          <Grid container spacing={3.5} justifyContent="center" sx={{ maxWidth: 1100, mx: 'auto' }}>
            {views.map((view) => (
              <Grid item xs={12} sm={6} md={3} key={view.title}>
                <Card
                  component={motion.div}
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(80,80,180,0.14)' }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  elevation={0}
                  sx={{ borderRadius: 4, p: 3, minHeight: 120, alignItems: 'flex-start', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 16px 0 rgba(80,80,180,0.06)' }}
                >
                  <Box mb={1.5} sx={{ fontSize: 32 }}>{view.icon}</Box>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: 17, mb: 0.5 }} align="left">{view.title}</Typography>
                  <Typography variant="body2" align="left" sx={{ color: '#7A869A', fontSize: 14 }}>{view.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, px: { xs: 1, md: 0 } }}>
        <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={800} sx={{ fontSize: { xs: 26, md: 32 }, mb: 1.5 }}>
            Loved by Teams Worldwide
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 5, color: '#A0A7B8', fontSize: 17, fontWeight: 400 }}>
            See what our users have to say about Sticky Memo
          </Typography>
        </Box>
        <Grid container spacing={3.5} justifyContent="center" sx={{ maxWidth: 1100, mx: 'auto' }}>
          {testimonials.map((t) => (
            <Grid item xs={12} sm={6} md={4} key={t.name}>
              <Card
                component={motion.div}
                whileHover={{ y: -6, boxShadow: '0 8px 32px rgba(80,80,180,0.10)' }}
                transition={{ type: 'spring', stiffness: 200 }}
                elevation={0}
                sx={{ borderRadius: 4, p: 4, minHeight: 200, alignItems: 'center', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 16px 0 rgba(80,80,180,0.06)' }}
              >
                <Avatar src={t.avatar} alt={t.name} sx={{ width: 64, height: 64, mb: 2 }} />
                <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: 17 }}>{t.name}</Typography>
                <Typography variant="caption" sx={{ color: '#A0A7B8', mb: 1, fontSize: 14 }}>{t.role}</Typography>
                <Typography variant="body2" align="center" sx={{ color: '#7A869A', fontSize: 15 }}>{t.text}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          px: 2,
          background: 'linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)',
          color: '#fff',
          borderTop: '1px solid #e5e8ef',
        }}
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h4" fontWeight={800} sx={{ fontSize: { xs: 26, md: 32 }, mb: 2 }}>
            Ready to Transform Your Productivity?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'rgba(255,255,255,0.92)', fontWeight: 400, fontSize: { xs: 16, md: 20 } }}>
            Join thousands of teams already using Sticky Memo to organize their work and boost productivity.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ fontWeight: 700, fontSize: 16, px: 3, py: 1.5, borderRadius: 2, boxShadow: '0 2px 8px 0 rgba(80,80,180,0.10)' }}
              onClick={() => navigate('/notes')}
              component={motion.button}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              sx={{ fontWeight: 700, fontSize: 16, px: 3, py: 1.5, borderRadius: 2, borderColor: '#fff', color: '#fff', '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,0.08)' } }}
              component={motion.button}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
            >
              Open App Now
            </Button>
          </Stack>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, mt: 2, display: 'block' }}>
            No credit card required • 14-day free trial
          </Typography>
        </Container>
      </Box>
      {/* Footer */}
      <Box sx={{ bgcolor: '#151C2B', color: '#fff', py: 5, px: 2, borderTop: '1px solid #232B3E', mt: 0 }}>
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 4 }}>
          <Box sx={{ minWidth: 180, mb: { xs: 3, md: 0 } }}>
            <Typography variant="h6" fontWeight={800} sx={{ color: '#6a82fb', fontSize: 20, mb: 1 }}>
              Sticky Memo
            </Typography>
            <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14 }}>
              The ultimate digital sticky note solution for modern teams.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#fff', mb: 1, fontSize: 15 }}>Product</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14, mb: 0.5 }}>Features</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14, mb: 0.5 }}>Pricing</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14 }}>Updates</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#fff', mb: 1, fontSize: 15 }}>Company</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14, mb: 0.5 }}>About</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14, mb: 0.5 }}>Blog</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14 }}>Contact</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#fff', mb: 1, fontSize: 15 }}>Support</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14, mb: 0.5 }}>Help Center</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14, mb: 0.5 }}>Documentation</Typography>
              <Typography variant="body2" sx={{ color: '#A0A7B8', fontSize: 14 }}>Community</Typography>
            </Box>
          </Box>
        </Container>
        <Divider sx={{ bgcolor: '#232B3E', my: 3 }} />
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#A0A7B8', fontSize: 13 }}>
            © 2024 Sticky Memo. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}