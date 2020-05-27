import styled from "styled-components";

const StyledHome = styled.div`
    text-align: center;
`;

function Home({ user }) {
    return (
        <StyledHome>
            <p>Home</p>
            <p>Hello, {user.company}</p>
        </StyledHome>
    );
}

export default Home;
