import { useState } from 'react';
import { useItems } from '../context/ItemContext';

export function useItemOperations() {
  const { updateItem } = useItems();
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  const handleEdit = (index, item) => {
    setEditingIndex(index);
    setEditedTitle(item.title);
    setEditedContent(item.content);
  };

  const handleSave = (index) => {
    if (editedTitle.trim() && editedContent.trim()) {
      updateItem(index, {
        title: editedTitle,
        content: editedContent
      });
      setEditingIndex(-1);
    }
  };

  const handleCancel = () => {
    setEditingIndex(-1);
    setEditedTitle('');
    setEditedContent('');
  };

  return {
    editingIndex,
    editedTitle,
    editedContent,
    setEditedTitle,
    setEditedContent,
    handleEdit,
    handleSave,
    handleCancel,
    isEditing: (index) => editingIndex === index
  };
}
