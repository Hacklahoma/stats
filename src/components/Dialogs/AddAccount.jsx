import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Input,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_USER = gql`
    mutation addUser($company: String!, $password: String!) {
        addUser(company: $company, password: $password) {
            id
        }
    }
`;

// Mutation for adding events
const ADD_EVENT = gql`
    mutation addEvent($id: ID!, $type: String!, $description: String) {
        addEvent(id: $id, type: $type, description: $description) {
            id
        }
    }
`;

/**
 * TODO
 * @param {*} param0
 */
function AddAccount({ user, open, setModal, refetch }) {
  const [addUser] = useMutation(ADD_USER);
  const [addEvent] = useMutation(ADD_EVENT);
  const [isVisible, setVisible] = useState(false);
  const [error, setError] = useState();
  // Holds credentials for adding user
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  /**
   * TODO
   */
  const handleClose = () => {
    setModal(null);
    setTimeout(() => {
      setError(null);
    }, 1000);
  };

  /**
   * TODO
   */
  const submit = () => {
    // Checking to make sure name and password is not empty
    if (name === '') setName(null);
    if (password === '') setPassword(null);
    if (name === null || password === null || name === '' || password === '') return;
    // eslint-disable-next-line no-console
    console.log(`Adding the user '${name}' with password '${password}'...`);
    // Adding user to backend
    addUser({ variables: { company: name, password } })
      .then(() => {
        // Event logger
        addEvent({
          variables: {
            id: user.id,
            type: 'CREATE_COMPANY',
            description: `${name} Created`,
          },
        });
        handleClose();
        setName('');
        setPassword('');
        refetch();
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
      <DialogTitle>Add Company</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add a new company with a unique password for them to login with.
        </DialogContentText>
        {/* Company name */}
        <TextField
          autoFocus
          error={name === null}
          id="name"
          value={name === null ? '' : name}
          required
          onChange={(e) => setName(e.target.value)}
          label="Company Name"
          type="text"
          fullWidth
        />
        {/* Password */}
        <FormControl
          style={{ margin: '10px 0' }}
          required
          error={password === null}
          variant="standard"
        >
          <InputLabel>Password</InputLabel>
          <Input
            type={isVisible ? 'text' : 'password'}
            value={password === null ? '' : password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            endAdornment={(
              <InputAdornment position="end">
                <IconButton onClick={() => setVisible(!isVisible)} edge="end">
                  {isVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
                          )}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button variant="outlined" onClick={submit} color="primary">
          Add
        </Button>
      </DialogActions>
      {/* Display error */}
      {error && <Alert severity="error">{error}</Alert>}
    </Dialog>
  );
}

export default AddAccount;
