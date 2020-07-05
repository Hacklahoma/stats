import styled from 'styled-components';
import Link from 'next/link';
import { FiPieChart, FiBarChart2, FiX, FiEdit2, FiLogOut } from 'react-icons/fi';
import { MdAttachMoney } from 'react-icons/md';
import { Button, Tooltip, ClickAwayListener } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { CSSTransition } from 'react-transition-group';
import { useRouter } from 'next/router';

// Styling for desktop sidebar
const StyledSidebar = styled.div`
    align-items: center;
    animation: slide-in 0.25s;
    background: #fcfcfc;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: scroll;
    position: fixed;
    width: 92px;

    .logo {
      margin: 40px 0 8vh;

      img {
        width: 62px;
      }
    }

    .tabs {
      align-items: center;
      display: flex;
      flex-direction: column;
    }

    .button {
      margin: 5px 0;

      .icon {
        color: #444;
        height: 32px;
        opacity: 0.8;
        transition: opacity 0.25s;
        width: 32px;
      }
    }

    .button:hover {
      .icon {
        opacity: 1;
      }
    }

    .disabled {
      cursor: not-allowed !important;
    }

    .button:last-of-type {
      margin-bottom: 20px;
      margin-top: auto;
    }

    @keyframes slide-in {
      0% {
        transform: translateX(-100%);
      }

      100% {
        transform: translateX(0);
      }
    }
`;

