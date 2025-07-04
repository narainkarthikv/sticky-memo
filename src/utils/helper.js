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

    return new Promise((resolve) => {
      setTimeout(() => {
        setSnackbar({
          open: true,
          message: `Don't Waste ${context}s :)`,
          severity: 'warning',
        });
        resolve(false);
      }, 300);
    });
  }

  await new Promise((resolve) => {
    setItems((prevItems) => {
      const newState = [
        ...prevItems,
        { ...newItem, checked: false, held: false, all: true },
      ];
      resolve(newState);
      return newState;
    });
  });

  await setSnackbar({ open: false, message: '', severity: '' });

  return new Promise((resolve) => {
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: `${context} added!`,
        severity: 'success',
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
  await new Promise((resolve) => {
    setItems((prevItems) => {
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

  return new Promise((resolve) => {
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: `${context} deleted`,
        severity: 'error',
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
  await new Promise((resolve) => {
    setItems((prevItems) => {
      const newState = prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked, held: false } : item
      );
      resolve(newState);
      return newState;
    });
  });

  await setSnackbar({ open: false, message: '', severity: '' });

  return new Promise((resolve) => {
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: `${context} checked!`,
        severity: 'success',
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
  await new Promise((resolve) => {
    setItems((prevItems) => {
      const newState = prevItems.map((item) =>
        item.id === id ? { ...item, held: !item.held, checked: false } : item
      );
      resolve(newState);
      return newState;
    });
  });

  await setSnackbar({ open: false, message: '', severity: '' });

  return new Promise((resolve) => {
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: `${context} held!`,
        severity: 'info',
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
 * @param check type of sort checked or unchecked
 * @returns {*} sorted array
 */
export const sortItemsByChecked = (items, check) => {
  return items.filter((item) =>
    check === 'checked' ? item.checked === true : item.checked === false
  );
};

/**
 * Sort items according to the hold status
 * @param items items to be sorted
 * @param hold which status is required
 * @returns {*} sorted items
 */
export const sortItemsByHold = (items, hold) => {
  return items.filter((item) =>
    hold === 'hold' ? item.held === true : item.held === false
  );
};

/**
 * sorting items in the alphabetical order
 * @param items items to be sorted
 * @param order required order a->z or z->a
 * @returns {*} sorted items
 */
export const sortItemsByApha = (items, order) => {
  const sorted = [...items].sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
  );

  return order === 'titleup' ? sorted.reverse() : sorted;
};

/**
 * Multi-criteria sorting function with stable sort algorithm
 * Sorts by: 1) Checked status, 2) Hold status, 3) Title (alphabetical)
 * @param {Array} items - The list of items to be sorted
 * @param {string} checkedSort - 'checked' | 'unchecked' | null
 * @param {string} heldSort - 'hold' | 'unhold' | null
 * @param {string} titleSort - 'titleup' | 'titledown' | null
 * @returns {Array} - Sorted array with stable sort
 */
export const multiCriteriaSort = (
  items,
  checkedSort = null,
  heldSort = null,
  titleSort = null
) => {
  if (!items || items.length === 0) return [];

  let result = [...items];

  // Apply filters/sorts in priority order: Checked -> Hold -> Title
  if (checkedSort) {
    result = sortItemsByChecked(result, checkedSort);
  }

  if (heldSort) {
    result = sortItemsByHold(result, heldSort);
  }

  if (titleSort) {
    result = sortItemsByApha(result, titleSort);
  }

  return result;
};
