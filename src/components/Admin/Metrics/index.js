import styled from "styled-components";
import { Button } from "@material-ui/core";
import { parse } from "papaparse";
import { useState } from "react";

const StyledMetrics = styled.div``;

function Metrics() {
    const onSubmit = () => {
        const file = document.getElementById("input").files[0];
        parse(file, {
            complete: function(results, file) {
                console.log(results);
            },
            header: true,
        });
    };

    return (
        <StyledMetrics>
            <br />
            <br />
            <input type="file" id="input" />
            <Button variant="outlined" size="small" onClick={onSubmit}>Submit</Button>
            <br />
            <br />
            <p>View the browser's console after submission for results</p>
        </StyledMetrics>
    );
}

export default Metrics;
