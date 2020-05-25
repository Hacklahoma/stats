import { Menu, MenuItem, Button } from "@material-ui/core";
import { FiMoreHorizontal } from "react-icons/fi";
import { gql, useMutation } from "@apollo/client";

const MUTATE_STATUS = gql`
    mutation mutateStatus($id: ID!, $disabled: Boolean!) {
        updateUser(id: $id, data: { disabled: $disabled }) {
            id
        }
    }
`;

function More({ row, refetch }) {
    const [mutateStatus, { data }] = useMutation(MUTATE_STATUS);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [copied, setCopied] = React.useState(false);

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

    // Handles enable/disable
    const changeStatus = () => {
        mutateStatus({
            variables: {
                id: row.id,
                disabled: !row.disabled,
            },
        })
            .then(() => {
                refetch();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div>
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
                <MenuItem style={{ color: "#1d1d1d", fontSize: ".85em" }} onClick={handleClose}>
                    Edit credentials
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
