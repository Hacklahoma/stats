import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useState } from "react";
import AddYear from "../../Dialogs/AddYear";
import { FiPlus } from "react-icons/fi";
import YearItem from "./YearItem";
import { gql, useQuery } from "@apollo/client";

const StyledMetrics = styled.div`
    .buttons {
        z-index: 101;
        position: absolute;
        top: 52px;
        right: 30px;
        .icon {
            padding: 8px;
            min-width: unset;
            svg {
                width: 24px;
                height: 24px;
            }
        }
    }
    .years {
        width: 100%;
        margin-top: 40px;
    }

    @media only screen and (max-width: 619px) {
        .buttons {
            position: fixed;
            top: 17px;
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

function Metrics() {
    const [modal, setModal] = useState();
    // Getting years
    const { loading, error, data, refetch } = useQuery(GET_YEARS);

    return (
        <StyledMetrics>
            {/* Add account Dialog */}
            <AddYear setModal={setModal} refetch={refetch} open={modal === "add"} />
            {/* Add and Activity buttons */}
            <div className="buttons">
                <Button onClick={() => setModal("add")} className="icon add" size="small">
                    <FiPlus />
                </Button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="years">
                    {data.allYears.map((row) => {
                        return <YearItem refetch={refetch} row={row} />;
                    })}
                </div>
            )}
        </StyledMetrics>
    );
}

export default Metrics;
