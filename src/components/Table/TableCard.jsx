import React, { useState } from 'react';
import { TableRow, TableCell, IconButton, Popover, TextField, Typography, Box, Tooltip, Chip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BackHandIcon from '@mui/icons-material/BackHand';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { holdItem, checkItem, deleteItem } from '../../utils/helper';
import { tableRowStyles, buttonStyle, boxStyles, contentBoxStyles, popoverTypographyStyles } from './styles'; // Import specific styles

const TableCard = ({
  item,
  index,
  id,
  isEditing,
  editingId,
  editedTitle,
  setEditedTitle,
  editedContent,
  setEditedContent,
  handleEdit,
  handleSave,
  handleClickPopover,
  handleClosePopover,
  anchorEl,
  setAnchorEl,
  handleDragStart,
  handleDrop,
  handleDragOver,
  setItems,
  setSnackbar,
  items,
}) => {
  const open = Boolean(anchorEl);
  const ariaDescribedById = open ? 'simple-popover' : undefined;
  const [dateHover, setDateHover] = useState(null);

  // Calculate days remaining if due date exists
  const calculateDaysRemaining = () => {
    if (!item.dueDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(item.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    const differenceInTime = dueDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
  };

  const daysRemaining = calculateDaysRemaining();

  // Get chip color based on days remaining
  const getDueDateChipColor = () => {
    if (daysRemaining === null) return 'default';
    if (daysRemaining < 0) return 'error';
    if (daysRemaining <= 2) return 'warning';
    return 'success';
  };

  // Handle date changes
  const handleStartDateChange = (e) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      startDate: e.target.value
    };
    setItems(updatedItems);
  };

  const handleDueDateChange = (e) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      dueDate: e.target.value
    };
    setItems(updatedItems);
  };

  return (
    <TableRow
      key={id}
      id={id}
      draggable
      onDragStart={(e) => handleDragStart(index)}
      onDrop={(e) => handleDrop(index, e)}
      onDragOver={(e) => handleDragOver(e)}
      sx={tableRowStyles(item)} // Apply the styles
    >
      <TableCell align="center" sx={{ color: 'inherit' }}>
        {isEditing && editingId === id ? (
          <TextField onChange={(e) => setEditedTitle(e.target.value)} defaultValue={item.title} fullWidth />
        ) : (
          <span>{item.title}</span>
        )}
      </TableCell>
      <TableCell align="center" sx={{ color: 'inherit' }}>
        <Box sx={boxStyles}>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ flex: { xs: '1 1 50%', sm: '1 1 66%' } }}>
              {isEditing && editingId === id ? (
                <TextField onChange={(e) => setEditedContent(e.target.value)} defaultValue={item.content} fullWidth multiline rows={4} />
              ) : (
                <span>{item.content}</span>
              )}
            </Box>
            <Box sx={{ flex: { xs: '1 1 50%', sm: '1 1 33%' }, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton aria-describedby={ariaDescribedById} variant="contained" onClick={(e) => handleClickPopover(e, id)}>
                <MoreVertIcon sx={buttonStyle} fontSize="small" />
              </IconButton>
              <Popover
                id={ariaDescribedById}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <Typography sx={popoverTypographyStyles}>
                  <IconButton
                    onClick={() => {
                      if (isEditing) {
                        handleSave(item, editingId, editedTitle, editedContent);
                      } else {
                        handleEdit();
                      }
                    }}
                    variant='contained'
                  >
                    {isEditing ? (
                      <SaveIcon fontSize="small" sx={buttonStyle} />
                    ) : (
                      <EditIcon fontSize="small" sx={buttonStyle} />
                    )}
                  </IconButton>
                  <IconButton onClick={() => holdItem(setItems, editingId, setSnackbar, 'Row')} variant="contained">
                    <BackHandIcon fontSize="small" sx={buttonStyle} />
                  </IconButton>
                  <IconButton onClick={() => checkItem(setItems, editingId, setSnackbar, 'Row')} variant="contained">
                    <CheckCircleIcon fontSize="small" sx={buttonStyle} />
                  </IconButton>
                  <IconButton onClick={() => {
                    deleteItem(setItems, editingId, setSnackbar, 'Row')
                  }} variant="contained">
                    <DeleteIcon fontSize="small" sx={buttonStyle} />
                  </IconButton>
                </Typography>
              </Popover>
            </Box>
          </Box>
        </Box>
      </TableCell>
      {/* Start Date Cell */}
      <TableCell align='center'>
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}
          onMouseEnter={() => setDateHover('start')}
          onMouseLeave={() => setDateHover(null)}
        >
          <Tooltip title="Start Date" arrow>
            <CalendarTodayIcon
              fontSize="small"
              color="primary"
              sx={{
                transition: 'transform 0.2s ease',
                transform: dateHover === 'start' ? 'scale(1.2)' : 'scale(1)'
              }}
            />
          </Tooltip>
          {isEditing && editingId === id ? (
            <TextField
              size='small'
              type="date"
              InputLabelProps={{ shrink: true }}
              value={item.startDate || ''}
              onChange={handleStartDateChange}
              sx={{ minWidth: '200px' }}
            />
          ) : item.startDate ? (
            <Chip
              label={`${new Date(item.startDate).toLocaleDateString()}`}
              color="primary"
              variant="outlined"
              size="small"
              sx={{ background: 'rgba(255, 255, 255, 0.7)' }}
            />
          ) : (
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
              Not set
            </Typography>
          )}
        </Box>
      </TableCell>
      {/* Due Date Cell */}
      <TableCell align='center'>
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}
          onMouseEnter={() => setDateHover('due')}
          onMouseLeave={() => setDateHover(null)}
        >
          <Tooltip title="Due Date" arrow>
            <EventIcon
              fontSize="small"
              color="error"
              sx={{
                transition: 'transform 0.2s ease',
                transform: dateHover === 'due' ? 'scale(1.2)' : 'scale(1)'
              }}
            />
          </Tooltip>
          {isEditing && editingId === id ? (
            <TextField
              size='small'
              type="date"
              InputLabelProps={{ shrink: true }}
              value={item.dueDate || ''}
              onChange={handleDueDateChange}
              sx={{ minWidth: '200px' }}
            />
          ) : item.dueDate ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={`${new Date(item.dueDate).toLocaleDateString()}`}
                color={getDueDateChipColor()}
                variant="outlined"
                size="small"
                sx={{ background: 'rgba(255, 255, 255, 0.7)' }}
              />
              {daysRemaining !== null && (
                <Tooltip title={`${Math.abs(daysRemaining)} days ${daysRemaining >= 0 ? 'remaining' : 'overdue'}`}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon fontSize="small" color={daysRemaining < 0 ? "error" : "action"} />
                    <Typography variant="caption" sx={{ ml: 0.5, color: daysRemaining < 0 ? 'error.main' : 'text.secondary' }}>
                      {daysRemaining === 0 ? "Today" :
                        daysRemaining === 1 ? "Tomorrow" :
                          daysRemaining === -1 ? "Yesterday" :
                            daysRemaining > 0 ? `${daysRemaining}d` :
                              `${Math.abs(daysRemaining)}d ago`}
                    </Typography>
                  </Box>
                </Tooltip>
              )}
            </Box>
          ) : (
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
              Not set
            </Typography>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableCard;
