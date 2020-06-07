import styled from "styled-components";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { gql, useMutation } from "@apollo/client";

const StyledYearItem = styled.div`
    border: 3px solid #eaeaea;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    float: left;
    /* min-width: 200px; */
    margin: 10px;
    p {
        padding: 10px 14px;
        font-weight: bold;
        font-size: 2em;
        transition: color 0.25s;
        ${(props) => props.locked && "color: rgb(244, 68 ,54)"};
    }
    .lock {
        margin: 8px;
        color: #aaa;
        min-width: 30px;
        cursor: pointer;
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

//Mutation for adding events
const ADD_EVENT = gql`
    mutation addEvent($token: String!, $type: String!, $description: String) {
        addEvent(token: $token, type: $type, description: $description) {
            id
            type
            description
        }
    }
`;

function YearItem({ row, refetch }) {
    refetch();
    const [locked, setLocked] = useState(row.disabled);
    const [addEvent, {eventData}] = useMutation(ADD_EVENT);
    const [updateYear] = useMutation(UPDATE_YEAR);

    const toggleLock = () => {
        updateYear({
            variables: {
                id: row.id,
                disabled: !locked,
            },
        })
            .then(() => {
                //Event logger
                addEvent({
                    variables: {
                        token: localStorage.getItem("token"),
                        type: (!locked ? "DISABLE_YEAR" : "ENABLE_YEAR"),
                        description: (!locked ? `${row.year} Disabled` : `${row.year} Enabled`),
                    },
                })
                    .then(() => {
                        //The event has been created
                    })
                    // Error logging
                    .catch((events) => {
                        console.log(e.message);
                    })
                
                setLocked(!locked)
            })
            .catch((error) => console.log(error.message));
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
