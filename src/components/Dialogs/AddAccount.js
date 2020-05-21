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

function AddAccount({ name, setName, password, setPassword, open, setModal }) {
    const [isVisible, setVisible] = useState(false);

    return (
        <Dialog onClose={() => setModal(null)} open={open} fullWidth maxWidth="xs">
            <DialogTitle>Add Company</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Add a new company with a unique password for them to login with.
                </DialogContentText>
                <TextField
                    autoFocus
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label="Company Name"
                    type="text"
                    fullWidth
                />
                <FormControl style={{ margin: "10px 0" }} variant="standard">
                    <InputLabel>Password</InputLabel>
                    <Input
                        type={isVisible ? "text" : "password"}
                        value={password}
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
                <Button variant="outlined" onClick={() => setModal(null)} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddAccount;
