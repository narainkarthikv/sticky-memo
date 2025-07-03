import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Popover,
  Typography,
  Box,
  TextField,
} from '@mui/material';
import PushPin from '@mui/icons-material/PushPin';
import PushPinOutlined from '@mui/icons-material/PushPinOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import BackHandIcon from '@mui/icons-material/BackHand';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
  tableRowStyles,
  buttonStyle,
  boxStyles,
  popoverTypographyStyles,
} from './styles';
import { getCardStateStyles, calculateDaysRemaining, getDueDateChipColor, getPinIconProps } from '../../utils/cardHelpers';

// Helper: Get chip color for due date
function getDueDateColor(daysRemaining, theme) {
  if (daysRemaining === null) return theme.palette.grey[300];
  if (daysRemaining < 0) return theme.palette.error.light;
  if (daysRemaining <= 2) return theme.palette.warning.light;
  return theme.palette.success.light;
}

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
  handlePinToggle,
}) => {
  const theme = useTheme();
  const open = Boolean(anchorEl) && editingId === id;
  const ariaDescribedById = open ? `popover-${id}` : undefined;
  const daysRemaining = calculateDaysRemaining(item.dueDate);
  const isRowEditing = isEditing && editingId === id;

  // Local state for editable dates
  const [editedStartDate, setEditedStartDate] = useState(item.startDate || '');
  const [editedDueDate, setEditedDueDate] = useState(item.dueDate || '');

  useEffect(() => {
    if (isRowEditing) {
      setEditedStartDate(item.startDate || '');
      setEditedDueDate(item.dueDate || '');
    }
  }, [isRowEditing, item.startDate, item.dueDate]);

  // Handlers for editing
  const onTitleChange = (e) => setEditedTitle(e.target.value);
  const onContentChange = (e) => setEditedContent(e.target.value);
  const onStartDateChange = (e) => setEditedStartDate(e.target.value);
  const onDueDateChange = (e) => setEditedDueDate(e.target.value);

  // Save handler with date fields
  const onSave = () => {
    handleSave(
      item,
      id,
      editedTitle,
      editedContent,
      editedStartDate,
      editedDueDate
    );
  };

  // Pin icon props
  const pinProps = getPinIconProps(item.pinned, theme);

  return (
    <TableRow
      sx={{ ...getCardStateStyles(item, theme) }}
      draggable
      onDragStart={() => handleDragStart(index)}
      onDrop={(e) => handleDrop(index, e)}
      onDragOver={handleDragOver}
      aria-label={item.pinned ? 'Pinned row' : 'Row'}
      tabIndex={0}
    >
      {/* Pin icon */}
      <TableCell align="center" sx={{ width: 48, p: 0 }}>
        <Tooltip title={item.pinned ? 'Unpin row' : 'Pin row'} arrow>
          <IconButton
            aria-label={item.pinned ? 'Unpin row' : 'Pin row'}
            onClick={() => handlePinToggle(id)}
            sx={{
              color: pinProps.color,
              backgroundColor: pinProps.backgroundColor,
              borderRadius: 1.5,
              p: 0.5,
              '&:hover': { backgroundColor: theme.palette.action.hover },
            }}
            size="small"
          >
            {item.pinned ? <PushPin fontSize="small" /> : <PushPinOutlined fontSize="small" />}
          </IconButton>
        </Tooltip>
      </TableCell>
      {/* Title */}
      <TableCell align="center">
        {isRowEditing ? (
          <TextField
            value={editedTitle}
            onChange={onTitleChange}
            size="small"
            variant="standard"
            fullWidth
            inputProps={{ 'aria-label': 'Edit title' }}
          />
        ) : (
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {item.title}
          </Typography>
        )}
      </TableCell>
      {/* Content */}
      <TableCell align="center">
        {isRowEditing ? (
          <TextField
            value={editedContent}
            onChange={onContentChange}
            size="small"
            variant="standard"
            fullWidth
            multiline
            minRows={2}
            inputProps={{ 'aria-label': 'Edit content' }}
          />
        ) : (
          <Typography variant="body2">{item.content}</Typography>
        )}
      </TableCell>
      {/* Start Date */}
      <TableCell align="center">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <EventIcon fontSize="small" color="action" />
          {isRowEditing ? (
            <TextField
              type="date"
              value={editedStartDate}
              onChange={onStartDateChange}
              size="small"
              variant="standard"
              inputProps={{ 'aria-label': 'Edit start date' }}
              sx={{ minWidth: 110 }}
            />
          ) : (
            <Typography variant="caption">
              {item.startDate ? item.startDate : '--'}
            </Typography>
          )}
        </Box>
      </TableCell>
      {/* Due Date */}
      <TableCell align="center">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <CalendarTodayIcon fontSize="small" color="action" />
          {isRowEditing ? (
            <TextField
              type="date"
              value={editedDueDate}
              onChange={onDueDateChange}
              size="small"
              variant="standard"
              inputProps={{ 'aria-label': 'Edit due date' }}
              sx={{ minWidth: 110 }}
            />
          ) : (
            <Typography
              variant="caption"
              sx={{
                backgroundColor: getDueDateChipColor(daysRemaining, theme),
                borderRadius: 1,
                px: 1,
                py: 0.5,
                fontWeight: 500,
                color: daysRemaining < 0 ? theme.palette.error.dark : theme.palette.text.primary,
              }}
            >
              {item.dueDate ? item.dueDate : '--'}
              {item.dueDate && (
                <span style={{ marginLeft: 6, fontWeight: 400 }}>
                  ({daysRemaining < 0 ? `${Math.abs(daysRemaining)}d overdue` : `${daysRemaining}d left`})
                </span>
              )}
            </Typography>
          )}
        </Box>
      </TableCell>
      {/* Actions */}
      <TableCell align="center" sx={{ width: 64, p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }}>
          {/* Only show the More actions button */}
          <Tooltip title="More actions" arrow>
            <IconButton
              aria-describedby={ariaDescribedById}
              onClick={(e) => handleClickPopover(e, id)}
              sx={buttonStyle}
              size="small"
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Popover
            id={ariaDescribedById}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            disableRestoreFocus
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', p: 1, gap: 1 }}>
              <Tooltip title={isRowEditing ? 'Save' : 'Edit'} arrow>
                <IconButton
                  onClick={isRowEditing ? onSave : () => handleEdit(id, item.title, item.content)}
                  sx={buttonStyle}
                  size="small"
                >
                  {isRowEditing ? <SaveIcon fontSize="small" /> : <EditIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Hold" arrow>
                <IconButton
                  onClick={() => holdItem(setItems, id, setSnackbar, 'Row')}
                  sx={buttonStyle}
                  size="small"
                >
                  <BackHandIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Check" arrow>
                <IconButton
                  onClick={() => checkItem(setItems, id, setSnackbar, 'Row')}
                  sx={buttonStyle}
                  size="small"
                >
                  <CheckCircleIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" arrow>
                <IconButton
                  onClick={() => deleteItem(setItems, id, setSnackbar, 'Row')}
                  sx={buttonStyle}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title={item.pinned ? 'Unpin row' : 'Pin row'} arrow>
                <IconButton
                  aria-label={item.pinned ? 'Unpin row' : 'Pin row'}
                  onClick={() => handlePinToggle(id)}
                  sx={{
                    color: pinProps.color,
                    backgroundColor: pinProps.backgroundColor,
                    borderRadius: 1.5,
                    p: 0.5,
                    '&:hover': { backgroundColor: theme.palette.action.hover },
                  }}
                  size="small"
                >
                  {item.pinned ? <PushPin fontSize="small" /> : <PushPinOutlined fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Box>
          </Popover>
        </Box>
      </TableCell>
    </TableRow>
  );
};

TableCard.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isEditing: PropTypes.bool.isRequired,
  editingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  editedTitle: PropTypes.string,
  setEditedTitle: PropTypes.func.isRequired,
  editedContent: PropTypes.string,
  setEditedContent: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleClickPopover: PropTypes.func.isRequired,
  handleClosePopover: PropTypes.func.isRequired,
  anchorEl: PropTypes.any,
  handleDragStart: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  handleDragOver: PropTypes.func.isRequired,
  setItems: PropTypes.func.isRequired,
  setSnackbar: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  handlePinToggle: PropTypes.func.isRequired,
};

export default TableCard;
