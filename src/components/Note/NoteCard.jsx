import React, { useState } from 'react';
import { Card, CardContent, IconButton, Popover, TextField, Typography, Box, Tooltip, Fade, Chip } from '@mui/material';
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
import { cardStyles, buttonStyle, typographyStyles, popoverStyles, textFieldStyles, dateContainerStyles, dateFieldStyles, dateValueStyles } from './styles';
import { useTheme } from '@mui/material/styles';

const NoteCard = ({
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
  const theme = useTheme();

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
    <Card
      variant="outlined"
      draggable
      onDragStart={() => handleDragStart(index)}
      onDrop={(e) => handleDrop(index, e)}
      onDragOver={(e) => handleDragOver(e)}
      sx={cardStyles(item)}
    >
      <CardContent sx={{ padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography sx={typographyStyles}>
          <>
            {isEditing && editingId === id ? (
              <TextField size='small' onChange={(e) => setEditedTitle(e.target.value)} defaultValue={item.title} fullWidth />
            ) : (
              <span style={{ fontWeight: 'bolder' }}>{item.title}</span>
            )}
          </>
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton
              sx={buttonStyle}
              aria-describedby={ariaDescribedById}
              onClick={(e) => handleClickPopover(e, id)}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>

            <Popover
              id={ariaDescribedById}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Typography sx={popoverStyles}>
                <IconButton
                  sx={buttonStyle}
                  onClick={() => {
                    handleEdit();
                    handleClosePopover();
                  }}
                >
                  <EditIcon fontSize="small" sx={{ color: theme.palette.primary.contrastText }} />
                </IconButton>
                <IconButton
                  sx={buttonStyle}
                  onClick={() => {
                    checkItem(setItems, id, setSnackbar, 'Note');
                    handleClosePopover();
                  }}
                >
                  <CheckCircleIcon fontSize="small" sx={{ color: theme.palette.primary.contrastText }} />
                </IconButton>
                <IconButton
                  sx={buttonStyle}
                  onClick={() => {
                    holdItem(setItems, id, setSnackbar, 'Note');
                    handleClosePopover();
                  }}
                >
                  <BackHandIcon fontSize="small" sx={{ color: theme.palette.primary.contrastText }} />
                </IconButton>
                <IconButton
                  sx={buttonStyle}
                  onClick={() => {
                    deleteItem(setItems, id, setSnackbar, 'Note');
                    handleClosePopover();
                  }}
                >
                  <DeleteIcon fontSize="small" sx={{ color: theme.palette.primary.contrastText }} />
                </IconButton>
              </Typography>
            </Popover>
          </Box>
        </Typography>

        <Box sx={{ flex: 1, p: 2 }}>
          {isEditing && editingId === id ? (
            <>
              <TextField
                size='small'
                onChange={(e) => setEditedContent(e.target.value)}
                defaultValue={item.content}
                fullWidth
                multiline
                rows={4}
                sx={textFieldStyles}
              />
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <TextField
                  size="small"
                  id="startDate"
                  label="Start Date"
                  type="date"
                  value={item.startDate || ''}
                  onChange={handleStartDateChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <CalendarTodayIcon
                        fontSize="small"
                        sx={{ mr: 1, color: theme.palette.primary.main }}
                      />
                    ),
                  }}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
                <TextField
                  size="small"
                  id="dueDate"
                  label="Due Date"
                  type="date"
                  value={item.dueDate || ''}
                  onChange={handleDueDateChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <EventIcon
                        fontSize="small"
                        sx={{ mr: 1, color: theme.palette.secondary.main }}
                      />
                    ),
                  }}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.secondary.main,
                      },
                    },
                  }}
                />
              </Box>
              <IconButton
                sx={{ ...buttonStyle, mt: 1 }}
                onClick={() => handleSave(item, id, editedTitle, editedContent)}
              >
                <SaveIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <>
              <Typography sx={{ mb: 2 }}>{item.content}</Typography>
              <Box sx={dateContainerStyles}>
                {item.startDate && (
                  <Tooltip title="Start Date" TransitionComponent={Fade}>
                    <Box sx={dateFieldStyles}>
                      <CalendarTodayIcon
                        fontSize="small"
                        sx={{
                          mr: 0.5,
                          color: theme.palette.primary.main
                        }}
                      />
                      <Typography sx={dateValueStyles}>
                        {new Date(item.startDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Tooltip>
                )}
                {item.dueDate && (
                  <Tooltip title="Due Date" TransitionComponent={Fade}>
                    <Box sx={dateFieldStyles}>
                      <EventIcon
                        fontSize="small"
                        sx={{
                          mr: 0.5,
                          color: theme.palette.secondary.main
                        }}
                      />
                      <Typography sx={dateValueStyles}>
                        {new Date(item.dueDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Tooltip>
                )}
                {daysRemaining !== null && (
                  <Chip
                    size="small"
                    icon={
                      <AccessTimeIcon
                        sx={{
                          color: daysRemaining < 0 ?
                            theme.palette.error.main :
                            daysRemaining <= 2 ?
                              theme.palette.warning.main :
                              theme.palette.success.main
                        }}
                      />
                    }
                    label={`${daysRemaining} days ${daysRemaining < 0 ? 'overdue' : 'remaining'}`}
                    color={getDueDateChipColor()}
                    sx={{
                      ml: 1,
                      fontWeight: 500,
                      border: '1px solid',
                      borderColor: daysRemaining < 0 ?
                        theme.palette.error.main :
                        daysRemaining <= 2 ?
                          theme.palette.warning.main :
                          theme.palette.success.main
                    }}
                  />
                )}
              </Box>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
