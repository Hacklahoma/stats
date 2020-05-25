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
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const EDIT_USER = gql`
    mutation changeUser($id: ID!, $company: String!, $password: String!) {
        changeUser(id: $id, company: $company, password: $password) {
            id
        }
    }
`;

function EditAccount({ row, open, setModal, refetch }) {
    const [changeUser, { data }] = useMutation(EDIT_USER);
    const [isVisible, setVisible] = useState(false);
    // Holds credentials for adding user
    const [name, setName] = useState(row.company);
    const [password, setPassword] = useState(row.password);

    const submit = () => {
        // Checking to make sure name and password is not empty
        if (name === "") setName(null);
        if (password === "") setPassword(null);
        if (name === null || password === null || name === "" || password === "") return;
        console.log(`Editing user to company name '${name}' and password '${password}'...`);
        // Adding user to backend
        changeUser({ variables: { id: row.id, company: name, password: password } })
            .then(() => {
                setModal(null);
                refetch();
            })
            .catch((error) => {
                // TODO: Catch errors
                console.log(error.message);
            });
    };

    return (
        <Dialog onClose={() => setModal(null)} open={open} fullWidth maxWidth="xs">
            <DialogTitle>Edit Company</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Make sure you let the company know that their password has changed if necessary.
                </DialogContentText>
                {/* Company name */}
                <TextField
                    error={name === null}
                    id="name"
                    value={name === null ? "" : name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    label="Company Name"
                    type="text"
                    fullWidth
                />
                {/* Password */}
                <FormControl
                    style={{ margin: "10px 0" }}
                    required
                    error={password === null}
                    variant="standard"
                >
                    <InputLabel>Password</InputLabel>
                    <Input
                        type={isVisible ? "text" : "password"}
                        value={password === null ? "" : password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => setVisible(!isVisible)} edge="end">
                                    {isVisible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setModal(null)} color="primary">
                    Cancel
                </Button>
                <Button variant="outlined" onClick={submit} color="primary">
                    Edit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditAccount;
