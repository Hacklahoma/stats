import styled from "styled-components";

const StyledMetrics = styled.div`
    text-align: center;
`;

function Metrics({ user }) {
    return (
        <StyledMetrics>
            <p>Metrics</p>
            <p>Hello, {user.company}</p>
        </StyledMetrics>
    );
}

export default Metrics;
