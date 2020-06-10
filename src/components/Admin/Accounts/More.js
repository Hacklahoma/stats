import { Menu, MenuItem, Button } from "@material-ui/core";
import { FiMoreHorizontal } from "react-icons/fi";
import { gql, useMutation } from "@apollo/client";
import EditAccount from "../../Dialogs/EditAccount";

const MUTATE_STATUS = gql`
    mutation mutateStatus($id: ID!, $disabled: Boolean!) {
        updateUser(id: $id, data: { disabled: $disabled }) {
            id
        }
    }
`;

//Mutation for adding events
const ADD_EVENT = gql`
    mutation addEvent($id: ID!, $type: String!, $description: String) {
        addEvent(id: $id, type: $type, description: $description) {
            id
        }
    }
`;

function More({ user, row, refetch }) {
    const [mutateStatus, { data }] = useMutation(MUTATE_STATUS);
    const [addEvent] = useMutation(ADD_EVENT);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [copied, setCopied] = React.useState(false);
    const [modal, setModal] = React.useState();

    // Handles opening more menu
    const handleClick = (event) => {
        setCopied(false);
        setAnchorEl(event.currentTarget);
    };

    // Handles closing more menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Handles copying password to clipboard
    const copyPassword = () => {
        navigator.clipboard.writeText(row.password);
        setCopied(true);
        setTimeout(() => handleClose(), 300);
    };

    const editUser = () => {
        setModal("edit");
        setAnchorEl(null);
    };

    // Handles enable/disable
    const changeStatus = () => {
        mutateStatus({
            variables: {
                id: row.id,
                disabled: !row.disabled,
            },
        }).then(() => {
            //Event logger
            addEvent({
                variables: {
                    id: user.id,
                    type: !row.disabled ? "DISABLE_COMPANY" : "ENABLE_COMPANY",
                    description: !row.disabled
                        ? `${row.company} Disabled`
                        : `${row.company} Enabled`,
                },
            });
            refetch();
        });
    };

    return (
        <div>
            <EditAccount refetch={refetch} open={modal === "edit"} setModal={setModal} row={row} />
            {/* Button icon */}
            <Button size="small" onClick={handleClick}>
                <FiMoreHorizontal size="22px" />
            </Button>
            {/* Menu */}
            <Menu
                anchorEl={anchorEl}
                keepMounted
                elevation={0}
                style={{
                    margin: "43px 0 0 -30px",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {/* Copy password / confirmation */}
                <MenuItem style={{ color: "#1d1d1d", fontSize: ".85em" }} onClick={copyPassword}>
                    {copied ? "Copied  ✔️" : "Copy password"}
                </MenuItem>
                {/* Edit credentials */}
                <MenuItem style={{ color: "#1d1d1d", fontSize: ".85em" }} onClick={editUser}>
                    Edit company
                </MenuItem>
                {/* divider */}
                <div
                    style={{
                        width: "100%",
                        margin: "4px 0",
                        background: "rgba(0,0,0,0.2)",
                        minHeight: "1px",
                    }}
                />
                {/* Disable/Enable */}
                <MenuItem
                    style={{
                        color: `${row.disabled ? "#249c24" : "#e81c0e"}`,
                        fontSize: ".85em",
                    }}
                    onClick={changeStatus}
                >
                    {row.disabled ? "Enable" : "Disable"}
                </MenuItem>
            </Menu>
        </div>
    );
}

export default More;
