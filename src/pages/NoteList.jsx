import React, {
  useState,
  useTransition,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useRecoilState } from 'recoil';
import { itemsState, snackbarState } from '../utils/state';
import NoteCard from '../components/Note/NoteCard';
import CommonFilter from '../components/common/CommonFilter';
import CommonSnackbar from '../components/common/CommonSnackbar';
import BoardSorter from '../components/common/BoardSorter';
import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  Fab,
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Tooltip,
  alpha,
} from '@mui/material';
import { Add, Search, ViewList, ViewModule } from '@mui/icons-material';
import { filterItems, multiCriteriaSort } from '../utils/helper';
import { useItemUtils } from '../utils/useItemUtils';
import { noteListStyles, scrollBoxStyles } from '../styles/noteListStyles';
import AddButton from '../components/common/AddButton';
import { debounce } from '../utils/debounce';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from '@mui/material/styles';

const NoteList = (props) => {
  const theme = useTheme();
  const [items, setItems] = useRecoilState(itemsState);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [filter, setFilter] = useState('');
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPending, startTransition] = useTransition();
  const dragTimeoutRef = useRef(null);

  // Enhanced search state
  const [searchValue, setSearchValue] = useState('');

  // Sorting state with localStorage persistence
  const [checkedSort, setCheckedSort] = useState(() => {
    try {
      return localStorage.getItem('noteList_checkedSort') || null;
    } catch (error) {
      return null;
    }
  });
  const [heldSort, setHeldSort] = useState(() => {
    try {
      return localStorage.getItem('noteList_heldSort') || null;
    } catch (error) {
      return null;
    }
  });
  const [titleSort, setTitleSort] = useState(() => {
    try {
      return localStorage.getItem('noteList_titleSort') || null;
    } catch (error) {
      return null;
    }
  });

  // Density state with localStorage persistence
  const [isCompact, setIsCompact] = useState(() => {
    try {
      return localStorage.getItem('noteList_isCompact') === 'true';
    } catch (error) {
      return false;
    }
  });

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

  const handleDrop = useCallback(
    (index, event) => {
      event.preventDefault();
      if (draggingIndex !== null && draggingIndex !== index) {
        const updatedItems = [...items];
        const [draggedItem] = updatedItems.splice(draggingIndex, 1);
        updatedItems.splice(index, 0, draggedItem);
        debouncedSetItems(updatedItems);
      }
      setDraggingIndex(null);
    },
    [draggingIndex, items, debouncedSetItems]
  );

  const handleSave = useCallback(
    (item, id, newTitle, newContent) => {
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
    },
    [items, setItems, setIsEditing]
  );

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
      id: uuidv4(),
    };
    startTransition(() => setItems((prev) => [...prev, newNote]));
  }, [setItems]);

  // Persistence effects
  useEffect(() => {
    try {
      if (checkedSort) {
        localStorage.setItem('noteList_checkedSort', checkedSort);
      } else {
        localStorage.removeItem('noteList_checkedSort');
      }
    } catch (error) {
      console.warn('Failed to save checkedSort to localStorage:', error);
    }
  }, [checkedSort]);

  useEffect(() => {
    try {
      if (heldSort) {
        localStorage.setItem('noteList_heldSort', heldSort);
      } else {
        localStorage.removeItem('noteList_heldSort');
      }
    } catch (error) {
      console.warn('Failed to save heldSort to localStorage:', error);
    }
  }, [heldSort]);

  useEffect(() => {
    try {
      if (titleSort) {
        localStorage.setItem('noteList_titleSort', titleSort);
      } else {
        localStorage.removeItem('noteList_titleSort');
      }
    } catch (error) {
      console.warn('Failed to save titleSort to localStorage:', error);
    }
  }, [titleSort]);

  useEffect(() => {
    try {
      localStorage.setItem('noteList_isCompact', isCompact.toString());
    } catch (error) {
      console.warn('Failed to save isCompact to localStorage:', error);
    }
  }, [isCompact]);

  // Apply filtering and sorting with pinned notes separation
  const processedItems = React.useMemo(() => {
    let result = filterItems(items, searchValue || filter);
    result = multiCriteriaSort(result, checkedSort, heldSort, titleSort);

    // Separate pinned and unpinned notes
    const pinnedNotes = result.filter((item) => item.pinned);
    const unpinnedNotes = result.filter((item) => !item.pinned);

    return { pinnedNotes, unpinnedNotes };
  }, [items, filter, searchValue, checkedSort, heldSort, titleSort]);

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

  // Enhanced search handler
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleSearchClear = () => {
    setSearchValue('');
  };

  return (
    <>
      {/* App Header */}
      <AppBar
        position='fixed'
        elevation={4}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderBottom: `1px solid ${theme.palette.divider}`,
          zIndex: theme.zIndex.appBar,
        }}>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            minHeight: { xs: 56, sm: 64 }, // Responsive AppBar height
            px: { xs: 2, sm: 3 }, // Responsive padding
          }}>
          <Typography
            variant='h6'
            component='h1'
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            Sticky Notes
          </Typography>

          {/* Enhanced Search */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: { xs: 2, sm: 3 },
              backgroundColor: alpha(theme.palette.action.hover, 0.1),
              border: `1px solid ${alpha(theme.palette.action.active, 0.2)}`,
              '&:hover': {
                backgroundColor: alpha(theme.palette.action.hover, 0.15),
              },
              '&:focus-within': {
                backgroundColor: alpha(theme.palette.action.hover, 0.2),
                borderColor: theme.palette.primary.main,
                boxShadow: `0 0 0 2px ${alpha(
                  theme.palette.primary.main,
                  0.2
                )}`,
              },
              mx: { xs: 1, sm: 2 },
              width: {
                xs: '100%',
                sm: 280,
                md: 360,
                lg: 400,
                xl: 480,
              },
              maxWidth: { xs: 'none', sm: 500, lg: 600 },
              flex: { xs: 1, sm: 'none' },
              transition: 'all 0.2s ease-in-out',
            }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: { xs: 1.5, sm: 2 },
                py: { xs: 0.75, sm: 1 },
                minHeight: { xs: 40, sm: 44 }, // Touch-friendly height
              }}>
              <Search
                sx={{
                  color: theme.palette.action.active,
                  mr: 1,
                  fontSize: { xs: '1.2rem', sm: '1.5rem' },
                }}
              />
              <InputBase
                placeholder='Search notes...'
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                sx={{
                  flex: 1,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  '& .MuiInputBase-input': {
                    padding: 0,
                    '&::placeholder': {
                      color: theme.palette.action.active,
                      opacity: 1,
                    },
                  },
                }}
              />
            </Box>
          </Box>

          {/* Density Toggle */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              ml: { xs: 1, sm: 2 },
            }}>
            <Tooltip
              title={
                isCompact
                  ? 'Switch to comfortable view'
                  : 'Switch to compact view'
              }
              arrow>
              <IconButton
                onClick={handleDensityToggle}
                size={isCompact ? 'small' : 'medium'}
                sx={{
                  color: theme.palette.action.active,
                  minWidth: { xs: 40, sm: 44 },
                  minHeight: { xs: 40, sm: 44 },
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.action.hover, 0.1),
                    color: theme.palette.primary.main,
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease-in-out',
                  // Touch device optimizations
                  '@media (hover: none)': {
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: theme.palette.action.active,
                      transform: 'none',
                    },
                  },
                }}>
                {isCompact ? <ViewModule /> : <ViewList />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          // Add proper spacing for AppBar using toolbar mixin
          ...theme.mixins.toolbar,
          // Additional responsive spacing to ensure content is below AppBar
          pt: { xs: 1, sm: 2 },
        }}
      />
      <Container
        maxWidth='xl'
        sx={{
          px: { xs: 1, sm: 2, md: 3, lg: 4 },
          pb: { xs: 2, sm: 3, md: 4 },
          minHeight: {
            xs: `calc(100vh - 56px)`, // Mobile AppBar height
            sm: `calc(100vh - 64px)`, // Desktop AppBar height
          },
          backgroundColor: theme.palette.background.default,
        }}>
        <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />

        {/* Filter and Sorting Controls */}
        <Box
          sx={{
            mb: { xs: 2, sm: 3 },
            p: { xs: 1.5, sm: 2 },
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: 1,
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

        {/* Pinned Notes Section */}
        {processedItems.pinnedNotes.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography
              variant='h6'
              sx={{
                mb: 2,
                color: theme.palette.text.secondary,
                fontWeight: 500,
              }}>
              📌 Pinned
            </Typography>
            <Grid
              container
              spacing={{
                xs: isCompact ? 1 : 1.5,
                sm: isCompact ? 1.5 : 2,
                md: isCompact ? 2 : 3,
              }}>
              {processedItems.pinnedNotes.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={item.id}>
                  <NoteCard
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
                  />
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ mt: 3, mb: 2 }} />
          </Box>
        )}

        {/* All Notes Section */}
        <Box>
          {processedItems.pinnedNotes.length > 0 && (
            <Typography
              variant='h6'
              sx={{
                mb: 2,
                color: theme.palette.text.secondary,
                fontWeight: 500,
              }}>
              📝 Others
            </Typography>
          )}
          <Grid
            container
            spacing={{
              xs: isCompact ? 1 : 1.5,
              sm: isCompact ? 1.5 : 2,
              md: isCompact ? 2 : 3,
            }}>
            {processedItems.unpinnedNotes.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={item.id}>
                <NoteCard
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
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Floating Action Button */}
        <Fab
          color='primary'
          aria-label='add note'
          onClick={addNote}
          size={isCompact ? 'medium' : 'large'}
          sx={{
            position: 'fixed',
            bottom: {
              xs: 16,
              sm: 20,
              md: 24,
              lg: 32,
            },
            right: {
              xs: 16,
              sm: 20,
              md: 24,
              lg: 32,
            },
            zIndex: theme.zIndex.fab,
            boxShadow: isCompact
              ? '0 2px 8px rgba(0,0,0,0.15)'
              : '0 4px 12px rgba(0,0,0,0.15)',
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: isCompact
                ? '0 4px 12px rgba(0,0,0,0.2)'
                : '0 6px 16px rgba(0,0,0,0.2)',
            },
            transition: 'all 0.2s ease-in-out',
            // Touch device optimizations
            '@media (hover: none)': {
              '&:hover': {
                transform: 'none',
                boxShadow: isCompact
                  ? '0 2px 8px rgba(0,0,0,0.15)'
                  : '0 4px 12px rgba(0,0,0,0.15)',
              },
            },
          }}>
          <Add />
        </Fab>
      </Container>
    </>
  );
};

export default NoteList;
