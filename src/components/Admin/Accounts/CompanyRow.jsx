import { TableRow, TableCell } from '@material-ui/core';
import More from './More';

/**
 * TODO
 * @param {*} param0
 */
function CompanyRow({ user, row, refetch }) {
  const status = row.disabled ? 'disabled' : 'enabled';
  return (
    <TableRow>
      <TableCell
        size="medium"
        style={{ paddingLeft: '10px', fontWeight: 'bold' }}
      >
        {row.company}
      </TableCell>
      <TableCell size="small">
        <div className={`status ${status}`}>{status}</div>
      </TableCell>
      <TableCell size="small">{row._activityMeta.count}</TableCell>
      <TableCell size="small" align="right">
        <More user={user} refetch={refetch} row={row} />
      </TableCell>
    </TableRow>
  );
}

export default CompanyRow;
