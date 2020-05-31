import styled from "styled-components";
import MetricPage from "../components/MetricPage";
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { useState } from "react";

const StyledHome = styled.div`
    width: calc(100vw - 92px);
    margin-left: 92px;
    padding: 30px;
    .title {
        font-weight: 900;
    }
    .yearSelect {
        min-width: 150px;
        position: absolute;
        top: 30px;
        right: 30px;
        z-index: 100;
    }
    @media only screen and (max-width: 619px) {
        width: 100vw;
        margin: 75px 20px;
        padding: 0;
        .yearSelect {
            position: fixed;
            top: 17px;
            right: 20px;
        }
    }
`;

function Home({ user }) {
    const [select, setSelect] = useState("");
    return (
        <StyledHome>
            <h1 className="title">Overall Metrics</h1>
            <FormControl size="small" variant="outlined" className="yearSelect">
                {select === "" && <InputLabel shrink={false}>Select a year</InputLabel>}
                <Select value={select} onChange={(e) => setSelect(e.target.value)}>
                    <MenuItem value="none">Overall</MenuItem>
                    <MenuItem value="2020">2020</MenuItem>
                    <MenuItem value="2019">2019</MenuItem>
                    <MenuItem value="2018">2018</MenuItem>
                </Select>
            </FormControl>
            <MetricPage />
        </StyledHome>
    );
}

export default Home;
