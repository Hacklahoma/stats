import styled from "styled-components";
import Link from "next/link";
import { FiPieChart, FiBarChart2, FiX, FiEdit2, FiLogOut } from "react-icons/fi";
import { MdAttachMoney } from "react-icons/md";
import { Button, Tooltip, ClickAwayListener } from "@material-ui/core";
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

// Styling for desktop sidebar
const StyledSidebar = styled.div`
    animation: slide-in 0.25s;
    background: #fcfcfc;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
    height: 100vh;
    width: 92px;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    .logo {
        margin: 40px 0 8vh 0;
        img {
            width: 62px;
        }
    }
    .tabs {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .button {
        margin: 5px 0;
        .icon {
            width: 32px;
            height: 32px;
            color: #444;
            opacity: 0.8;
            transition: opacity 0.25s;
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
const MENU_HEIGHT = "240px";
const StyledHamburger = styled.div`
    position: fixed;
    .hamburgerButton {
        margin: 20px;
        padding: 8px 0;
        .hamburger {
            transform: rotate(90deg);
            height: 38px;
            width: 38px;
            color: #1d1d1d;
        }
    }
    .expanded {
        cursor: pointer;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.15);
        .container {
            cursor: auto;
            background: white;
            height: ${MENU_HEIGHT};
            overflow: hidden;
            box-shadow: 0 4px 4px -3px rgba(0, 0, 0, 0.15);
            .item {
                margin: 8px 20px;
                .button {
                    padding: 10px 20px;
                    width: 100%;
                    display: flex;
                    justify-content: left;
                    .icon {
                        height: 26px;
                        width: 26px;
                        color: #1d1d1d;
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
            height: ${MENU_HEIGHT};
            transition: height 250ms;
        }
    }
    .expanded-exit {
        background: rgba(0, 0, 0, 0.15);
        cursor: auto;
        .container {
            height: ${MENU_HEIGHT};
        }
    }
    .expanded-exit-active {
        background: rgba(0, 0, 0, 0);
        transition: background 250ms;
        cursor: auto;
        .container {
            height: 0;
            transition: height 250ms;
        }
    }
`;

function Sidebar() {
    const [isMobile, setMobile] = useState();
    const [isExpanded, setExpanded] = useState();

    // Populating isMobile state
    useEffect(() => {
        function onResize() {
            setMobile(window.innerWidth < 620);
        }
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    // Closing menu when transitioning from desktop to mobile
    useEffect(() => {
        setExpanded(false);
    }, [isMobile]);

    if (isMobile) {
        // Return mobile
        return (
            <StyledHamburger isExpanded={isExpanded}>
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
                                {/* Metrics */}
                                <Link href="/">
                                    <div className="item">
                                        <Button className="button">
                                            <FiPieChart className="icon" />
                                            <p>Metrics</p>
                                        </Button>
                                    </div>
                                </Link>
                                {/* Finances */}
                                <div className="item">
                                    <Button disableRipple className="button disabled">
                                        <MdAttachMoney className="icon" />
                                        <p>Finances</p>
                                    </Button>
                                </div>
                                {/* Admin panel */}
                                <Link href="/admin">
                                    <div className="item">
                                        <Button className="button">
                                            <FiEdit2 className="icon" />
                                            <p>Admin Panel</p>
                                        </Button>
                                    </div>
                                </Link>
                                {/* Log out */}
                                <Link href="/login">
                                    <div className="item">
                                        <Button className="button">
                                            <FiLogOut className="icon" />
                                            <p>Log Out</p>
                                        </Button>
                                    </div>
                                </Link>
                            </div>
                        </ClickAwayListener>
                    </div>
                </CSSTransition>
            </StyledHamburger>
        );
    } else if (!isMobile && isMobile !== undefined) {
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
                    {/* Metrics */}
                    <Link href="/">
                        <Tooltip title="Metrics" arrow placement="right">
                            <Button className="button">
                                <FiPieChart className="icon" />
                            </Button>
                        </Tooltip>
                    </Link>
                    {/* Finances */}
                    <Link href="/finances">
                        <Tooltip title="Finances" arrow placement="right">
                            <Button disableRipple className="button disabled">
                                <MdAttachMoney className="icon" />
                            </Button>
                        </Tooltip>
                    </Link>
                    {/* Admin panel */}
                    <Link href="/admin">
                        <Tooltip title="Admin panel" arrow placement="right">
                            <Button className="button">
                                <FiEdit2 className="icon" />
                            </Button>
                        </Tooltip>
                    </Link>
                </div>
                {/* Logout */}
                <Link href="/login">
                    <Tooltip title="Log out" arrow placement="right">
                        <Button className="button">
                            <FiLogOut className="icon" />
                        </Button>
                    </Tooltip>
                </Link>
            </StyledSidebar>
        );
    } else {
        return null;
    }
}

export default Sidebar;
