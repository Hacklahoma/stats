import styled from "styled-components";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Menu,
    MenuItem,
    Button,
} from "@material-ui/core";
import { FiMoreHorizontal } from "react-icons/fi";

const StyledTable = styled.div`
    .MuiTableCell-root {
        font-family: inherit !important;
    }
    .MuiButton-root {
        min-width: 42px;
    }
`;

function CompanyTable({ rows }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <StyledTable>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ paddingLeft: "10px" }}>Company Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Views</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                                {row.name}
                            </TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.views}</TableCell>
                            <TableCell align="right">
                                <Button size="small" onClick={handleClick}>
                                    <FiMoreHorizontal size="22px" />
                                </Button>
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
                                    <MenuItem
                                        style={{ color: "#1d1d1d", fontSize: ".85em" }}
                                        onClick={handleClose}
                                    >
                                        Copy password
                                    </MenuItem>
                                    <MenuItem
                                        style={{ color: "#1d1d1d", fontSize: ".85em" }}
                                        onClick={handleClose}
                                    >
                                        Edit credentials
                                    </MenuItem>
                                    <div
                                        style={{
                                            width: "100%",
                                            margin: "4px 0",
                                            background: "rgba(0,0,0,0.2)",
                                            minHeight: "1px",
                                        }}
                                    />
                                    <MenuItem
                                        style={{ color: "#e81c0e", fontSize: ".85em" }}
                                        onClick={handleClose}
                                    >
                                        Disable
                                    </MenuItem>
                                </Menu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTable>
    );
}

export default CompanyTable;
