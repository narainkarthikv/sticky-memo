import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  Divider,
} from '@mui/material';
import {
  Clear,
  Sort,
  ArrowUpward,
  ArrowDownward,
  ViewList,
  ViewModule,
} from '@mui/icons-material';

const BoardSorter = ({
  checkedSort,
  heldSort,
  titleSort,
  onCheckedSortChange,
  onHeldSortChange,
  onTitleSortChange,
  onClearAll,
  // Density props
  isCompact = false,
  onDensityToggle,
}) => {
  const hasActiveSorts = checkedSort || heldSort || titleSort;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: { xs: 1, sm: 1.5, md: 2 },
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: {
          xs: isCompact ? 0.75 : 1,
          sm: isCompact ? 1 : 1.5,
          md: isCompact ? 1.25 : 2,
        },
        minWidth: 0,
      }}>
      {/* Checked Status Sort */}
      <FormControl
        variant='outlined'
        size={isCompact ? 'small' : 'medium'}
        sx={{
          minWidth: { xs: 100, sm: 120, md: 140 },
          maxWidth: { xs: 140, sm: 160, md: 180 },
        }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={checkedSort || ''}
          onChange={(e) => onCheckedSortChange(e.target.value || null)}
          label='Status'>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value='checked'>✅ Checked First</MenuItem>
          <MenuItem value='unchecked'>❎ Unchecked First</MenuItem>
        </Select>
      </FormControl>

      {/* Hold Status Sort */}
      <FormControl
        variant='outlined'
        size={isCompact ? 'small' : 'medium'}
        sx={{
          minWidth: { xs: 100, sm: 120, md: 140 },
          maxWidth: { xs: 140, sm: 160, md: 180 },
        }}>
        <InputLabel>Hold</InputLabel>
        <Select
          value={heldSort || ''}
          onChange={(e) => onHeldSortChange(e.target.value || null)}
          label='Hold'>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value='hold'>🛑 Hold First</MenuItem>
          <MenuItem value='unhold'>🟢 Active First</MenuItem>
        </Select>
      </FormControl>

      {/* Title Sort */}
      <FormControl
        variant='outlined'
        size={isCompact ? 'small' : 'medium'}
        sx={{
          minWidth: { xs: 100, sm: 120, md: 140 },
          maxWidth: { xs: 140, sm: 160, md: 180 },
        }}>
        <InputLabel>Title</InputLabel>
        <Select
          value={titleSort || ''}
          onChange={(e) => onTitleSortChange(e.target.value || null)}
          label='Title'>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value='titledown'>🔤 A → Z</MenuItem>
          <MenuItem value='titleup'>🔤 Z → A</MenuItem>
        </Select>
      </FormControl>

      {/* Clear All Button */}
      {hasActiveSorts && (
        <Tooltip title='Clear all sorts'>
          <IconButton
            onClick={onClearAll}
            color='secondary'
            size='small'
            sx={{
              backgroundColor: 'action.hover',
              '&:hover': {
                backgroundColor: 'action.selected',
              },
            }}>
            <Clear />
          </IconButton>
        </Tooltip>
      )}

      {/* Active Sorts Indicator */}
      {hasActiveSorts && (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {checkedSort && (
            <Chip
              label={`Status: ${
                checkedSort === 'checked' ? 'Checked' : 'Unchecked'
              }`}
              size='small'
              color='primary'
              variant='outlined'
            />
          )}
          {heldSort && (
            <Chip
              label={`Hold: ${heldSort === 'hold' ? 'Hold' : 'Active'}`}
              size='small'
              color='primary'
              variant='outlined'
            />
          )}
          {titleSort && (
            <Chip
              label={`Title: ${titleSort === 'titledown' ? 'A→Z' : 'Z→A'}`}
              size='small'
              color='primary'
              variant='outlined'
            />
          )}
        </Box>
      )}

      {/* Density Toggle */}
      {onDensityToggle && (
        <>
          <Divider orientation='vertical' flexItem sx={{ mx: 1 }} />
          <Tooltip
            title={
              isCompact
                ? 'Switch to comfortable view'
                : 'Switch to compact view'
            }>
            <IconButton
              onClick={onDensityToggle}
              color='default'
              size='small'
              sx={{
                backgroundColor: 'action.hover',
                '&:hover': {
                  backgroundColor: 'action.selected',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }}>
              {isCompact ? <ViewModule /> : <ViewList />}
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default BoardSorter;
