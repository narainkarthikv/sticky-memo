import React, { useState, useTransition, useEffect, useCallback, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState, snackbarState } from '../utils/state';
import NoteCard from '../components/Note/NoteCard';
import CommonFilter from '../components/common/CommonFilter';
import CommonSnackbar from '../components/common/CommonSnackbar';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { filterItems, sortItemsByApha, sortItemsByChecked, sortItemsByHold } from '../utils/helper';
import { useItemUtils } from '../utils/useItemUtils';
import { noteListStyles, scrollBoxStyles } from '../styles/noteListStyles';
import AddButton from '../components/common/AddButton';
import { debounce } from '../utils/debounce';
import { v4 as uuidv4 } from 'uuid';
import NoteSorter from '../components/Note/NoteSorter.jsx';

const NoteList = (props) => {
  const [items, setItems] = useRecoilState(itemsState);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [filter, setFilter] = useState('');
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPending, startTransition] = useTransition();
  const dragTimeoutRef = useRef(null);
  const [sort, setSort] = useState("");
  const [displayItems, setDisplayItems] = useState([...items]);

  const {
    isEditing,
    setIsEditing,
    editedTitle,
    setEditedTitle,
    editedContent,
    setEditedContent,
    handleEdit,
  } = useItemUtils({ ...props, type: 'Note' });

  // Cleanup effect for all event listeners and timeouts
  useEffect(() => {
    return () => {
      setDraggingIndex(null);
      setAnchorEl(null);
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }
    };
  }, []);

  const handleDragStart = useCallback((index) => {
    setDraggingIndex(index);
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const debouncedSetItems = useCallback(
    debounce((updatedItems) => {
      startTransition(() => setItems(updatedItems));
    }, 100),
    [setItems]
  );

  const handleDrop = useCallback((index, event) => {
    event.preventDefault();
    if (draggingIndex !== null && draggingIndex !== index) {
      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(draggingIndex, 1);
      updatedItems.splice(index, 0, draggedItem);
      debouncedSetItems(updatedItems);
    }
    setDraggingIndex(null);
  }, [draggingIndex, items, debouncedSetItems]);

  const handleSave = useCallback((item, id, newTitle, newContent) => {
    setIsEditing(false);
    const updatedItems = items.map((item) =>
      item.id === id ? {
        ...item,
        title: newTitle || item.title,
        content: newContent || item.content,
        startDate: item.startDate,
        dueDate: item.dueDate
      } : item
    );
    startTransition(() => setItems(updatedItems));
  }, [items, setItems, setIsEditing]);

  const handleClickPopover = useCallback((event, id) => {
    setEditingId(id);
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const addNote = useCallback(() => {
    const newNote = {
      title: 'New Note',
      content: '',
      startDate: null,
      dueDate: null,
      checked: false,
      held: false,
      id: uuidv4()
    };
    startTransition(() => setItems(prev => [...prev, newNote]));
  }, [setItems]);

  // const filteredItems = filterItems(items, filter);

  const onSort = async(event) => {
    await setSort(event.target.value);
  }



  useEffect(() => {
    let updated = [...items];

    // Apply filter first, then sort — or reverse if needed
    updated = filterItems(updated, filter);
    if(sort === SORT.Check || sort === SORT.UnCheck){
      updated = sortItemsByChecked(updated, sort)
    }else if(sort === SORT.Hold || sort === SORT.UnHold){
      updated = sortItemsByHold(updated, sort)
    }else if(sort === SORT.TitleUp || sort === SORT.TitleDown){
      updated = sortItemsByApha(updated, sort)
    }

    setDisplayItems(updated);
  }, [items, sort, filter]);

  const SORT = Object.freeze({
    TitleUp: "titleup",
    TitleDown: "titledown",
    Check: "checked",
    UnCheck: "unchecked",
    Hold: "hold",
    UnHold: "unhold"
  })


  return (
    <Box sx={noteListStyles}>
      <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      <Box>
        <CommonFilter filter={filter} setFilter={setFilter} />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Sort by</InputLabel>
          <NoteSorter onSort={onSort} SORT={SORT} sort={sort} />
        </FormControl>
      </Box>
      <Grid container spacing={2} sx={scrollBoxStyles}>
        {displayItems.map((item, index) => (

          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <NoteCard
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
            />
          </Grid>
        ))}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
          <AddButton onClick={addNote} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoteList;