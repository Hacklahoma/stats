import styled from 'styled-components';
import More from './More';

const StyledYearItem = styled.div`
  align-items: center;
  border: 3px solid #eaeaea;
  border-radius: 8px;
  display: flex;
  float: left;
  justify-content: space-between;

  /* min-width: 200px; */
  margin: 10px;

  p {
    padding: 10px 14px;
    font-weight: bold;
    font-size: 2em;
    transition: color 0.25s;
    ${(props) => props.locked && 'color: rgb(244, 68 ,54)'}
  }

  .more {
    color: #aaa;
    cursor: pointer;
    margin: 8px;
    min-width: 30px;

    .icon {
      height: 22px;
      width: 22px;
    }
  }
`;

/**
 * Displays year name with more dropdown.
 * Will change the styling when locked.
 *
 * @param {*} param0
 */
function YearItem({ user, row, refetch }) {
  return (
    <StyledYearItem locked={row.disabled}>
      <p>{row.year}</p>
      <More row={row} refetch={refetch} user={user} />
    </StyledYearItem>
  );
}

export default YearItem;
