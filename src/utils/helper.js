/**
 * Adds a new item to the list.
 * @param {Function} setItems - Function to update the items state.
 * @param {Object} newItem - The new item to be added.
 * @param {Function} setSnackbar - Function to update the snackbar state.
 * @param {string} context - Context of the item (e.g., "Note").
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the item was added successfully, false otherwise.
 */
export const addItem = async (setItems, newItem, setSnackbar, context) => {
  if (!newItem.title.trim() || !newItem.content.trim()) {
    await setSnackbar({ open: false, message: '', severity: '' });

    return new Promise(resolve => {
      setTimeout(() => {
        setSnackbar({
          open: true,
          message: `Don't Waste ${context}s :)`,
          severity: "warning",
        });
        resolve(false);
      }, 300);
    });
  }

  await new Promise(resolve => {
    setItems(prevItems => {
      const newState = [...prevItems, { ...newItem, checked: false, held: false, all: true }];
      resolve(newState);
      return newState;
    });
  });

  await setSnackbar({ open: false, message: '', severity: '' });

  return new Promise(resolve => {
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: `${context} added!`,
        severity: "success",
      });
      resolve(true);
    }, 300);
  });
};

/**
 * Deletes an item from the list.
 * @param {Function} setItems - Function to update the items state.
 * @param {number} id - The unique id of the item to be deleted.
 * @param {Function} setSnackbar - Function to update the snackbar state.
 * @param {string} context - Context of the item (e.g., "Note").
 * @returns {Promise<void>} - Returns a promise that resolves when the operation is complete.
 */
export const deleteItem = async (setItems, id, setSnackbar, context) => {
  await new Promise(resolve => {
    setItems(prevItems => {
      const currentIndex = prevItems.findIndex((item) => item.id === id);
      // Make sure we're using the correct index and validate it
      if (currentIndex === -1) {
        resolve(prevItems);
        return prevItems;
      }
      const newState = prevItems.filter((_, index) => index !== currentIndex);
      resolve(newState);
      return newState;
    });
  });

  await setSnackbar({ open: false, message: '', severity: '' });

  return new Promise(resolve => {
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: `${context} deleted`,
        severity: "error",
      });
      resolve();
    }, 300);
  });
};

/**
 * Toggles the checked state of an item.
 * @param {Function} setItems - Function to update the items state.
 * @param {number} id - The unique id of the item to be checked.
 * @param {Function} setSnackbar - Function to update the snackbar state.
 * @param {string} context - Context of the item (e.g., "Note").
 * @returns {Promise<void>} - Returns a promise that resolves when the operation is complete.
 */
export const checkItem = async (setItems, id, setSnackbar, context) => {
  await new Promise(resolve => {
    setItems(prevItems => {
      const newState = prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked, held: false } : item
      );
      resolve(newState);
      return newState;
    });
  });

  await setSnackbar({ open: false, message: '', severity: '' });

  return new Promise(resolve => {
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: `${context} checked!`,
        severity: "success",
      });
      resolve();
    }, 300);
  });
};

/**
 * Toggles the held state of an item.
 * @param {Function} setItems - Function to update the items state.
 * @param {number} id - The unique id of the item to be held.
 * @param {Function} setSnackbar - Function to update the snackbar state.
 * @param {string} context - Context of the item (e.g., "Note").
 * @returns {Promise<void>} - Returns a promise that resolves when the operation is complete.
 */
export const holdItem = async (setItems, id, setSnackbar, context) => {
  await new Promise(resolve => {
    setItems(prevItems => {
      const newState = prevItems.map((item) =>
        item.id === id ? { ...item, held: !item.held, checked: false } : item
      );
      resolve(newState);
      return newState;
    });
  });

  await setSnackbar({ open: false, message: '', severity: '' });

  return new Promise(resolve => {
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: `${context} held!`,
        severity: "info",
      });
      resolve();
    }, 300);
  });
};

/**
 * Filters items based on a search query.
 * @param {Array} items - The list of items to be filtered.
 * @param {string} filter - The search query.
 * @returns {Array} - The filtered list of items.
 */
export const filterItems = (items, filter) => {
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(filter.toLowerCase()) ||
      item.content.toLowerCase().includes(filter.toLowerCase())
  );


};

/**
 * Sorting items based on checkout
 * @param items the list of items to be sorted
 * @returns {*} sorted array
 */
export const sortItemsByChecked = (items) => {
  return items.filter((item) =>
    item.checked === true
  )
}
