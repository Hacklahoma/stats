import styled from "styled-components";

const StyledFinances = styled.div`
    position: absolute;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
`;

function Finances() {
    return (
        <StyledFinances>
            <p>Work in progress...</p>
        </StyledFinances>
    );
}

export default Finances;
