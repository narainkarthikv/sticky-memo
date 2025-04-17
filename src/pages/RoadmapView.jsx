import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useRecoilValue } from "recoil";
import { itemsState } from "../utils/state";
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";

const RoadmapView = () => {
  const items = useRecoilValue(itemsState);

  // Define the timeline range (e.g., current month)
  const timelineStart = startOfMonth(new Date());
  const timelineEnd = endOfMonth(new Date());

  // Generate an array of dates for the timeline
  const timelineDays = eachDayOfInterval({ start: timelineStart, end: timelineEnd });

  // Group items by their start date
  const itemsByDate = items.reduce((acc, item) => {
    const startDate = item.startDate ? format(new Date(item.startDate), "yyyy-MM-dd") : null;
    if (startDate) {
      if (!acc[startDate]) acc[startDate] = [];
      acc[startDate].push(item);
    }
    return acc;
  }, {});

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f9f9f9", color: "#000", height: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
        Roadmap
      </Typography>
      <Paper elevation={3} sx={{ overflowX: "auto", padding: 2, borderRadius: 2 }}>
        {/* Timeline Header */}
        <Box
          sx={{
            display: "flex",
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 1,
            borderBottom: "2px solid #e0e0e0",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ width: 200, flexShrink: 0 }} />
          {timelineDays.map((day) => (
            <Box
              key={day}
              sx={{
                width: 150,
                textAlign: "center",
                padding: 1,
                borderRight: "1px solid #e0e0e0",
              }}
            >
              <Typography variant="body2" fontWeight="bold" color="text.secondary">
                {format(day, "MMM dd")}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Items Rows */}
        {items.map((item, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #e0e0e0",
              minHeight: 60,
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            {/* Item Title */}
            <Box
              sx={{
                width: 200,
                flexShrink: 0,
                padding: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="body2" fontWeight="bold" color="text.primary">
                {item.title}
              </Typography>
            </Box>

            {/* Timeline Cells */}
            {timelineDays.map((day) => {
              const dayKey = format(day, "yyyy-MM-dd");
              const isItemOnDay =
                item.startDate && format(new Date(item.startDate), "yyyy-MM-dd") === dayKey;

              return (
                <Box
                  key={day}
                  sx={{
                    width: 150,
                    textAlign: "center",
                    borderRight: "1px solid #e0e0e0",
                    backgroundColor: isItemOnDay ? "#e8f5e9" : "transparent",
                    transition: "background-color 0.2s",
                    "&:hover": {
                      backgroundColor: isItemOnDay ? "#c8e6c9" : "#f9f9f9",
                    },
                    borderRadius: isItemOnDay ? 1 : 0,
                  }}
                >
                  {isItemOnDay && (
                    <Typography variant="body2" fontWeight="bold" color="text.primary">
                      {item.title}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default RoadmapView;
