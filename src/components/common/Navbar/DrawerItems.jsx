import React from "react";
import { List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import NoteIcon from "@mui/icons-material/Note";
import TimelineIcon from "@mui/icons-material/Timeline";

const DrawerItems = () => (
  <List>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Tooltip title="Boards" placement="right" arrow>
          <ListItemButton component={RouterLink} to="/boards">
            <ListItemIcon>
              <DashboardOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Boards" />
          </ListItemButton>
        </Tooltip>
      </Grid>
      <Grid item xs={12}>
        <Tooltip title="Tables" placement="right" arrow>
          <ListItemButton component={RouterLink} to="/tables">
            <ListItemIcon>
              <TableChartOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Tables" />
          </ListItemButton>
        </Tooltip>
      </Grid>
      <Grid item xs={12}>
        <Tooltip title="Notes" placement="right" arrow>
          <ListItemButton component={RouterLink} to="/">
            <ListItemIcon>
              <NoteIcon />
            </ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItemButton>
        </Tooltip>
      </Grid>
      <Grid item xs={12}>
        <Tooltip title="Roadmap" placement="right" arrow>
          <ListItemButton component={RouterLink} to="/roadmap">
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Roadmap" />
          </ListItemButton>
        </Tooltip>
      </Grid>
    </Grid>
  </List>
);

export default DrawerItems;
