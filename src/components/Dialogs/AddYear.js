import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { gql, useMutation } from "@apollo/client";
import { parse } from "papaparse";
import styled from "styled-components";

const DropZone = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed #ddd;
    color: #aaa;
    transition: color 0.5s;
    border-radius: 12px;
    margin: 40px 0 20px 0;
    cursor: pointer;
    :hover {
        border-color: #5191e0;
    }
`;

const ADD_YEAR = gql`
    mutation uploadYear($year: String!, $data: String!) {
        uploadYear(year: $year, data: $data) {
            id
        }
    }
`;

function AddYear({ open, setModal, refetch }) {
    const [uploadYear, { data }] = useMutation(ADD_YEAR);
    const [error, setError] = useState();
    // Holds inputs for adding year
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: ".csv",
    });

    const handleClose = () => {
        setModal(null);
        setTimeout(() => {
            setError(null);
        }, 1000);
    };

    const submit = () => {
        // Checking to make sure name and password is not empty
        if (name === "") setName(null);
        setSubmitted(true);
        if (name === null || acceptedFiles.length === 0 || name === "") return;
        console.log(`Adding the year '${name}' with file '${acceptedFiles[0].name}'...`);
        
        var reader = new FileReader();

        //When a file is read in, execute this function
        reader.onload = function(file) {

            //Upload Year Resollver
            uploadYear({ 
                variables: { 
                    year: name, 
                    data: file.target.result 
                } 
            })
            .then(() => {
                handleClose();
                console.log("I did it dad");
            })
            .catch((error) => {
                setError(error.message);
            });
        };

        //Read the file in
        reader.readAsText(acceptedFiles[0]);
       
        /*parse(acceptedFiles[0], {
            complete: function(results, file) {
                console.log(results);
            },
            header: true,
        });*/
        // Adding user to backend
        // addYear({ variables: { company: name, password: password } })
        //     .then(() => {
        //         handleClose();
        //         setName("");
        //         setPassword("");
        //         refetch();
        //     })
        //     .catch((error) => {
        //         setError(error.message.substring(15));
        //     });
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
                    value={name === null ? "" : name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    label="Year"
                    type="text"
                    fullWidth
                />
                {/* Upload */}
                <DropZone
                    {...getRootProps(
                        acceptedFiles.length === 0 &&
                            submitted && { style: { borderColor: "rgb(244, 68 ,54)" } }
                    )}
                >
                    <input {...getInputProps()} />
                    {acceptedFiles.length > 0 ? (
                        <p>
                            {acceptedFiles[0].name} - {(acceptedFiles[0].size / 1000).toFixed()} KB
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
            {error && <Alert severity="error">{error}</Alert>}
        </Dialog>
    );
}

export default AddYear;
