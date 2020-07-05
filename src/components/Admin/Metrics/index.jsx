import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { gql, useQuery } from '@apollo/client';
import AddYear from '../../Dialogs/AddYear';
import YearItem from './YearItem';

const StyledMetrics = styled.div`
  .buttons {
    position: absolute;
    right: 30px;
    top: 52px;
    z-index: 101;

    .icon {
      min-width: unset;
      padding: 8px;

      svg {
        height: 24px;
        width: 24px;
      }
    }
  }

  .years {
    margin-top: 40px;
    width: 100%;
  }

  .message {
    margin-top: 40px;
  }

  @media only screen and (max-width: 619px) {
    .buttons {
      position: fixed;
      top: 17px;
    }
  }
`;

const GET_YEARS = gql`
    query Years {
        allYears(sortBy: year_DESC) {
            id
            year
            disabled
        }
    }
`;

/**
 * TODO
 * @param {*} param0
 */
function Metrics({ user }) {
  const [modal, setModal] = useState();
  // Getting years
  const { loading, data, refetch } = useQuery(GET_YEARS);

  /**
   * TODO
   */
  function conditionalRender() {
    if (loading) {
      return <p className="message">Loading...</p>;
    }
    if (data.allYears.length === 0) {
      return <p className="message">No data to display.</p>;
    }

    const yearItems = [];
    Object.values(data.allYears).forEach((row) => {
      yearItems.push(<YearItem user={user} key={row.id} refetch={refetch} row={row} />);
    });

    return (
      <div className="years">
        {yearItems}
      </div>
    );
  }

  return (
    <StyledMetrics>
      {/* Add account Dialog */}
      <AddYear user={user} setModal={setModal} refetch={refetch} open={modal === 'add'} />
      {/* Add and Activity buttons */}
      <div className="buttons">
        <Button onClick={() => setModal('add')} className="icon add" size="small">
          <FiPlus />
        </Button>
      </div>
      {conditionalRender()}
    </StyledMetrics>
  );
}

export default Metrics;
