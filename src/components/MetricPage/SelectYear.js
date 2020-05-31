/**
 * Displays the select year input on Metrics pages.
 */

import styled from "styled-components";
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";

const StyledSelectYear = styled.div`
    .yearSelect {
        min-width: 150px;
        position: absolute;
        top: 30px;
        right: 30px;
        z-index: 100;
    }
    @media only screen and (max-width: 619px) {
        .yearSelect {
            position: fixed;
            top: 17px;
            right: 20px;
        }
    }
`;

function SelectYear({ year, setYear }) {
    return (
        <StyledSelectYear>
            <FormControl size="small" variant="outlined" className="yearSelect">
                {year === "" && <InputLabel shrink={false}>Select a year</InputLabel>}
                <Select value={year} onChange={(e) => setYear(e.target.value)}>
                    <MenuItem value="">Overall</MenuItem>
                    <MenuItem value="2020">2020</MenuItem>
                    <MenuItem value="2019">2019</MenuItem>
                    <MenuItem value="2018">2018</MenuItem>
                </Select>
            </FormControl>
        </StyledSelectYear>
    );
}

export default SelectYear;
