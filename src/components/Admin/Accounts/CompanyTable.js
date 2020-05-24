import styled from "styled-components";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import More from "./More";

const StyledTable = styled.div`
    .MuiTableCell-root {
        font-family: inherit !important;
    }
    .MuiButton-root {
        min-width: 42px;
    }
    .status {
        border: 1px solid;
        padding: 1px 8px;
        border-radius: 50px;
        display: inline-block;
    }
    .enabled {
        color: #249c24;
    }
    .disabled {
        color: #e81c0e;
    }
`;

function CompanyTable({ rows }) {
    return (
        <StyledTable>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell size="medium" style={{ paddingLeft: "10px" }}>
                            Company Name
                        </TableCell>
                        <TableCell size="small">Status</TableCell>
                        <TableCell size="small">Views</TableCell>
                        <TableCell size="small"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => {
                        if (!row.isAdmin) {
                            const status = row.disabled ? "disabled" : "enabled";
                            return (
                                <TableRow key={row.company}>
                                    <TableCell
                                        size="medium"
                                        style={{ paddingLeft: "10px", fontWeight: "bold" }}
                                    >
                                        {row.company}
                                    </TableCell>
                                    <TableCell size="small">
                                        <div className={`status ${status}`}>{status}</div>
                                    </TableCell>
                                    <TableCell size="small">{row.views}</TableCell>
                                    <TableCell size="small" align="right">
                                        <More status={status} row={row} />
                                    </TableCell>
                                </TableRow>
                            );
                        }
                    })}
                </TableBody>
            </Table>
        </StyledTable>
    );
}

export default CompanyTable;
