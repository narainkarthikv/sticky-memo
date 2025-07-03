// Shared helpers for card-based components (NoteCard, TableCard, BoardCard)

// Calculate days remaining until due date
export function calculateDaysRemaining(dueDate) {
  if (!dueDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return Math.ceil((due.getTime() - today.getTime()) / (1000 * 3600 * 24));
}

// Get chip color for due date (returns MUI color string or theme color)
export function getDueDateChipColor(daysRemaining, theme) {
  if (daysRemaining === null) return theme ? theme.palette.grey[300] : 'default';
  if (daysRemaining < 0) return theme ? theme.palette.error.light : 'error';
  if (daysRemaining <= 2) return theme ? theme.palette.warning.light : 'warning';
  return theme ? theme.palette.success.light : 'success';
}

// Get background color for note (if color property exists)
export function getBackgroundColor(item, NOTE_COLORS) {
  if (!NOTE_COLORS) return 'transparent';
  const colorData = NOTE_COLORS.find(
    (color) => color.value === (item.color || 'default')
  );
  return colorData ? colorData.color : 'transparent';
}

// Shared pin icon render logic (returns icon and color)
export function getPinIconProps(pinned, theme) {
  return {
    icon: pinned ? 'PushPin' : 'PushPinOutlined',
    color: pinned ? (theme ? theme.palette.warning.main : 'warning.main') : (theme ? theme.palette.action.active : 'action.active'),
    backgroundColor: pinned ? (theme ? theme.palette.warning.light : 'warning.light') : 'transparent',
  };
}

// Shared highlight style for pinned items
export function getPinnedHighlight(pinned, theme) {
  return pinned
    ? {
        boxShadow: theme ? `0 0 0 2px ${theme.palette.warning.main}` : undefined,
        backgroundColor: theme ? theme.palette.warning.light : undefined,
      }
    : {};
}

// Returns style overrides for checked, held, pinned states
export function getCardStateStyles(item, theme) {
  if (item.checked) {
    return {
      backgroundColor: theme.palette.success.light,
      border: `2px solid ${theme.palette.success.main}`,
      boxShadow: '0 0 0 2px ' + theme.palette.success.main,
    };
  }
  if (item.held) {
    return {
      backgroundColor: theme.palette.warning.light,
      border: `2px solid ${theme.palette.warning.main}`,
      boxShadow: '0 0 0 2px ' + theme.palette.warning.main,
    };
  }
  if (item.pinned) {
    return {
      backgroundColor: theme.palette.warning.light,
      border: `2px solid ${theme.palette.warning.main}`,
      boxShadow: '0 0 0 2px ' + theme.palette.warning.main,
    };
  }
  return {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
  };
}
