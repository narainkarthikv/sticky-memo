import React, { useState } from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Popover,
  TextField,
  Typography,
  Box,
  Tooltip,
  Fade,
  Chip,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BackHandIcon from '@mui/icons-material/BackHand';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PushPin from '@mui/icons-material/PushPin';
import PushPinOutlined from '@mui/icons-material/PushPinOutlined';
import Palette from '@mui/icons-material/Palette';
import { holdItem, checkItem, deleteItem } from '../../utils/helper';
import {
  cardStyles,
  buttonStyle,
  typographyStyles,
  popoverStyles,
  textFieldStyles,
  dateContainerStyles,
  dateFieldStyles,
  dateValueStyles,
} from './styles';
import { useTheme } from '@mui/material/styles';

// Note color constants
const NOTE_COLORS = [
  { name: 'Default', value: 'default', color: 'transparent' },
  { name: 'Red', value: 'red', color: '#ffebee' },
  { name: 'Orange', value: 'orange', color: '#fff3e0' },
  { name: 'Yellow', value: 'yellow', color: '#fffde7' },
  { name: 'Green', value: 'green', color: '#e8f5e8' },
  { name: 'Teal', value: 'teal', color: '#e0f2f1' },
  { name: 'Blue', value: 'blue', color: '#e3f2fd' },
  { name: 'Purple', value: 'purple', color: '#f3e5f5' },
];

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
  isCompact = false,
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
      startDate: e.target.value,
    };
    setItems(updatedItems);
  };

  const handleDueDateChange = (e) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      dueDate: e.target.value,
    };
    setItems(updatedItems);
  };

  // Handle color change
  const handleColorChange = (newColor) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      color: newColor,
    };
    setItems(updatedItems);
  };

  // Handle pin toggle
  const handlePinToggle = () => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      pinned: !updatedItems[index].pinned,
    };
    setItems(updatedItems);
  };

  // Get background color based on note color
  const getBackgroundColor = () => {
    const colorData = NOTE_COLORS.find(
      (color) => color.value === (item.color || 'default')
    );
    return colorData ? colorData.color : 'transparent';
  };

  return (
    <Card
      variant='outlined'
      draggable
      onDragStart={() => handleDragStart(index)}
      onDrop={(e) => handleDrop(index, e)}
      onDragOver={(e) => handleDragOver(e)}
      sx={{
        ...cardStyles(item, isCompact),
        backgroundColor: getBackgroundColor(),
        border: item.pinned
          ? `2px solid ${theme.palette.warning.main}`
          : `1px solid ${theme.palette.divider}`,
        boxShadow: isCompact
          ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
          : '0 2px 4px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.24)',
        borderRadius: theme.spacing(isCompact ? 1 : 2),
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: isCompact
            ? '0 2px 8px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.24)'
            : '0 4px 12px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.24)',
          transform: 'translateY(-2px)',
        },
      }}>
      <CardContent
        sx={{
          padding: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Typography sx={typographyStyles}>
          <>
            {isEditing && editingId === id ? (
              <TextField
                size='small'
                onChange={(e) => setEditedTitle(e.target.value)}
                defaultValue={item.title}
                fullWidth
              />
            ) : (
              <span style={{ fontWeight: 'bolder' }}>{item.title}</span>
            )}
          </>
          <Box
            sx={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}>
            {/* Pin Button */}
            <Tooltip title={item.pinned ? 'Unpin note' : 'Pin note'} arrow>
              <IconButton
                onClick={handlePinToggle}
                size={isCompact ? 'small' : 'medium'}
                sx={{
                  color: item.pinned
                    ? theme.palette.warning.main
                    : theme.palette.action.active,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}>
                {item.pinned ? (
                  <PushPin fontSize={isCompact ? 'small' : 'medium'} />
                ) : (
                  <PushPinOutlined fontSize={isCompact ? 'small' : 'medium'} />
                )}
              </IconButton>
            </Tooltip>

            {/* Color Picker */}
            <Tooltip title='Change color' arrow>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  // Simple color cycling for now
                  const currentIndex = NOTE_COLORS.findIndex(
                    (c) => c.value === (item.color || 'default')
                  );
                  const nextIndex = (currentIndex + 1) % NOTE_COLORS.length;
                  handleColorChange(NOTE_COLORS[nextIndex].value);
                }}
                size={isCompact ? 'small' : 'medium'}
                sx={{
                  backgroundColor: getBackgroundColor(),
                  border:
                    (item.color || 'default') === 'default'
                      ? `1px solid ${theme.palette.divider}`
                      : 'none',
                  '&:hover': {
                    opacity: 0.8,
                  },
                  transition: 'all 0.2s ease-in-out',
                }}>
                <Palette fontSize={isCompact ? 'small' : 'medium'} />
              </IconButton>
            </Tooltip>
            <IconButton
              sx={buttonStyle}
              aria-describedby={ariaDescribedById}
              onClick={(e) => handleClickPopover(e, id)}>
              <MoreVertIcon fontSize='small' />
            </IconButton>

            <Popover
              id={ariaDescribedById}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}>
              <Typography sx={popoverStyles}>
                <IconButton
                  sx={buttonStyle}
                  onClick={() => {
                    handleEdit();
                    handleClosePopover();
                  }}>
                  <EditIcon
                    fontSize='small'
                    sx={{ color: theme.palette.primary.contrastText }}
                  />
                </IconButton>
                <IconButton
                  sx={buttonStyle}
                  onClick={() => {
                    checkItem(setItems, id, setSnackbar, 'Note');
                    handleClosePopover();
                  }}>
                  <CheckCircleIcon
                    fontSize='small'
                    sx={{ color: theme.palette.primary.contrastText }}
                  />
                </IconButton>
                <IconButton
                  sx={buttonStyle}
                  onClick={() => {
                    holdItem(setItems, id, setSnackbar, 'Note');
                    handleClosePopover();
                  }}>
                  <BackHandIcon
                    fontSize='small'
                    sx={{ color: theme.palette.primary.contrastText }}
                  />
                </IconButton>
                <IconButton
                  sx={buttonStyle}
                  onClick={() => {
                    deleteItem(setItems, id, setSnackbar, 'Note');
                    handleClosePopover();
                  }}>
                  <DeleteIcon
                    fontSize='small'
                    sx={{ color: theme.palette.primary.contrastText }}
                  />
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
                  size='small'
                  id='startDate'
                  label='Start Date'
                  type='date'
                  value={item.startDate || ''}
                  onChange={handleStartDateChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <CalendarTodayIcon
                        fontSize='small'
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
                  size='small'
                  id='dueDate'
                  label='Due Date'
                  type='date'
                  value={item.dueDate || ''}
                  onChange={handleDueDateChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <EventIcon
                        fontSize='small'
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
                onClick={() =>
                  handleSave(item, id, editedTitle, editedContent)
                }>
                <SaveIcon fontSize='small' />
              </IconButton>
            </>
          ) : (
            <>
              <Typography sx={{ mb: 2 }}>{item.content}</Typography>
              <Box sx={dateContainerStyles}>
                {item.startDate && (
                  <Tooltip title='Start Date' TransitionComponent={Fade}>
                    <Box sx={dateFieldStyles}>
                      <CalendarTodayIcon
                        fontSize='small'
                        sx={{
                          mr: 0.5,
                          color: theme.palette.primary.main,
                        }}
                      />
                      <Typography sx={dateValueStyles}>
                        {new Date(item.startDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Tooltip>
                )}
                {item.dueDate && (
                  <Tooltip title='Due Date' TransitionComponent={Fade}>
                    <Box sx={dateFieldStyles}>
                      <EventIcon
                        fontSize='small'
                        sx={{
                          mr: 0.5,
                          color: theme.palette.secondary.main,
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
                    size='small'
                    icon={
                      <AccessTimeIcon
                        sx={{
                          color:
                            daysRemaining < 0
                              ? theme.palette.error.main
                              : daysRemaining <= 2
                              ? theme.palette.warning.main
                              : theme.palette.success.main,
                        }}
                      />
                    }
                    label={`${daysRemaining} days ${
                      daysRemaining < 0 ? 'overdue' : 'remaining'
                    }`}
                    color={getDueDateChipColor()}
                    sx={{
                      ml: 1,
                      fontWeight: 500,
                      border: '1px solid',
                      borderColor:
                        daysRemaining < 0
                          ? theme.palette.error.main
                          : daysRemaining <= 2
                          ? theme.palette.warning.main
                          : theme.palette.success.main,
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
