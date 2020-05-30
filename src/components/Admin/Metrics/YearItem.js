import styled from "styled-components";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { useState } from "react";

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
        padding: 10px;
        font-weight: bold;
        font-size: 2em;
        ${(props) => props.locked && "color: rgb(244, 68 ,54)"};
    }
    .lock {
        padding: 10px 15px;
        color: #aaa;
        cursor: pointer;
    }
`;

function YearItem({ year }) {
    const [locked, setLocked] = useState(false);
    return (
        <StyledYearItem locked={locked}>
            <p>{year}</p>
            {locked ? (
                <FaLock className="lock" onClick={() => setLocked(false)} />
            ) : (
                <FaLockOpen className="lock" onClick={() => setLocked(true)} />
            )}
        </StyledYearItem>
    );
}

export default YearItem;
