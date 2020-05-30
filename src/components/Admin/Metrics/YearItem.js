import styled from "styled-components";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { useState } from "react";
import { Button } from "@material-ui/core";

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
        transition: color .25s;
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

function YearItem({ year }) {
    const [locked, setLocked] = useState(false);
    return (
        <StyledYearItem locked={locked}>
            <p>{year}</p>
            <Button className="lock" onClick={() => setLocked(!locked)}>
                {locked ? <FaLock className="icon" /> : <FaLockOpen className="icon" />}
            </Button>
        </StyledYearItem>
    );
}

export default YearItem;
