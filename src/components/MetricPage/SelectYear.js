/**
 * Displays the select year input on Metrics pages.
 */

import styled from "styled-components";
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";

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

const GET_YEARS = gql`
    query Years {
        allYears(sortBy: year_DESC) {
            id
            year
            disabled
        }
    }
`;

function SelectYear({ setYearId, year, yearId, setYear }) {
    const { loading, data } = useQuery(GET_YEARS);

    /*
     * Sets states based on input
     * e.target.value is formatted as ID:YEAR
     */
    const handleChange = (e) => {
        if (e.target.value == "") {
            setYearId(0);
            setYear("");
        } else {
            setYearId(e.target.value.split(":")[0]);
            setYear(e.target.value.split(":")[1]);
        }
    };

    return (
        <StyledSelectYear>
            <FormControl size="small" variant="outlined" className="yearSelect">
                {yearId === 0 && <InputLabel shrink={false}>Select a year</InputLabel>}
                <Select value={yearId !== 0 ? `${yearId}:${year}` : ""} onChange={handleChange}>
                    <MenuItem value="">Overall</MenuItem>
                    {!loading &&
                        data.allYears.map((row) => {
                            if(row.disabled) {
                                return;
                            }
                            return (
                                <MenuItem key={row.id} value={`${row.id}:${row.year}`}>
                                    {row.year}
                                </MenuItem>
                            );
                        })}
                </Select>
            </FormControl>
        </StyledSelectYear>
    );
}

export default SelectYear;
