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
  const tasks = [
    {
      title: "Task 1",
      startDate: "2023-10-01",
      dueDate: "2023-10-10",
      description: "Description for Task 1",
    },
    {
      title: "Task 2",
      startDate: "2023-10-05",
      dueDate: "2023-10-15",
      description: "Description for Task 2",
    },
  ];

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
              <Route path='/roadmap' element={<RoadmapView tasks={tasks} />} />
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
