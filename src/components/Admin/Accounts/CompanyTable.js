import styled from "styled-components";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";
import More from "./More";

const StyledTable = styled.div`
    .MuiTableCell-root {
        font-family: inherit !important;
    }
    .MuiButton-root {
        min-width: 42px;
    }
`;

function CompanyTable({ rows }) {
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
                                <More status={row.status} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTable>
    );
}

export default CompanyTable;
