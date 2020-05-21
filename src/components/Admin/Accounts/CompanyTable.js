import styled from "styled-components";
import {
    Table,
    TableContainer,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";

const StyledTable = styled.div``;

function CompanyTable({ rows }) {
    console.log("TEST");
    console.log(rows);

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
                            <TableCell style={{ paddingLeft: "10px" }}>{row.name}</TableCell>
                            <TableCell>{row.views}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell align="right">•••</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTable>
    );
}

export default CompanyTable;
