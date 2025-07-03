import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BackHandIcon from '@mui/icons-material/BackHand';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SaveIcon from '@mui/icons-material/Save';
import PushPin from '@mui/icons-material/PushPin';
import PushPinOutlined from '@mui/icons-material/PushPinOutlined';
import { useTheme, Box, IconButton, Tooltip, Paper } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import Fade from '@mui/material/Fade';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { useState } from 'react';

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

/**
 * BoardCard component displays and manages an individual item (note) on a board.
 * It provides functionalities for viewing, editing, holding, checking, and deleting items,
 * along with date tracking.
 * @param {object} props - The properties passed to the component.
 * @param {object} props.item - The data object representing the current item.
 * @param {number} props.index - The index of the item within the parent items array.
 * @param {string} props.id - The unique identifier of the item.
 * @param {boolean} props.isEditing - Flag indicating if any item is currently being edited.
 * @param {string|null} props.editingId - The ID of the item currently in editing mode.
 * @param {string} props.editedTitle - The title being edited in the TextField.
 * @param {function} props.setEditedTitle - Function to update the editedTitle state.
 * @param {string} props.editedContent - The content being edited in the TextField.
 * @param {function} props.setEditedContent - Function to update the editedContent state.
 * @param {function} props.handleEdit - Callback function to initiate editing mode for the card.
 * @param {function} props.handleSave - Callback function to save edited changes.
 * @param {function} props.handleClickPopover - Callback to open the action popover.
 * @param {function} props.handleClosePopover - Callback to close the action popover.
 * @param {HTMLElement|null} props.anchorEl - The DOM element to which the popover is anchored.
 * @param {function} props.handleDragStart - Callback for drag start event.
 * @param {function} props.handleDrop - Callback for drop event.
 * @param {function} props.handleDragOver - Callback for drag over event.
 * @param {function} props.setItems - Function to update the main items array state.
 * @param {function} props.setSnackbar - Function to show snackbar notifications.
 * @param {Array<object>} props.items - The full array of all items in the board.
 * @param {boolean} [props.isCompact=false] - Optional prop to render a compact version of the card.
 * @returns {JSX.Element} A React component representing a board card.
 */
