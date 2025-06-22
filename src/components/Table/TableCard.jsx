
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BackHandIcon from '@mui/icons-material/BackHand';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SaveIcon from '@mui/icons-material/Save';
import {
  TableRow,
  TableCell,
  IconButton,
  Popover,
  TextField,
  Typography,
  Box,
  Tooltip,
  Chip,
} from '@mui/material';
import PropTypes from 'prop-types'; // Import PropTypes
import { useState } from 'react';

import {
  tableRowStyles,
  buttonStyle,
  boxStyles,
  popoverTypographyStyles,
} from './styles';
import { holdItem, checkItem, deleteItem } from '../../utils/helper';

/**
 * TableCard component displays and manages an individual item (note) as a table row.
 * It provides functionalities for viewing, editing, holding, checking, and deleting items,
 * along with date tracking within a table structure.
 *
 * @param {object} props - The properties passed to the component.
 * @param {object} props.item - The data object representing the current item (note).
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
 * @returns {JSX.Element} A React component representing a table row for a note.
 */
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

  /**
   * Calculates the number of days remaining until the item's due date.
   * @returns {number|null} The difference in days (positive for future
   * negative for past), or null if no due date.
   */
  const calculateDaysRemaining = () => {
    // Line 89 starts here
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

  return (
    <TableRow
      key={id}
      draggable
      id={id}
      sx={tableRowStyles(item)} // Apply the styles
      onDragOver={(e) => handleDragOver(e)}
      onDragStart={() => handleDragStart(index)} // Corrected event parameter handling
      onDrop={(e) => handleDrop(index, e)}
    >
      <TableCell align='center' sx={{ color: 'inherit' }}>
        {isEditing && editingId === id ? (
          <TextField
            fullWidth
            defaultValue={item.title}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <span>{item.title}</span>
        )}
      </TableCell>
      <TableCell align='center' sx={{ color: 'inherit' }}>
        <Box sx={boxStyles}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Box sx={{ flex: { xs: '1 1 50%', sm: '1 1 66%' } }}>
              {isEditing && editingId === id ? (
                <TextField
                  fullWidth
                  multiline
                  defaultValue={item.content}
                  rows={4}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              ) : (
                <span>{item.content}</span>
              )}
            </Box>
            <Box
              sx={{
                flex: { xs: '1 1 50%', sm: '1 1 33%' },
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
              <Tooltip arrow placement='right' title='More actions'>
                <IconButton
                  aria-describedby={ariaDescribedById}
                  variant='contained'
                  onClick={(e) => handleClickPopover(e, id)}>
                  <MoreVertIcon fontSize='small' sx={buttonStyle} />
                </IconButton>
              </Tooltip>
              <Popover
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={ariaDescribedById}
                open={open}
                onClose={handleClosePopover}>
                <Typography sx={popoverTypographyStyles}>
                  <Tooltip
                    arrow
                    placement='bottom'
                    title={isEditing ? 'Save note' : 'Edit note'}>
                    <IconButton
                      variant='contained'
                      onClick={() => {
                        if (isEditing) {
                          handleSave(
                            item,
                            editingId,
                            editedTitle,
                            editedContent,
                          );
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
                  <Tooltip arrow placement='bottom' title='Hold note'>
                    <IconButton
                      variant='contained'
                      onClick={() =>
                        holdItem(setItems, editingId, setSnackbar, 'Row')
                      }>
                      <BackHandIcon fontSize='small' sx={buttonStyle} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement='bottom' title='Check note'>
                    <IconButton
                      variant='contained'
                      onClick={() =>
                        checkItem(setItems, editingId, setSnackbar, 'Row')
                      }>
                      <CheckCircleIcon fontSize='small' sx={buttonStyle} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement='bottom' title='Delete icon'>
                    <IconButton
                      variant='contained'
                      onClick={() => {
                        deleteItem(setItems, editingId, setSnackbar, 'Row');
                      }}>
                      <DeleteIcon fontSize='small' sx={buttonStyle} />
                    </IconButton>
                  </Tooltip>
                </Typography>
              </Popover>
            </Box>
          </Box>
        </Box>
      </TableCell>
      {/* Start Date Cell */}
      <TableCell align='center'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
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
          {isEditing && editingId === id ? (
            <TextField
              InputLabelProps={{ shrink: true }}
              size='small'
              sx={{ minWidth: '200px' }}
              type='date'
              value={item.startDate || ''}
              onChange={handleStartDateChange}
            />
          ) : item.startDate ? (
            <Chip
              color='primary'
              label={`${new Date(item.startDate).toLocaleDateString()}`}
              size='small'
              sx={{ background: 'rgba(255, 255, 255, 0.7)' }}
              variant='outlined'
            />
          ) : (
            <Typography
              sx={{ fontStyle: 'italic', color: 'text.secondary' }}
              variant='body2'>
              Not set
            </Typography>
          )}
        </Box>
      </TableCell>
      {/* Due Date Cell */}
      <TableCell align='center'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
          onMouseEnter={() => setDateHover('due')}
          onMouseLeave={() => setDateHover(null)}>
          <Tooltip arrow title='Due Date'>
            <EventIcon
              color='error'
              fontSize='small'
              sx={{
                transition: 'transform 0.2s ease',
                transform: dateHover === 'due' ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          </Tooltip>
          {isEditing && editingId === id ? (
            <TextField
              InputLabelProps={{ shrink: true }}
              size='small'
              sx={{ minWidth: '200px' }}
              type='date'
              value={item.dueDate || ''}
              onChange={handleDueDateChange}
            />
          ) : item.dueDate ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                color={getDueDateChipColor()}
                label={`${new Date(item.dueDate).toLocaleDateString()}`}
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
                          daysRemaining < 0 ? 'error.main' : 'text.secondary',
                      }}
                      variant='caption'>
                      {daysRemaining === 0
                        ? 'Today'
                        : daysRemaining === 1
                          ? 'Tomorrow'
                          : daysRemaining === -1
                            ? 'Yesterday'
                            : daysRemaining > 0
                              ? `${daysRemaining}d`
                              : `${Math.abs(daysRemaining)}d ago`}
                    </Typography>
                  </Box>
                </Tooltip>
              )}
            </Box>
          ) : (
            <Typography
              sx={{ fontStyle: 'italic', color: 'text.secondary' }}
              variant='body2'>
              Not set
            </Typography>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
};

// PropTypes for validation
TableCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    startDate: PropTypes.string, // Assuming date strings like 'YYYY-MM-DD'
    dueDate: PropTypes.string, // Assuming date strings like 'YYYY-MM-DD'
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
};

export default TableCard;
