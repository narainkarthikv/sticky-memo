import { useState } from 'react';
import { ItemService } from '../services/itemService';
import { useNotification } from '../hooks/useNotification';

export const useItemUtils = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);
  const [showButtons, setShowButtons] = useState(false);
  const { showNotification } = useNotification();

  const handleDelete = async () => {
    if (typeof props.id === 'number') {
      await ItemService.deleteItem(props.setItems, props.id);
      await showNotification(`${props.type} Deleted`, "error");
    } else {
      console.error('Invalid item ID for deletion');
      await showNotification(`Failed to delete ${props.type}`, "error");
    }
  };

  const handleCheck = async () => {
    await ItemService.updateItem(props.setItems, props.id, { checked: true, held: false });
    await showNotification(`${props.type} Checked`, "success");
  };

  const handleHold = async () => {
    await ItemService.updateItem(props.setItems, props.id, { held: true, checked: false });
    await showNotification(`${props.type} Held`, "info");
  };

  const handleEdit = () => {
    setEditedContent(null);
    setEditedTitle(null);
    setIsEditing(true);
  };

  const handleSave = async () => {
    await props.onSave(props.id, editedTitle, editedContent);
    setIsEditing(false);
    await showNotification(`${props.type} Saved Successfully`, "success");
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
