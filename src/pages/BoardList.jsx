import React, { useState, useTransition, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState, snackbarState } from '../utils/state';
import BoardCard from '../components/Board/BoardCard';
import CommonFilter from '../components/common/CommonFilter';
import CommonSnackbar from '../components/common/CommonSnackbar';
import { Box, Grid } from '@mui/material';
import { addItem, filterItems } from '../utils/helper';
import { useItemUtils } from '../utils/useItemUtils';
import { boardListStyles, scrollBoxStyles } from '../styles/boardListStyles';
import AddButton from '../components/common/AddButton';

const BoardList = (props) => {
  const [items, setItems] = useRecoilState(itemsState);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [filter, setFilter] = useState('');
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPending, startTransition] = useTransition();

  // Cleanup effect for drag and drop
  useEffect(() => {
    return () => {
      setDraggingIndex(null);
      setAnchorEl(null);
    };
  }, []);

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
    const updatedItems = items.map((item, index) =>
      index === id ? { 
        ...item, 
        title: newTitle || item.title, 
        content: newContent || item.content,
        startDate: item.startDate,
        dueDate: item.dueDate 
      } : item
    );
    startTransition(() => setItems(updatedItems));
  };

  const filteredItems = filterItems(items, filter);

  const handleClickPopover = (event, index) => {
    setEditingIndex(index);
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
      held: false
    };
    setItems([...items, newBoard]);
  };

  return (
    <Box sx={boardListStyles}>
      <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      <CommonFilter filter={filter} setFilter={setFilter} />
      <Grid container spacing={2} sx={scrollBoxStyles}>
        {filteredItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <BoardCard
              key={index}
              item={item}
              index={index}
              isEditing={isEditing}
              editingIndex={editingIndex}
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
            />
          </Grid>
        ))}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
          <AddButton onClick={addBoard} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BoardList;