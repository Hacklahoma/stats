import styled from "styled-components";
import { useState } from "react";
import Accounts from "../components/Admin/Accounts";

const StyledAdmin = styled.div`
    position: relative;
    left: 92px;
    width: calc(100vw - 160px);
    padding: 55px 35px;
    transition: padding 0.25s;
    .tabs {
        display: flex;
        justify-content: space-between;
        max-width: 350px;
        .item {
            transition: color 250ms;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #b6b6b6;
        }
        .item.active {
            color: unset;
        }
        .item:hover {
            color: unset;
        }
    }

    @media only screen and (max-width: 619px) {
        width: auto;
        left: 0;
        margin-top: 50px;
        padding: 30px 35px;
        .tabs {
            max-width: 300px;
            .item {
                font-size: 1.3em;
            }
        }
    }
`;

function Admin({ user }) {
    // Holds active view, defaults to accounts
    const [view, setView] = useState("accounts");
    if (user.isAdmin)
        return (
            <StyledAdmin>
                <div className="tabs">
                    {/* Accounts */}
                    <h2
                        onClick={() => setView("accounts")}
                        className={`item ${view === "accounts" && `active`}`}
                    >
                        Accounts
                    </h2>
                    {/* Metrics */}
                    <h2
                        onClick={() => setView("metrics")}
                        className={`item ${view === "metrics" && `active`}`}
                    >
                        Metrics
                    </h2>
                    {/* Finances */}
                    <h2
                        onClick={() => setView("finances")}
                        className={`item ${view === "finances" && `active`}`}
                    >
                        Finances
                    </h2>
                </div>
                {view === "accounts" && <Accounts />}
            </StyledAdmin>
        );
    else
        return (
            <p
                style={{
                    position: "absolute",
                    top: "50vh",
                    left: "50vw",
                    transform: "translate(-50%, -50%)",
                }}
            >
                Restricted Access
            </p>
        );
}

export default Admin;
