import styled from 'styled-components';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';

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

  .lock {
    color: #aaa;
    cursor: pointer;
    margin: 8px;
    min-width: 30px;

    .icon {
      height: 17px;
      width: 17px;
    }
  }
`;

const UPDATE_YEAR = gql`
    mutation updateYear($id: ID!, $disabled: Boolean!) {
        updateYear(id: $id, data: { disabled: $disabled }) {
            id
        }
    }
`;

// Mutation for adding events
const ADD_EVENT = gql`
    mutation addEvent($id: ID!, $type: String!, $description: String) {
        addEvent(id: $id, type: $type, description: $description) {
            id
        }
    }
`;

/**
 * TODO
 * @param {*} param0
 */
function YearItem({ user, row, refetch }) {
  const [locked, setLocked] = useState(row.disabled);
  const [addEvent] = useMutation(ADD_EVENT);
  const [updateYear] = useMutation(UPDATE_YEAR);

  useEffect(() => {
    refetch();
  }, [row]);

  /**
   * TODO
   */
  const toggleLock = () => {
    // Update year when locking/unlocking
    updateYear({
      variables: {
        id: row.id,
        disabled: !locked,
      },
    }).then(() => {
      // Event logger
      addEvent({
        variables: {
          id: user.id,
          type: !locked ? 'DISABLE_YEAR' : 'ENABLE_YEAR',
          description: !locked ? `${row.year} Disabled` : `${row.year} Enabled`,
        },
      });
      setLocked(!locked);
    });
  };

  return (
    <StyledYearItem locked={locked}>
      <p>{row.year}</p>
      <Button className="lock" onClick={toggleLock}>
        {locked ? <FaLock className="icon" /> : <FaLockOpen className="icon" />}
      </Button>
    </StyledYearItem>
  );
}

export default YearItem;
