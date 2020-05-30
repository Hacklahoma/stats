import styled from "styled-components";
import { Button } from "@material-ui/core";
import { parse } from "papaparse";
import { useState } from "react";
import AddYear from "../../Dialogs/AddYear";
import { FiPlus } from "react-icons/fi";
import YearItem from "./YearItem";

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
        background: red;
    }

    @media only screen and (max-width: 619px) {
        .buttons {
            position: fixed;
            top: 17px;
        }
    }
`;

function Metrics() {
    const [modal, setModal] = useState();
    const [loading, setLoading] = useState(false);

    return (
        <StyledMetrics>
            {/* Add account Dialog */}
            <AddYear setModal={setModal} refetch={null} open={modal === "add"} />
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
                    <YearItem year="2020" />
                    <YearItem year="2019" />
                    <YearItem year="2018" />
                </div>
            )}
        </StyledMetrics>
    );
}

export default Metrics;
