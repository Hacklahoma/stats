import styled from "styled-components";
import Link from "next/link";
import Router from "next/router";
import { FiPieChart, FiEdit2, FiLogOut } from "react-icons/fi";
import { MdAttachMoney } from "react-icons/md";
import { Button, Tooltip } from "@material-ui/core";

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

function Sidebar() {
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
                <Tooltip title="Finances" arrow placement="right">
                    <Button disableRipple className="button disabled">
                        <MdAttachMoney className="icon" />
                    </Button>
                </Tooltip>
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
}

export default Sidebar;
