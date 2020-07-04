import styled from 'styled-components';
import { useState } from 'react';
import Accounts from '../components/Admin/Accounts';
import Metrics from '../components/Admin/Metrics';

const StyledAdmin = styled.div`
    left: 92px;
    padding: 55px 35px;
    position: relative;
    transition: padding 0.25s;
    width: calc(100vw - 160px);

    .tabs {
      display: flex;
      justify-content: space-between;
      max-width: 350px;

      .item {
        align-items: center;
        color: #b6b6b6;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        transition: color 250ms;
      }

      .item.active {
        color: unset;
      }

      .item:hover {
        color: unset;
      }
    }

    @media only screen and (max-width: 619px) {
      left: 0;
      margin-top: 50px;
      padding: 30px 35px;
      width: auto;

      .tabs {
        max-width: 300px;

        .item {
          font-size: 1.3em;
        }
      }
    }
`;

/**
 * TODO
 *
 * @param {*} param0
 */
function Admin({ user }) {
  // Holds active view, defaults to accounts
  const [view, setView] = useState('accounts');
  if (user.isAdmin) {
    return (
      <StyledAdmin>
        <div className="tabs">
          {/* Accounts */}
          <h2
            onClick={() => setView('accounts')}
            className={`item ${view === 'accounts' && 'active'}`}
          >
            Accounts
          </h2>
          {/* Metrics */}
          <h2
            onClick={() => setView('metrics')}
            className={`item ${view === 'metrics' && 'active'}`}
          >
            Metrics
          </h2>
          {/* Finances */}
          <h2
            onClick={() => setView('finances')}
            className={`item ${view === 'finances' && 'active'}`}
          >
            Finances
          </h2>
        </div>
        {view === 'accounts' && <Accounts user={user} />}
        {view === 'metrics' && <Metrics user={user} />}
        {view === 'finances' && <p style={{ marginTop: '40px' }}>Work in progress...</p>}
      </StyledAdmin>
    );
  }
  return (
    <p
      style={{
        position: 'absolute',
        top: '50vh',
        left: '50vw',
        transform: 'translate(-50%, -50%)',
      }}
    >
      Restricted Access
    </p>
  );
}

export default Admin;
