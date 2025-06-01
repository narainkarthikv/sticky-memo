import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/common/Navbar";
// import Footer from "./components/common/Footer";
import NoteList from "./pages/NoteList";
import TableList from "./pages/TableList";
import BoardList from "./pages/BoardList";
import NotFoundPage from "./pages/NotFoundPage";
import RoadmapView from "./pages/RoadmapView";
import { Box } from "@mui/material";
import { ItemProvider } from './context/ItemContext';

// 🔔 NOTICE for all developers:
// All dynamic items **must** use a UUID (item.id) for identification.
// ❌ Never use array indices for logic, state updates, or as React keys.
// This prevents bugs with reordering, drag-and-drop, and dynamic rendering.
function App() {
  return (
    <ItemProvider>
      <Router>
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
                <Route exact path='/' element={<NoteList />} />
                <Route path='/tables' element={<TableList />} />
                <Route path='/boards' element={<BoardList />} />
                <Route path='/roadmap' element={<RoadmapView />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              {/* <Footer /> */}
            </Box>
          </Box>
        </Box>
      </Router>
    </ItemProvider>
  );
}

export default App;
