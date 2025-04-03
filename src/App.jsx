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

function App() {

  return (
    <Router>
      <Box sx={{ textAlign: 'center' }}>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Navbar />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
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
  );
}

export default App;
