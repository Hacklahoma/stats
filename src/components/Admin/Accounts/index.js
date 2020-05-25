import styled from "styled-components";
import { FiActivity, FiPlus } from "react-icons/fi";
import { Button } from "@material-ui/core";
import { useState } from "react";
import AddAccount from "../../Dialogs/AddAccount";
import CompanyTable from "./CompanyTable";
import { gql, useQuery } from "@apollo/client";

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

const GET_USERS = gql`
    query Users {
        allUsers(sortBy: id_ASC) {
            id
            company
            password
            disabled
            isAdmin
        }
    }
`;

function Accounts() {
    // Modal to display
    const [modal, setModal] = useState();
    // Getting users
    const { loading, error, data, refetch } = useQuery(GET_USERS);

    // Display error if necessary
    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <StyledAccounts>
            {/* Add account Dialog */}
            <AddAccount setModal={setModal} refetch={refetch} open={modal === "add"} />
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
            {loading ? <p>Loading...</p> : <CompanyTable refetch={refetch} rows={data.allUsers} />}
        </StyledAccounts>
    );
}

export default Accounts;
