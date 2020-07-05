import { Menu, MenuItem, Button } from '@material-ui/core';
import { FiMoreHorizontal } from 'react-icons/fi';
import { gql, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import Confirmation from '../../Dialogs/Confirmation';

/**
 * Mutation to delete a year
 */
const DELETE_YEAR = gql`
    mutation deleteYear($id: ID!) {
      deleteYear(id: $id) {
            id
        }
    }
`;

/**
 * Mutation to delete a year
 */
const DELETE_METRIC = gql`
    mutation deleteMetric($id: ID!) {
      deleteMetric(id: $id) {
            id
        }
    }
`;

/**
 * Mutation for changing the status of a user
 */
const MUTATE_STATUS = gql`
    mutation mutateStatus($id: ID!, $disabled: Boolean!) {
        updateYear(id: $id, data: { disabled: $disabled }) {
            id
        }
    }
`;

/**
 * Mutation for adding events
 */
const ADD_EVENT = gql`
    mutation addEvent($id: ID!, $type: String!, $description: String) {
        addEvent(id: $id, type: $type, description: $description) {
            id
        }
    }
`;

/**
 * Extra options for an account to choose from. This will
 * display and also execute the dropdowns options.
 *
 * @param {*} param0
 */
function More({ user, row, refetch }) {
  const [mutateStatus] = useMutation(MUTATE_STATUS);
  const [deleteMetric] = useMutation(DELETE_METRIC);
  const [deleteYear] = useMutation(DELETE_YEAR);
  const [addEvent] = useMutation(ADD_EVENT);
  const [anchorEl, setAnchorEl] = useState(null);
  const [modal, setModal] = useState();
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (confirmed === true) {
      deleteYear({
        variables: {
          id: row.id,
        },
      }).then(() => {
        deleteMetric({
          variables: {
            id: row.metrics.id,
          },
        }).then(() => {
          addEvent({
            variables: {
              id: user.id,
              type: 'DELETE_YEAR',
              description: `${row.year} Deleted`,
            },
          });
          refetch();
        });
      });
    }
  }, [confirmed]);

  /**
   * Handles opening more menu
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handles closing more menu
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Handles enable/disable year and will also log
   * an event of who did it.
   */
  const changeStatus = () => {
    mutateStatus({
      variables: {
        id: row.id,
        disabled: !row.disabled,
      },
    }).then(() => {
      // Event logger
      addEvent({
        variables: {
          id: user.id,
          type: !row.disabled ? 'DISABLE_YEAR' : 'ENABLE_YEAR',
          description: !row.disabled ? `${row.year} Disabled` : `${row.year} Enabled`,
        },
      });
      refetch();
    });
  };

  /**
   * Brings up dialogs to ask if they want to delete
   * the year
   */
  const tryDeleteYear = () => {
    setModal('CONFIRM_DELETION');
  };

  return (
    <div>
      {/* Deletion confirmation dialog */}
      <Confirmation
        open={modal === 'CONFIRM_DELETION'}
        setModal={setModal}
        confirmationButton="Delete Account"
        title={`Are you sure you want to delete ${row.year}?`}
        setConfirmed={setConfirmed}
      />
      {/* Button icon */}
      <Button size="small" className="more" onClick={handleClick}>
        <FiMoreHorizontal className="icon" />
      </Button>
      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        elevation={0}
        style={{
          margin: '43px 0 0 0',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* Disable/Enable */}
        <MenuItem
          style={{
            color: `${row.disabled ? '#249c24' : '#e81c0e'}`,
            fontSize: '0.85em',
          }}
          onClick={changeStatus}
        >
          {row.disabled ? 'Enable' : 'Disable'}
        </MenuItem>
        {/* divider */}
        <div
          style={{
            width: '100%',
            margin: '4px 0',
            background: 'rgba(0, 0, 0, 0.2)',
            minHeight: '1px',
          }}
        />
        {/* Delete */}
        <MenuItem
          style={{
            color: '#bbbbbb',
            fontSize: '0.85em',
          }}
          onClick={tryDeleteYear}
        >
          Delete year
        </MenuItem>
      </Menu>
    </div>
  );
}

export default More;
