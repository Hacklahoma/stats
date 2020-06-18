/**
 * Page for Overall Metrics
 */

import styled from "styled-components";
import MetricPage from "../components/MetricPage";
import SelectYear from "../components/MetricPage/SelectYear";
import { useState } from "react";

const StyledHome = styled.div`
    width: calc(100vw - 92px);
    margin-left: 92px;
    padding: 30px;
    .title {
        font-weight: 900;
    }
    @media only screen and (max-width: 619px) {
        width: 100vw;
        margin: 75px 20px;
        padding: 0;
    }
`;

function Home({ user }) {
    const [year, setYear] = useState("");
    const [yearId, setYearId] = useState(0);
    return (
        <StyledHome>
            <h1 className="title">{year === "" ? "Overall" : year} Metrics</h1>
            <SelectYear setYearId={setYearId} setYear={setYear} yearId={yearId} year={year} />
            <MetricPage user={user} yearId={yearId} year={year} />
        </StyledHome>
    );
}

export default Home;
