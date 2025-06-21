// import { useState } from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BackHandIcon from '@mui/icons-material/BackHand';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Palette from '@mui/icons-material/Palette';
import PushPin from '@mui/icons-material/PushPin';
import PushPinOutlined from '@mui/icons-material/PushPinOutlined';
import SaveIcon from '@mui/icons-material/Save';
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
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

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
import { holdItem, checkItem, deleteItem } from '../../utils/helper';

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

/**
 * NoteCard component for displaying a note.
 * @param {object} props - The props for NoteCard.
 * @param {object} props.item - The note item.
 * @param {number} props.index - The index of the note.
 * @param {string|number} props.id - The note id.
 * @param {boolean} props.isEditing - Is the note being edited.
 * @param {string|number} props.editingId - The id of the note being edited.
 * @param {string} props.editedTitle - The edited title.
 * @param {function} props.setEditedTitle - Setter for edited title.
 * @param {string} props.editedContent - The edited content.
 * @param {function} props.setEditedContent - Setter for edited content.
 * @param {function} props.handleEdit - Edit handler.
 * @param {function} props.handleSave - Save handler.
 * @param {function} props.handleClickPopover - Popover click handler.
 * @param {function} props.handleClosePopover - Popover close handler.
 * @param {object} props.anchorEl - Popover anchor element.
//  * @param {function} props.setAnchorEl - Setter for anchor element.
 * @param {function} props.handleDragStart - Drag start handler.
 * @param {function} props.handleDrop - Drop handler.
 * @param {function} props.handleDragOver - Drag over handler.
 * @param {function} props.setItems - Setter for items.
 * @param {function} props.setSnackbar - Setter for snackbar.
 * @param {array} props.items - List of items.
 * @param {boolean} [props.isCompact=false] - Compact mode.
 * @returns {JSX.Element} The rendered NoteCard component.
 */
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
  // setAnchorEl,
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
  // const [dateHover, setDateHover] = useState(null);
  const theme = useTheme();

  /**
   * Calculates number of days remaining
   * @returns {number|null}
   */
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

  /**
   * Get chip color based on days remaining.
   * @returns {string}
   */
  const getDueDateChipColor = () => {
    if (daysRemaining === null) return 'default';
    if (daysRemaining < 0) return 'error';
    if (daysRemaining <= 2) return 'warning';
    return 'success';
  };

  /**
   * Handle start date changes
   * @param {object} e -> Change event for the start date input
   */
  const handleStartDateChange = (e) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      startDate: e.target.value,
    };
    setItems(updatedItems);
  };

  /**
   * Handle due date changes
   * @param {object} e -> Change event for due date input
   */
  const handleDueDateChange = (e) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      dueDate: e.target.value,
    };
    setItems(updatedItems);
  };

  /**
   * Handle color change
   * @param {string} newColor -> New color value for the note
   */
  const handleColorChange = (newColor) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      color: newColor,
    };
    setItems(updatedItems);
  };

  /**
   * Handle pin toggle
   * @returns {void}
   */
  const handlePinToggle = () => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      pinned: !updatedItems[index].pinned,
    };
    setItems(updatedItems);
  };

  /**
   * Get background color based on note color
   * @returns {string}
   */
  const getBackgroundColor = () => {
    const colorData = NOTE_COLORS.find(
      (color) => color.value === (item.color || 'default'),
    );
    return colorData ? colorData.color : 'transparent';
  };

  return (
    <Card
      draggable
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
      }}
      variant='outlined'
      onDragOver={(e) => handleDragOver(e)}
      onDragStart={() => handleDragStart(index)}
      onDrop={(e) => handleDrop(index, e)}>
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
                fullWidth
                defaultValue={item.title}
                size='small'
                onChange={(e) => setEditedTitle(e.target.value)}
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
            <Tooltip arrow title={item.pinned ? 'Unpin note' : 'Pin note'}>
              <IconButton
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
                }}
                onClick={handlePinToggle}>
                {item.pinned ? (
                  <PushPin fontSize={isCompact ? 'small' : 'medium'} />
                ) : (
                  <PushPinOutlined fontSize={isCompact ? 'small' : 'medium'} />
                )}
              </IconButton>
            </Tooltip>

            {/* Color Picker */}
            <Tooltip arrow title='Change color'>
              <IconButton
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
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Simple color cycling for now
                  const currentIndex = NOTE_COLORS.findIndex(
                    (c) => c.value === (item.color || 'default'),
                  );
                  const nextIndex = (currentIndex + 1) % NOTE_COLORS.length;
                  handleColorChange(NOTE_COLORS[nextIndex].value);
                }}>
                <Palette fontSize={isCompact ? 'small' : 'medium'} />
              </IconButton>
            </Tooltip>
            <IconButton
              aria-describedby={ariaDescribedById}
              sx={buttonStyle}
              onClick={(e) => handleClickPopover(e, id)}>
              <MoreVertIcon fontSize='small' />
            </IconButton>

            <Popover
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              id={ariaDescribedById}
              open={open}
              onClose={handleClosePopover}>
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
                <Tooltip arrow placement='right' title='Check note'>
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
                </Tooltip>
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
                fullWidth
                multiline
                defaultValue={item.content}
                rows={4}
                size='small'
                sx={textFieldStyles}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <TextField
                  id='startDate'
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <CalendarTodayIcon
                        fontSize='small'
                        sx={{ mr: 1, color: theme.palette.primary.main }}
                      />
                    ),
                  }}
                  label='Start Date'
                  size='small'
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
                  type='date'
                  value={item.startDate || ''}
                  onChange={handleStartDateChange}
                />
                <TextField
                  id='dueDate'
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <EventIcon
                        fontSize='small'
                        sx={{ mr: 1, color: theme.palette.secondary.main }}
                      />
                    ),
                  }}
                  label='Due Date'
                  size='small'
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
                  type='date'
                  value={item.dueDate || ''}
                  onChange={handleDueDateChange}
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
                    color={getDueDateChipColor()}
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
                    size='small'
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

NoteCard.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isEditing: PropTypes.bool.isRequired,
  editingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  editedTitle: PropTypes.string,
  setEditedTitle: PropTypes.func,
  editedContent: PropTypes.string,
  setEditedContent: PropTypes.func,
  handleEdit: PropTypes.func,
  handleSave: PropTypes.func,
  handleClickPopover: PropTypes.func,
  handleClosePopover: PropTypes.func,
  anchorEl: PropTypes.any,
  // setAnchorEl: PropTypes.func,
  handleDragStart: PropTypes.func,
  handleDrop: PropTypes.func,
  handleDragOver: PropTypes.func,
  setItems: PropTypes.func,
  setSnackbar: PropTypes.func,
  items: PropTypes.array,
  isCompact: PropTypes.bool,
};

export default NoteCard;
