import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/common/Navbar";
// import Footer from "./components/common/Footer";
import LandingPage from "./pages/LandingPage";
import NoteList from "./pages/NoteList";
import TableList from "./pages/TableList";
import BoardList from "./pages/BoardList";
import NotFoundPage from "./pages/NotFoundPage";
import RoadmapView from "./pages/RoadmapView";
import { Box } from "@mui/material";
import { ItemProvider } from './context/ItemContext';

function AppContent() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) {
    // Landing page: no navbar, no sidebar
    return (
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  }

  // All other pages: with navbar/sidebar
  return (
    <Box sx={{
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary',
    }}>
      <Box sx={{
        display: 'flex',
        flexGrow: 1,
        bgcolor: 'background.default',
        color: 'text.primary',
      }}>
        <Navbar />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          width: '100%',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}>
          <Routes>
            <Route path='/notes' element={<NoteList />} />
            <Route path='/tables' element={<TableList />} />
            <Route path='/boards' element={<BoardList />} />
            <Route path='/roadmap' element={<RoadmapView />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          {/* <Footer /> */}
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ItemProvider>
      <Router>
        <AppContent />
      </Router>
    </ItemProvider>
  );
}

export default App;
