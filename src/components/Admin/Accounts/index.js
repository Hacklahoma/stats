import styled from "styled-components";
import { FiActivity, FiPlus } from "react-icons/fi";
import { Button } from "@material-ui/core";
import { useState } from "react";
import AddAccount from "../../Dialogs/AddAccount";
import CompanyTable from "./CompanyTable";

const StyledAccounts = styled.div`
    .buttons {
        z-index: 101;
        position: absolute;
        top: 52px;
        right: 30px;
        .icon {
            padding: 8px;
            min-width: unset;
            svg {
                width: 24px;
                height: 24px;
            }
        }
        .add {
            margin-right: 10px;
        }
    }
    table {
        margin-top: 30px;
        border-collapse: collapse;
        width: 100%;
        tr {
            th {
                border-bottom: 1px solid #ebebeb;
                text-align: left;
                padding: 5px 0;
            }
            td {
                padding: 10px 0;
            }
        }
        tr:nth-child(odd) {
            td {
                background: #f4f4f4;
            }
        }
    }
    @media only screen and (max-width: 619px) {
        .buttons {
            position: fixed;
            top: 17px;
        }
    }
`;

function Accounts() {
    const [modal, setModal] = useState();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function createData(name, status, views) {
        return { name, status, views };
    }

    const data = [
        createData("Boeing", "disabled", 6),
        createData("Tailwind", "enabled", 9),
        createData("JPMorgan & Chase Co.", "disabled", 16),
        createData("Northrop Grumman", "enabled", 3),
        createData("Microsoft", "enabled", 16),
    ];

    return (
        <StyledAccounts>
            {/* Add account Dialog */}
            <AddAccount
                name={name}
                setName={setName}
                password={password}
                setPassword={setPassword}
                setModal={setModal}
                open={modal === "add"}
            />
            {/* Add and Activity buttons */}
            <div className="buttons">
                <Button onClick={() => setModal("add")} className="icon add" size="small">
                    <FiPlus />
                </Button>
                <Button onClick={() => setModal("activity")} className="icon activity" size="small">
                    <FiActivity />
                </Button>
            </div>
            {/* Table of company accounts */}
            <CompanyTable rows={data} />
        </StyledAccounts>
    );
}

export default Accounts;
