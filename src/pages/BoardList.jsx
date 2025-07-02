import React, { useState, useTransition, useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState, snackbarState } from '../utils/state';
import BoardCard from '../components/Board/BoardCard';
import CommonFilter from '../components/common/CommonFilter';
import CommonSnackbar from '../components/common/CommonSnackbar';
import BoardSorter from '../components/common/BoardSorter';
import { Box, Grid, Typography } from '@mui/material';
import { filterItems, multiCriteriaSort } from '../utils/helper';
import { useItemUtils } from '../utils/useItemUtils';
import {
  boardListStyles,
  scrollBoxStyles,
  gridContainerStyles,
} from '../styles/boardListStyles';
import AddButton from '../components/common/AddButton';
import { v4 as uuidv4 } from 'uuid';

const BoardList = (props) => {
  const [items, setItems] = useRecoilState(itemsState);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [filter, setFilter] = useState('');
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPending, startTransition] = useTransition();

  // Sorting state with localStorage persistence
  const [checkedSort, setCheckedSort] = useState(() => {
    try {
      return localStorage.getItem('boardList_checkedSort') || null;
    } catch (error) {
      return null;
    }
  });
  const [heldSort, setHeldSort] = useState(() => {
    try {
      return localStorage.getItem('boardList_heldSort') || null;
    } catch (error) {
      return null;
    }
  });
  const [titleSort, setTitleSort] = useState(() => {
    try {
      return localStorage.getItem('boardList_titleSort') || null;
    } catch (error) {
      return null;
    }
  });

  // Density state with localStorage persistence
  const [isCompact, setIsCompact] = useState(() => {
    try {
      return localStorage.getItem('boardList_isCompact') === 'true';
    } catch (error) {
      return false;
    }
  });

  // Cleanup effect for drag and drop
  useEffect(() => {
    return () => {
      setDraggingIndex(null);
      setAnchorEl(null);
    };
  }, []);

  // Persist sorting state to localStorage
  useEffect(() => {
    try {
      if (checkedSort) {
        localStorage.setItem('boardList_checkedSort', checkedSort);
      } else {
        localStorage.removeItem('boardList_checkedSort');
      }
    } catch (error) {
      console.warn('Failed to save checkedSort to localStorage:', error);
    }
  }, [checkedSort]);

  useEffect(() => {
    try {
      if (heldSort) {
        localStorage.setItem('boardList_heldSort', heldSort);
      } else {
        localStorage.removeItem('boardList_heldSort');
      }
    } catch (error) {
      console.warn('Failed to save heldSort to localStorage:', error);
    }
  }, [heldSort]);

  useEffect(() => {
    try {
      if (titleSort) {
        localStorage.setItem('boardList_titleSort', titleSort);
      } else {
        localStorage.removeItem('boardList_titleSort');
      }
    } catch (error) {
      console.warn('Failed to save titleSort to localStorage:', error);
    }
  }, [titleSort]);

  useEffect(() => {
    try {
      localStorage.setItem('boardList_isCompact', isCompact.toString());
    } catch (error) {
      console.warn('Failed to save isCompact to localStorage:', error);
    }
  }, [isCompact]);

  const {
    isEditing,
    setIsEditing,
    editedTitle,
    setEditedTitle,
    editedContent,
    setEditedContent,
    handleEdit,
  } = useItemUtils({ ...props, type: 'Row' });

  const handleDragStart = (index) => setDraggingIndex(index);
  const handleDragOver = (event) => event.preventDefault();
  const handleDrop = (index, event) => {
    event.preventDefault();
    if (draggingIndex !== null && draggingIndex !== index) {
      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(draggingIndex, 1);
      updatedItems.splice(index, 0, draggedItem);
      startTransition(() => setItems(updatedItems));
    }
    setDraggingIndex(null);
  };

  const handleSave = (item, id, newTitle, newContent) => {
    setIsEditing(false);
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            title: newTitle || item.title,
            content: newContent || item.content,
            startDate: item.startDate,
            dueDate: item.dueDate,
          }
        : item
    );
    startTransition(() => setItems(updatedItems));
  };

  // Pin toggle handler (robust, by id)
  const handlePinToggle = useCallback(
    (id) => {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, pinned: !item.pinned } : item
      );
      setItems(updatedItems);
    },
    [items, setItems]
  );

  // Apply filtering and sorting with pinned boards at the top
  const processedItems = React.useMemo(() => {
    let result = filterItems(items, filter);
    result = multiCriteriaSort(result, checkedSort, heldSort, titleSort);
    // Sort pinned boards to the top
    result = result.slice().sort((a, b) => {
      if (a.pinned === b.pinned) return 0;
      return a.pinned ? -1 : 1;
    });
    return result;
  }, [items, filter, checkedSort, heldSort, titleSort]);

  // Sorting handlers
  const handleClearAllSorts = () => {
    setCheckedSort(null);
    setHeldSort(null);
    setTitleSort(null);
  };

  // Density toggle handler
  const handleDensityToggle = () => {
    setIsCompact((prev) => !prev);
  };

  const handleClickPopover = (event, id) => {
    setEditingId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => setAnchorEl(null);

  const addBoard = () => {
    const newBoard = {
      title: 'New Board',
      content: '',
      startDate: null,
      dueDate: null,
      checked: false,
      held: false,
      id: uuidv4(),
    };
    setItems([...items, newBoard]);
  };

  return (
    <Box sx={boardListStyles}>
      <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />

      {/* Header with Filter and Sorting */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '1400px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 2,
          backgroundColor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1,
          marginBottom: 2,
        }}>
        <CommonFilter filter={filter} setFilter={setFilter} />
        <BoardSorter
          checkedSort={checkedSort}
          heldSort={heldSort}
          titleSort={titleSort}
          onCheckedSortChange={setCheckedSort}
          onHeldSortChange={setHeldSort}
          onTitleSortChange={setTitleSort}
          onClearAll={handleClearAllSorts}
          isCompact={isCompact}
          onDensityToggle={handleDensityToggle}
        />
      </Box>

      {/* Scrollable Content Area */}
      <Box sx={scrollBoxStyles}>
        <Grid container spacing={isCompact ? 1 : 2} sx={gridContainerStyles}>
          {processedItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <BoardCard
                key={item.id}
                item={item}
                index={index}
                id={item.id}
                isEditing={isEditing}
                editingId={editingId}
                editedTitle={editedTitle}
                setEditedTitle={setEditedTitle}
                editedContent={editedContent}
                setEditedContent={setEditedContent}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleClickPopover={handleClickPopover}
                handleClosePopover={handleClosePopover}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                handleDragStart={handleDragStart}
                handleDrop={handleDrop}
                handleDragOver={handleDragOver}
                setItems={setItems}
                setSnackbar={setSnackbar}
                items={items}
                isCompact={isCompact}
                handlePinToggle={handlePinToggle} // Pass pin handler
              />
            </Grid>
          ))}
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
            <AddButton onClick={addBoard} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BoardList;
