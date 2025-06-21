import AddIcon from '@mui/icons-material/Add';
import { Fab, Tooltip } from '@mui/material';
import PropTypes from 'prop-types'; // Import PropTypes

/**
 * AddButton component provides a floating action button for adding new items.
 * @param {object} props - The properties passed to the component.
 * @param {function} props.onClick - The callback function to execute when the button is clicked.
 * @returns {JSX.Element} A React component representing an add card button.
 */
const AddButton = ({ onClick }) => (
  <Tooltip title='Add note'>
    <Fab aria-label='add' color='primary' onClick={onClick}>
      <AddIcon />
    </Fab>
  </Tooltip>
);

// PropTypes for validation
AddButton.propTypes = {
  onClick: PropTypes.func.isRequired, // Define onClick as a required function
};

export default AddButton;
