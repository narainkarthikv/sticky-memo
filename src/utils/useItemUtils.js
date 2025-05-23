import { useState } from 'react';
import { ItemService } from '../services/itemService';
import { useNotification } from '../hooks/useNotification';

export const useItemUtils = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);
  const [showButtons, setShowButtons] = useState(false);
  const { showNotification } = useNotification();

  const handleDelete = () => {
    ItemService.deleteItem(props.setItems, props.id);
    showNotification(`${props.type} Deleted`, "error");
  };

  const handleCheck = () => {
    ItemService.updateItem(props.setItems, props.id, { checked: true, held: false });
    showNotification(`${props.type} Checked`, "success");
  };

  const handleHold = () => {
    ItemService.updateItem(props.setItems, props.id, { held: true, checked: false });
    showNotification(`${props.type} Held`, "info");
  };

  const handleEdit = () => {
    setEditedContent(null);
    setEditedTitle(null);
    setIsEditing(true);
  };

  const handleSave = () => {
    props.onSave(props.id, editedTitle, editedContent);
    setIsEditing(false);
    showNotification(`${props.type} Saved Successfully`, "success");
  };

  const toggleButtons = () => {
    setShowButtons((prevState) => !prevState);
  };

  return {
    isEditing,
    setIsEditing,
    editedTitle,
    setEditedTitle,
    editedContent,
    setEditedContent,
    showButtons,
    setShowButtons,
    handleDelete,
    handleCheck,
    handleHold,
    handleEdit,
    handleSave,
    toggleButtons,
  };
};
