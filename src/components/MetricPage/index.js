import styled from "styled-components";

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

function MetricPage({ year }) {
    return (
        <StyledMetricPage>
            <div className="topStats">
                <div className="item">
                    <p className="label">Total Hackers</p>
                    <p className="data">923</p>
                </div>
                <div className="item">
                    <p className="label">Total Projects</p>
                    <p className="data">127</p>
                </div>
                <div className="item">
                    <p className="label">Unique Hackers</p>
                    <p className="data">268</p>
                </div>
                <div className="item">
                    <p className="label">First Time Hackers</p>
                    <p className="data">438</p>
                </div>
            </div>
        </StyledMetricPage>
    );
}

export default MetricPage;
