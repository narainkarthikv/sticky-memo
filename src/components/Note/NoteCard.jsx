import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
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
  cardStyles,
  buttonStyle,
  typographyStyles,
  popoverStyles,
  textFieldStyles,
  dateContainerStyles,
  dateFieldStyles,
  dateValueStyles,
  popoverButtonStyle,
} from './styles';
import { holdItem, checkItem, deleteItem } from '../../utils/helper';
import { useSpring, animated } from '@react-spring/web';

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

// Helper: Calculate days remaining until due date
function calculateDaysRemaining(dueDate) {
  if (!dueDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return Math.ceil((due.getTime() - today.getTime()) / (1000 * 3600 * 24));
}

// Helper: Get chip color for due date
function getDueDateChipColor(daysRemaining) {
  if (daysRemaining === null) return 'default';
  if (daysRemaining < 0) return 'error';
  if (daysRemaining <= 2) return 'warning';
  return 'success';
}

// Helper: Get background color for note
function getBackgroundColor(item) {
  const colorData = NOTE_COLORS.find(
    (color) => color.value === (item.color || 'default')
  );
  return colorData ? colorData.color : 'transparent';
}

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
  handleDragStart,
  handleDrop,
  handleDragOver,
  setItems,
  setSnackbar,
  items,
  isCompact = false,
  handlePinToggle,
}) => {
  const theme = useTheme();
  const open = Boolean(anchorEl);
  const ariaDescribedById = open ? 'simple-popover' : undefined;
  const daysRemaining = calculateDaysRemaining(item.dueDate);

  // Animation for pin icon
  const pinSpring = useSpring({
    transform: item.pinned ? 'rotate(-30deg) scale(1.2)' : 'rotate(0deg) scale(1)',
    config: { tension: 300, friction: 15 },
  });

  // Animation for card drag
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragStartCard = (idx) => {
    setIsDragging(true);
    handleDragStart(idx);
  };
  const handleDropCard = (idx, e) => {
    setIsDragging(false);
    handleDrop(idx, e);
  };

  // Handlers
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

  const handleColorChange = (e) => {
    e.stopPropagation();
    const currentIndex = NOTE_COLORS.findIndex(
      (c) => c.value === (item.color || 'default')
    );
    const nextIndex = (currentIndex + 1) % NOTE_COLORS.length;
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      color: NOTE_COLORS[nextIndex].value,
    };
    setItems(updatedItems);
  };

  return (
    <Card
      draggable
      tabIndex={0}
      sx={{
        ...cardStyles(item, isCompact),
        backgroundColor: item.pinned
          ? theme.palette.warning.light
          : getBackgroundColor(item),
        border: item.pinned
          ? `2px solid ${theme.palette.warning.main}`
          : `1px solid ${theme.palette.divider}`,
        boxShadow: isDragging
          ? '0 8px 24px rgba(0,0,0,0.18)'
          : item.pinned
            ? '0 4px 16px rgba(255,193,7,0.18)'
            : isCompact
              ? '0 1px 4px rgba(0,0,0,0.08)'
              : '0 2px 8px rgba(0,0,0,0.10)',
        borderRadius: theme.spacing(2),
        transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
        '&:hover': {
          boxShadow: isCompact
            ? '0 2px 8px rgba(0,0,0,0.12)'
            : '0 4px 16px rgba(0,0,0,0.13)',
          transform: 'translateY(-2px) scale(1.01)',
        },
        minHeight: 210,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        outline: isDragging ? `2px solid ${theme.palette.primary.main}` : undefined,
      }}
      variant='outlined'
      onDragOver={handleDragOver}
      onDragStart={() => handleDragStartCard(index)}
      onDrop={(e) => handleDropCard(index, e)}
      onDragEnd={() => setIsDragging(false)}
    >
      {/* Pin icon top right, always visible, animated */}
      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}>
        <Tooltip arrow title={item.pinned ? 'Unpin note' : 'Pin note'}>
          <animated.span style={pinSpring}>
            <IconButton
              size='small'
              sx={{
                color: item.pinned ? theme.palette.warning.main : theme.palette.action.active,
                backgroundColor: item.pinned ? theme.palette.warning.light : 'transparent',
                '&:hover': { backgroundColor: theme.palette.action.hover },
                borderRadius: 1.5,
                p: 0.5,
              }}
              onClick={() => handlePinToggle(id)}
              aria-label={item.pinned ? 'Unpin note' : 'Pin note'}
            >
              {item.pinned ? <PushPin fontSize='small' /> : <PushPinOutlined fontSize='small' />}
            </IconButton>
          </animated.span>
        </Tooltip>
      </Box>
      {/* Color palette icon always visible */}
      <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }}>
        <Tooltip arrow title='Change note color'>
          <IconButton
            size='small'
            sx={{
              color: theme.palette.secondary.main,
              backgroundColor: 'rgba(0,0,0,0.04)',
              '&:hover': { backgroundColor: theme.palette.secondary.light },
              borderRadius: 1.5,
              p: 0.5,
            }}
            onClick={handleColorChange}
            aria-label='Change note color'
          >
            <Palette fontSize='small' />
          </IconButton>
        </Tooltip>
      </Box>
      <CardContent
        sx={{
          padding: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {/* Title Row */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {isEditing && editingId === id ? (
              <TextField
                fullWidth
                defaultValue={item.title}
                size='small'
                variant='standard'
                inputProps={{ style: { fontWeight: 700, fontSize: 18 } }}
                onChange={(e) => setEditedTitle(e.target.value)}
                sx={{ mb: 0.5 }}
              />
            ) : (
              <Typography
                variant='h6'
                sx={{ fontWeight: 700, fontSize: 18, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {item.title}
              </Typography>
            )}
          </Box>
          {/* More actions popover icon (only visible action button) */}
          <Tooltip arrow placement='right' title='More actions'>
            <IconButton
              aria-describedby={ariaDescribedById}
              sx={{ ...buttonStyle, borderRadius: 1.5, p: 0.5 }}
              size='small'
              onClick={(e) => handleClickPopover(e, id)}
            >
              <MoreVertIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Popover
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={ariaDescribedById}
            open={open}
            onClose={handleClosePopover}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', p: 1, gap: 1 }}>
              <Tooltip arrow placement='top' title={isEditing ? 'Save note' : 'Edit note'}>
                <IconButton
                  variant='contained'
                  sx={popoverButtonStyle}
                  onClick={() => {
                    if (isEditing) {
                      handleSave(item, id, editedTitle, editedContent);
                    } else {
                      handleEdit();
                    }
                  }}
                >
                  {isEditing ? <SaveIcon fontSize='small' /> : <EditIcon fontSize='small' />}
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement='top' title='Hold note'>
                <IconButton
                  variant='contained'
                  sx={popoverButtonStyle}
                  onClick={() => holdItem(setItems, id, setSnackbar, 'Note')}
                >
                  <BackHandIcon fontSize='small' />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement='top' title='Check note'>
                <IconButton
                  variant='contained'
                  sx={popoverButtonStyle}
                  onClick={() => checkItem(setItems, id, setSnackbar, 'Note')}
                >
                  <CheckCircleIcon fontSize='small' />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement='top' title='Delete note'>
                <IconButton
                  variant='contained'
                  sx={popoverButtonStyle}
                  onClick={() => deleteItem(setItems, id, setSnackbar, 'Note')}
                >
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title={item.pinned ? 'Unpin note' : 'Pin note'}>
                <IconButton
                  size='small'
                  sx={{
                    color: item.pinned ? theme.palette.warning.main : theme.palette.action.active,
                    backgroundColor: item.pinned ? theme.palette.warning.light : 'transparent',
                    '&:hover': { backgroundColor: theme.palette.action.hover },
                    borderRadius: 1.5,
                    p: 0.5,
                  }}
                  onClick={() => handlePinToggle(id)}
                  aria-label={item.pinned ? 'Unpin note' : 'Pin note'}
                >
                  {item.pinned ? <PushPin fontSize='small' /> : <PushPinOutlined fontSize='small' />}
                </IconButton>
              </Tooltip>
            </Box>
          </Popover>
        </Box>
        {/* Content Row */}
        <Box sx={{ flex: 1, p: 0, mt: 0.5 }}>
          {isEditing && editingId === id ? (
            <React.Fragment>
              <TextField
                fullWidth
                multiline
                defaultValue={item.content}
                rows={3}
                size='small'
                variant='standard'
                sx={{ ...textFieldStyles, mb: 1 }}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <TextField
                  id='startDate'
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <CalendarTodayIcon fontSize='small' sx={{ mr: 1, color: theme.palette.primary.main }} />
                    ),
                  }}
                  label='Start Date'
                  size='small'
                  variant='standard'
                  sx={{ flex: 1 }}
                  type='date'
                  value={item.startDate || ''}
                  onChange={handleStartDateChange}
                />
                <TextField
                  id='dueDate'
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <EventIcon fontSize='small' sx={{ mr: 1, color: theme.palette.secondary.main }} />
                    ),
                  }}
                  label='Due Date'
                  size='small'
                  variant='standard'
                  sx={{ flex: 1 }}
                  type='date'
                  value={item.dueDate || ''}
                  onChange={handleDueDateChange}
                />
              </Box>
              <Tooltip arrow placement='right' title='Save note'>
                <IconButton
                  sx={{ ...buttonStyle, mt: 1, alignSelf: 'flex-end' }}
                  onClick={() => handleSave(item, id, editedTitle, editedContent)}
                >
                  <SaveIcon fontSize='small' />
                </IconButton>
              </Tooltip>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mb: 1.5, color: theme.palette.text.secondary, fontSize: 15, lineHeight: 1.5, minHeight: 48 }}>
                {item.content}
              </Typography>
              <Box sx={{ ...dateContainerStyles, mt: 1 }}>
                {item.startDate && (
                  <Tooltip title='Start Date' TransitionComponent={Fade}>
                    <Box sx={dateFieldStyles}>
                      <CalendarTodayIcon fontSize='small' sx={{ mr: 0.5, color: theme.palette.primary.main }} />
                      <Typography sx={dateValueStyles}>
                        {new Date(item.startDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Tooltip>
                )}
                {item.dueDate && (
                  <Tooltip title='Due Date' TransitionComponent={Fade}>
                    <Box sx={dateFieldStyles}>
                      <EventIcon fontSize='small' sx={{ mr: 0.5, color: theme.palette.secondary.main }} />
                      <Typography sx={dateValueStyles}>
                        {new Date(item.dueDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Tooltip>
                )}
                {daysRemaining !== null && (
                  <Chip
                    color={getDueDateChipColor(daysRemaining)}
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
                    label={`${daysRemaining} days ${daysRemaining < 0 ? 'overdue' : 'remaining'}`}
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
                      backgroundColor: 'rgba(0,0,0,0.03)',
                    }}
                  />
                )}
              </Box>
            </React.Fragment>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

NoteCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    content: PropTypes.string,
    startDate: PropTypes.string,
    dueDate: PropTypes.string,
    pinned: PropTypes.bool,
    color: PropTypes.string,
  }).isRequired,
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
  handleDragStart: PropTypes.func,
  handleDrop: PropTypes.func,
  handleDragOver: PropTypes.func,
  setItems: PropTypes.func,
  setSnackbar: PropTypes.func,
  items: PropTypes.array,
  isCompact: PropTypes.bool,
  handlePinToggle: PropTypes.func.isRequired,
};

export default NoteCard;