const BoardCard = ({
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
  handlePinToggle, // New prop for pin toggle
}) => {
  const theme = useTheme();

  const open = Boolean(anchorEl);
  const ariaDescribedById = open ? 'simple-popover' : undefined;
  const [dateHover, setDateHover] = useState(null);

  /**
   * Calculates the number of days remaining until the item's due date.
   * @returns {number|null} The difference in days or null if no due date.
   */
  const calculateDaysRemaining = () => {
    if (!item.dueDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    const dueDate = new Date(item.dueDate);
    dueDate.setHours(0, 0, 0, 0); // Normalize to start of day

    const differenceInTime = dueDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
  };

  const daysRemaining = calculateDaysRemaining();

  /**
   * Determines the Material-UI Chip color based on the days remaining until the due date.
   * @returns {'default'|'error'|'warning'|'success'} The color string for the Chip component.
   */
  const getDueDateChipColor = () => {
    if (daysRemaining === null) return 'default';
    if (daysRemaining < 0) return 'error'; // Overdue
    if (daysRemaining <= 2) return 'warning'; // Due soon
    return 'success'; // Plenty of time
  };

  /**
   * Handles the change event for the start date input field.
   * Updates the start date of the current item in the items array.
   * @param {Object} e - The event object from the input change.
   * @returns {void}
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
   * Handles the change event for the due date input field.
   * Updates the due date of the current item in the items array.
   * @param {Object} e - The event object from the input change.
   * @returns {void}
   */
  const handleDueDateChange = (e) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      dueDate: e.target.value,
    };
    setItems(updatedItems);
  };

  // Card highlight style for pinned
  const cardStyle = {
    backgroundColor: item.pinned ? theme.palette.warning.light : theme.palette.background.paper,
    border: item.pinned ? `2px solid ${theme.palette.warning.main}` : `1px solid ${theme.palette.divider}`,
    boxShadow: item.pinned ? theme.shadows.cardHover : theme.shadows.card,
    transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
    borderRadius: 2,
    mb: 2,
    p: 2,
    position: 'relative',
  };

  return (
    <Paper elevation={0} sx={cardStyle}>
      {/* Pin icon top right, always visible */}
      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}>
        <Tooltip arrow title={item.pinned ? 'Unpin board' : 'Pin board'}>
          <IconButton
            size='small'
            sx={{
              color: item.pinned ? theme.palette.warning.main : theme.palette.action.active,
              backgroundColor: item.pinned ? theme.palette.warning.light : 'transparent',
              '&:hover': { backgroundColor: theme.palette.action.hover },
              borderRadius: 1.5,
              p: 0.5,
            }}
            onClick={() => handlePinToggle(item.id)}>
            {item.pinned ? (
              <PushPin fontSize='small' />
            ) : (
              <PushPinOutlined fontSize='small' />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <CardContent
        sx={{
          padding: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          color: 'inherit',
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
          <Box sx={{ marginLeft: 'auto' }}>
            {/* Only show the More actions button */}
            <Tooltip arrow placement='top' title='More actions'>
              <IconButton
                aria-describedby={ariaDescribedById}
                sx={buttonStyle}
                onClick={(e) => handleClickPopover(e, id)}>
                <MoreVertIcon fontSize='small' />
              </IconButton>
            </Tooltip>
            <Popover
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              id={ariaDescribedById}
              open={open}
              onClose={handleClosePopover}>
              <Box sx={{ display: 'flex', flexDirection: 'column', p: 1, gap: 1 }}>
                <Tooltip
                  arrow
                  placement='top'
                  title={isEditing ? 'Save note' : 'Edit note'}>
                  <IconButton
                    variant='contained'
                    onClick={() => {
                      if (isEditing) {
                        handleSave(item, editingId, editedTitle, editedContent);
                      } else {
                        handleEdit();
                      }
                    }}>
                    {isEditing ? (
                      <SaveIcon fontSize='small' sx={buttonStyle} />
                    ) : (
                      <EditIcon fontSize='small' sx={buttonStyle} />
                    )}
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement='top' title='Hold note'>
                  <IconButton
                    variant='contained'
                    onClick={() => {
                      holdItem(setItems, editingId, setSnackbar, 'Board');
                    }}>
                    <BackHandIcon fontSize='small' sx={buttonStyle} />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement='top' title='Check note'>
                  <IconButton
                    variant='contained'
                    onClick={() =>
                      checkItem(setItems, editingId, setSnackbar, 'Board')
                    }>
                    <CheckCircleIcon fontSize='small' sx={buttonStyle} />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement='top' title='Delete note'>
                  <IconButton
                    variant='contained'
                    onClick={() =>
                      deleteItem(setItems, editingId, setSnackbar, 'Board')
                    }>
                    <DeleteIcon fontSize='small' sx={buttonStyle} />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow title={item.pinned ? 'Unpin board' : 'Pin board'}>
                  <IconButton
                    size='small'
                    sx={{
                      color: item.pinned ? 'warning.main' : 'action.active',
                      backgroundColor: item.pinned ? 'warning.light' : 'transparent',
                      '&:hover': { backgroundColor: 'action.hover' },
                      borderRadius: 1.5,
                      p: 0.5,
                    }}
                    onClick={() => handlePinToggle(id)}>
                    {item.pinned ? (
                      <PushPin fontSize='small' />
                    ) : (
                      <PushPinOutlined fontSize='small' />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </Popover>
          </Box>
        </Typography>

        {/* Scrollable Content Area */}
        <Typography sx={textFieldStyles}>
          {isEditing && editingId === id ? (
            <TextField
              multiline
              defaultValue={item.content}
              rows={4}
              size='small'
              sx={{ width: '100%' }}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            <span>{item.content}</span>
          )}
        </Typography>

        {/* Enhanced Date fields */}
        <Box sx={dateContainerStyles}>
          {/* Start Date */}
          <Box
            sx={dateFieldStyles}
            onMouseEnter={() => setDateHover('start')}
            onMouseLeave={() => setDateHover(null)}>
            <Tooltip arrow title='Start Date'>
              <CalendarTodayIcon
                color='primary'
                fontSize='small'
                sx={{
                  transition: 'transform 0.2s ease',
                  transform: dateHover === 'start' ? 'scale(1.2)' : 'scale(1)',
                }}
              />
            </Tooltip>

            <Box sx={dateValueStyles}>
              {isEditing && editingId === id ? (
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  label='Start Date'
                  size='small'
                  type='date'
                  value={item.startDate || ''}
                  variant='outlined'
                  onChange={handleStartDateChange}
                />
              ) : (
                <Fade in={true}>
                  <Box>
                    {item.startDate ? (
                      <Chip
                        color='primary'
                        label={`Started: ${new Date(
                          item.startDate,
                        ).toLocaleDateString()}`}
                        size='small'
                        sx={{ background: 'rgba(255, 255, 255, 0.7)' }}
                        variant='outlined'
                      />
                    ) : (
                      <Typography
                        sx={{ color: 'text.secondary', fontStyle: 'italic' }}
                        variant='body2'>
                        No start date
                      </Typography>
                    )}
                  </Box>
                </Fade>
              )}
            </Box>
          </Box>

          {/* Due Date */}
          <Box
            sx={dateFieldStyles}
            onMouseEnter={() => setDateHover('due')}
            onMouseLeave={() => setDateHover(null)}>
            <Tooltip arrow title='Due Date'>
              <EventIcon
                color="error"
                fontSize="small"
                sx={{
                  transition: 'transform 0.2s ease',
                  transform: dateHover === 'due' ? 'scale(1.2)' : 'scale(1)',
                }}
              />
            </Tooltip>

            <Box sx={dateValueStyles}>
              {isEditing && editingId === id ? (
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  label='Due Date'
                  size='small'
                  type='date'
                  value={item.dueDate || ''}
                  variant='outlined'
                  onChange={handleDueDateChange}
                />
              ) : (
                <Fade in={true}>
                  <Box>
                    {item.dueDate ? (
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          color={getDueDateChipColor()}
                          label={`Due: ${new Date(
                            item.dueDate,
                          ).toLocaleDateString()}`}
                          size='small'
                          sx={{ background: 'rgba(255, 255, 255, 0.7)' }}
                          variant='outlined'
                        />
                        {daysRemaining !== null && (
                          <Tooltip
                            title={`${Math.abs(daysRemaining)} days ${
                              daysRemaining >= 0 ? 'remaining' : 'overdue'
                            }`}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <AccessTimeIcon
                                color={daysRemaining < 0 ? 'error' : 'action'}
                                fontSize='small'
                              />
                              <Typography
                                sx={{
                                  ml: 0.5,
                                  color:
                                    daysRemaining < 0
                                      ? 'error.main'
                                      : 'text.secondary',
                                }}
                                variant='caption'>
                                {daysRemaining === 0
                                  ? 'Today'
                                  : daysRemaining === 1
                                    ? 'Tomorrow'
                                    : daysRemaining === -1
                                      ? 'Yesterday'
                                      : daysRemaining > 0
                                        ? `${daysRemaining} days`
                                        : `${Math.abs(daysRemaining)} days ago`}
                              </Typography>
                            </Box>
                          </Tooltip>
                        )}
                      </Box>
                    ) : (
                      <Typography
                        sx={{ color: 'text.secondary', fontStyle: 'italic' }}
                        variant='body2'>
                        No due date
                      </Typography>
                    )}
                  </Box>
                </Fade>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Paper>
  );
};

// PropTypes for validation
BoardCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    startDate: PropTypes.string, // Assuming date strings like 'YYYY-MM-DD'
    dueDate: PropTypes.string, // Assuming date strings like 'YYYY-MM-DD'
    pinned: PropTypes.bool, // Ensure pinned is included
    // Add other properties of 'item' if they exist and are used
  }).isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editingId: PropTypes.string, // Can be null or a string ID
  editedTitle: PropTypes.string.isRequired,
  setEditedTitle: PropTypes.func.isRequired,
  editedContent: PropTypes.string.isRequired,
  setEditedContent: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleClickPopover: PropTypes.func.isRequired,
  handleClosePopover: PropTypes.func.isRequired,
  anchorEl: PropTypes.oneOfType([
    PropTypes.instanceOf(Element),
    PropTypes.func, // For cases where anchorEl might be a ref function
  ]),
  handleDragStart: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  handleDragOver: PropTypes.func.isRequired,
  setItems: PropTypes.func.isRequired,
  setSnackbar: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired, // Assuming an array of objects
  isCompact: PropTypes.bool,
  handlePinToggle: PropTypes.func.isRequired, // New prop type for pin toggle
};

export default BoardCard;
