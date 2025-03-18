import React, { useState, useTransition } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState, snackbarState } from '../utils/state';
import NoteCard from '../components/Note/NoteCard';
import CommonFilter from '../components/common/CommonFilter';
import CommonSnackbar from '../components/common/CommonSnackbar';
import { Box } from '@mui/material';
import { addItem, filterItems } from '../utils/helper';
import { useItemUtils } from '../utils/useItemUtils';
import { noteListStyles, scrollBoxStyles } from '../styles/noteListStyles';
import AddButton from '../components/common/AddButton';

const NoteList = (props) => {
  const [items, setItems] = useRecoilState(itemsState);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [filter, setFilter] = useState('');
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPending, startTransition] = useTransition();

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
      index === id ? { ...item, title: newTitle || item.title, content: newContent || item.content } : item
    );
    startTransition(() => setItems(updatedItems));
  };

  const filteredItems = filterItems(items, filter);

  const handleClickPopover = (event, index) => {
    setEditingIndex(index);
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => setAnchorEl(null);

  const addNote = () => {
    const newNote = { title: '', content: '' };
    setItems([...items, newNote]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '120vh', margin: '16px' }}>
      <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      <Box>
        <CommonFilter filter={filter} setFilter={setFilter} />
      </Box>

      <Box sx={scrollBoxStyles}>
        {filteredItems.map((item, index) => (
          <NoteCard
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
          />
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
          <AddButton onClick={addNote} />
        </Box>
      </Box>
    </Box>
  );
};

export default NoteList;