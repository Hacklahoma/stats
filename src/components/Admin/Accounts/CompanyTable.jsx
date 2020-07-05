import styled from 'styled-components';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import CompanyRow from './CompanyRow';

const StyledTable = styled.div`
    .MuiTableCell-root {
      font-family: inherit !important;
    }

    .MuiButton-root {
      min-width: 42px;
    }

    .status {
      border: 1px solid;
      border-radius: 50px;
      display: inline-block;
      min-width: 75px;
      text-align: center;
    }

    .enabled {
      color: #249c24;
    }

    .disabled {
      color: #e81c0e;
    }
`;

/**
 * Table that renders rows of accounts and their attributes
 * @param {*} param0
 */
function CompanyTable({ user, rows, refetch }) {
  return (
    <StyledTable>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell size="medium" style={{ paddingLeft: '10px' }}>
              Company Name
            </TableCell>
            <TableCell size="small">Status</TableCell>
            <TableCell size="small">Views</TableCell>
            <TableCell size="small" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            if (row.isAdmin) {
              return;
            }

            return (
              <CompanyRow
                key={row.company}
                user={user}
                refetch={refetch}
                row={row}
              />
            );
          })}
        </TableBody>
      </Table>
    </StyledTable>
  );
}

export default CompanyTable;