// Styling for mobile menu
const MENU_HEIGHT_ADMIN = '240px';
const MENU_HEIGHT = '180px';
const StyledHamburger = styled.div`
    background: white;
    height: 75px;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 100;

    .hamburgerButton {
      margin: 10px 20px;
      padding: 8px 0;

      .hamburger {
        color: #1d1d1d;
        height: 38px;
        transform: rotate(90deg);
        width: 38px;
      }
    }

    .expanded {
      background: rgba(0, 0, 0, 0.15);
      cursor: pointer;
      height: 100vh;
      width: 100vw;

      .container {
        background: white;
        box-shadow: 0 4px 4px -3px rgba(0, 0, 0, 0.15);
        cursor: auto;
        height: ${(props) => (props.isAdmin ? MENU_HEIGHT_ADMIN : MENU_HEIGHT)};
        overflow: hidden;

        .item {
          margin: 8px 20px;

          .button {
            display: flex;
            justify-content: left;
            padding: 10px 20px;
            width: 100%;

            .icon {
              color: #1d1d1d;
              height: 26px;
              width: 26px;
            }

            p {
              margin-left: 10px;
            }
          }

          .disabled {
            cursor: not-allowed !important;
          }
        }
      }
    }

    .expanded-enter {
      background: rgba(0, 0, 0, 0);

      .container {
        height: 0;
      }
    }

    .expanded-enter-active {
      background: rgba(0, 0, 0, 0.15);
      transition: background 250ms;

      .container {
        height: ${(props) => (props.isAdmin ? MENU_HEIGHT_ADMIN : MENU_HEIGHT)};
        transition: height 250ms;
      }
    }

    .expanded-exit {
      background: rgba(0, 0, 0, 0.15);
      cursor: auto;

      .container {
        height: ${(props) => (props.isAdmin ? MENU_HEIGHT_ADMIN : MENU_HEIGHT)};
      }
    }

    .expanded-exit-active {
      background: rgba(0, 0, 0, 0);
      cursor: auto;
      transition: background 250ms;

      .container {
        height: 0;
        transition: height 250ms;
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
 * Renders the sidebar on all windows except for login
 *
 * Will also render a mobile sidebar with a hamburger menu
 *
 * When adding more buttons to sidebar, make sure you also
 * add it to the mobile one.
 *
 * @param {*} param0
 */
function Sidebar({ user }) {
  const [isMobile, setMobile] = useState();
  const [isExpanded, setExpanded] = useState();
  // Mutation to add an event
  const [addEvent] = useMutation(ADD_EVENT);
  const router = useRouter();

  // Populating isMobile state
  useEffect(() => {
    /**
     * When resizing, determine whether to set to mobile
     * which will enable hamburger menu
     */
    function onResize() {
      setMobile(window.innerWidth < 620);
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  /**
   * Handle logout
   */
  const logout = () => {
    // Event logger
    addEvent({
      variables: {
        id: user.id,
        type: 'LOGOUT',
        description: 'Logout',
      },
    });
    localStorage.removeItem('token');
    router.push('/login?logout');
  };

  // Closing menu when transitioning from desktop to mobile
  useEffect(() => {
    setExpanded(false);
  }, [isMobile]);

  if (isMobile) {
    // Return mobile
    return (
      <StyledHamburger isAdmin={user.isAdmin} isExpanded={isExpanded}>
        {/* Open and Close buttons */}
        <Button
          onClick={() => setExpanded(!isExpanded)}
          className="hamburgerButton"
          size="small"
        >
          {isExpanded ? (
            <FiX className="hamburger" />
          ) : (
            <FiBarChart2 className="hamburger" />
          )}
        </Button>
        {/* Actual menu to be rendered when expanded */}
        <CSSTransition in={isExpanded} classNames="expanded" unmountOnExit timeout={250}>
          <div className="expanded">
            <ClickAwayListener onClickAway={() => setExpanded(false)}>
              <div className="container">
                <Link href="/">
                  <div className="item">
                    <Button
                      onClick={() => setExpanded(false)}
                      className="button"
                      id="metrics-button"
                    >
                      <FiPieChart className="icon" />
                      <p>Metrics</p>
                    </Button>
                  </div>
                </Link>
                {/* Finances */}
                <Link href="/finances">
                  <div className="item">
                    <Button
                      onClick={() => setExpanded(false)}
                      className="button"
                    >
                      <MdAttachMoney className="icon" />
                      <p>Finances</p>
                    </Button>
                  </div>
                </Link>
                {/* Admin panel */}
                {user.isAdmin && (
                <Link href="/admin">
                  <div className="item">
                    <Button
                      onClick={() => setExpanded(false)}
                      className="button"
                    >
                      <FiEdit2 className="icon" />
                      <p>Admin Panel</p>
                    </Button>
                  </div>
                </Link>
                )}
                {/* Log out */}
                <div className="item">
                  <Button onClick={logout} className="button">
                    <FiLogOut className="icon" />
                    <p>Log Out</p>
                  </Button>
                </div>
              </div>
            </ClickAwayListener>
          </div>
        </CSSTransition>
      </StyledHamburger>
    );
  } if (!isMobile && isMobile !== undefined) {
    // Return desktop
    return (
      <StyledSidebar>
        {/* Logo */}
        <Link href="/">
          <a className="logo">
            <img src="/images/logo192.png" alt="" />
          </a>
        </Link>
        <div className="tabs">
          <Link href="/">
            <Tooltip title="Metrics" arrow placement="right">
              <Button className="button" id="metrics-button">
                <FiPieChart className="icon" />
              </Button>
            </Tooltip>
          </Link>
          {/* Finances */}
          <Link href="/finances">
            <Tooltip title="Finances" arrow placement="right">
              <Button className="button">
                <MdAttachMoney className="icon" />
              </Button>
            </Tooltip>
          </Link>
          {/* Admin panel */}
          {user.isAdmin && (
          <Link href="/admin">
            <Tooltip title="Admin panel" arrow placement="right">
              <Button className="button">
                <FiEdit2 className="icon" />
              </Button>
            </Tooltip>
          </Link>
          )}
        </div>
        {/* Logout */}
        <Tooltip title="Log out" arrow placement="right">
          <Button className="button" onClick={logout}>
            <FiLogOut className="icon" />
          </Button>
        </Tooltip>
      </StyledSidebar>
    );
  }
  return null;
}

export default Sidebar;
