import React, { useState, useTransition } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState, snackbarState } from '../utils/state';
import TableCard from '../components/Table/TableCard';
import CommonFilter from '../components/common/CommonFilter';
import CommonSnackbar from '../components/common/CommonSnackbar';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { addItem, filterItems } from '../utils/helper';
import { useItemUtils } from '../utils/useItemUtils';
import { tableListStyles, tableStyles, tableHeadStyles, tableCellStyles, boxStyles, scrollBoxStyles } from '../styles/tableListStyles';
import AddButton from '../components/common/AddButton';


const TableList = (props) => {
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

  const addRow = () => {
    const newRow = { 
      title: 'New Row',
      content: '',
      startDate: null,
      dueDate: null,
      checked: false,
      held: false
    };
    setItems([...items, newRow]);
  };

  return (
    <Box sx={boxStyles}>
      <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      <CommonFilter filter={filter} setFilter={setFilter} />
      <Box sx={scrollBoxStyles}>
        <Table sx={tableStyles}>
          <TableHead sx={tableHeadStyles}>
            <TableRow>
              <TableCell align='center' sx={tableCellStyles}>Title</TableCell>
              <TableCell align='center' sx={tableCellStyles}>Content</TableCell>
              <TableCell align='center' sx={{...tableCellStyles, minWidth: '200px'}}>Start Date</TableCell>
              <TableCell align='center' sx={{...tableCellStyles, minWidth: '250px'}}>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item, index) => (
              <TableCard
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
            ))}
            <TableRow>
              <TableCell colSpan={4} align="center">
                <AddButton onClick={addRow} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default TableList;