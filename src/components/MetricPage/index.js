import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

const StyledMetricPage = styled.div`
    margin-top: 20px;
    .topStats {
        max-width: calc(100vw - 20px);
        .item {
            display: inline-block;
            padding: 0 20px 5px 0;
            .label {
                font-size: 0.85em;
            }
            .data {
                font-size: 1.6em;
                font-weight: bold;
            }
        }
        .item:first-child {
            margin-left: 0;
        }
    }
    @media only screen and (max-width: 619px) {
    }
`;

const YEAR_DATA = gql`
    query Year($id: ID!) {
        Year(where: { id: $id }) {
            _hackersMeta {
                count
            }
        }
    }
`;

function MetricPage({ year, yearId }) {
    const { loading, error, data, refetch } = useQuery(YEAR_DATA, {
        variables: {
            id: yearId,
        },
    });

    return (
        <StyledMetricPage>
            {!loading && (
                <div className="topStats">
                    <div className="item">
                        <p className="label">Total Hackers</p>
                        {year !== "" && <p className="data">{data.Year._hackersMeta.count}</p>}
                    </div>
                    <div className="item">
                        <p className="label">Total Projects</p>
                        <p className="data"></p>
                    </div>
                    <div className="item">
                        <p className="label">Unique Hackers</p>
                        <p className="data"></p>
                    </div>
                    <div className="item">
                        <p className="label">First Time Hackers</p>
                        <p className="data"></p>
                    </div>
                </div>
            )}
        </StyledMetricPage>
    );
}

export default MetricPage;
