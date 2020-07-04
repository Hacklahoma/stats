/**
 * Handles displaying and functionality of adding a year
 */

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';

const DropZone = styled.div`
    align-items: center;
    border: 2px dashed #ddd;
    border-radius: 12px;
    color: #aaa;
    cursor: pointer;
    display: flex;
    height: 100px;
    justify-content: center;
    margin: 40px 0 20px;
    transition: color 0.5s;

    :hover {
      border-color: #5191e0;
    }
`;

const ADD_YEAR = gql`
    mutation uploadYear($year: Int!, $projects: Int!, $data: String!) {
        uploadYear(year: $year, projects: $projects, data: $data) {
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
function AddYear({ user, open, setModal, refetch }) {
  const [uploadYear, info] = useMutation(ADD_YEAR);
  const [addEvent] = useMutation(ADD_EVENT);
  const [error, setError] = useState();
  // Holds inputs for adding year
  const [name, setName] = useState('');
  const [projects, setProjects] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: '.csv',
  });

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
    if (projects === '') setProjects(null);
    setSubmitted(true);
    if (
      name === null
            || acceptedFiles.length === 0
            || name === ''
            || projects === null
            || projects === ''
    ) { return; }
    // eslint-disable-next-line no-console
    console.log(`Adding the year '${name}' with file '${acceptedFiles[0].name}'...`);

    const reader = new FileReader();

    // When a file is read in, execute this function
    reader.onload = function (file) {
      // Upload Year Resolver
      uploadYear({
        variables: {
          year: name,
          projects,
          data: file.target.result,
        },
      })
        .then(() => {
          // Event logger
          addEvent({
            variables: {
              id: user.id,
              type: 'UPLOAD_YEAR',
              description: `${name.toString()} Created`,
            },
          });
          handleClose();
          refetch();
        })
        .catch((e) => {
          setError(e.message);
        });
    };

    // Read the file in
    reader.readAsText(acceptedFiles[0]);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
      <DialogTitle>Add Year</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Upload a .csv file that is formatted appropriately. Please make sure you have
          reviewed the uploading guidelines.
        </DialogContentText>
        {/* Year name */}
        <TextField
          autoFocus
          error={name === null}
          id="name"
          value={name === null ? '' : name}
          required
          onChange={(e) => setName(e.target.value)}
          label="Year"
          type="number"
          style={{ marginRight: '50px' }}
        />
        {/* Number of projects */}
        <TextField
          error={projects === null}
          id="projects"
          value={projects === null ? '' : projects}
          required
          onChange={(e) => setProjects(e.target.value)}
          label="Number of projects"
          type="number"
        />
        {/* Upload */}
        <DropZone
          {...getRootProps(
            acceptedFiles.length === 0
            && submitted
            && { style: { borderColor: 'rgb(244, 68 ,54)' } },
          )}
        >
          <input {...getInputProps()} />
          {acceptedFiles.length > 0 ? (
            <p>
              {acceptedFiles[0].name}
              {' '}
              -
              {' '}
              {(acceptedFiles[0].size / 1000).toFixed()}
              {' '}
              KB
            </p>
          ) : (
            <p>Drag 'n' drop a file here, or click to select a file</p>
          )}
        </DropZone>
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
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        info.loading && <Alert severity="info">Parsing data... Hang tight!</Alert>
      )}
    </Dialog>
  );
}

export default AddYear;
