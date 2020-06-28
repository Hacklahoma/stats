import styled from "styled-components";
import { pieWidth, colors, pieOptions } from "../utils";
import { Pie } from "react-chartjs-2";
import { Grid } from "@material-ui/core";

const StyledPieGraph = styled.div`
    border: 3px solid #f7f7f7;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    padding: 25px;
    min-height: 205px;
    max-height: 205px;
    box-shadow: 2px 3px 9px rgba(0, 0, 0, 0.05);
    .left {
        display: flex;
        flex-direction: column;
        padding: 0 20px 0 0;
        h3 {
            margin-bottom: 10px;
        }
        .subtitle {
            font-weight: normal;
            font-size: .8em;
            margin-bottom: 8px;
            margin-top: -8px;
        }
        ul {
            margin-left: 2px;
            li {
                color: #555;
                list-style: none;
                .box {
                    height: 12px;
                    width: 20px;
                    float: left;
                    margin: 4px 12px 0 0;
                }
            }
        }
    }

    @media only screen and (max-width: 619px) {
        flex-direction: column;
        align-items: center;
        padding: 30px 0;
        min-height: none;
        max-height: none;
        .left {
            min-width: 90%;
            max-width: 90%;
            padding: 0 0 30px 0;
        }
    }
`;

function PieGraph({ data, labels, title, subtitle }) {
    return (
        <Grid item>
            <StyledPieGraph>
                <div className="left">
                    <h3>
                        {title}
                        {subtitle && <span className="subtitle"> ({subtitle})</span>}
                    </h3>
                    <ul>
                        {labels.map((label, i) => {
                            if (label === "Prefer not to answer")
                                return (
                                    <li key={i}>
                                        <div
                                            style={{
                                                background: colors()[colors().length - 1],
                                            }}
                                            className="box"
                                        />
                                        {label}
                                    </li>
                                );
                            else
                                return (
                                    <li key={i}>
                                        <div
                                            style={{ background: colors()[i] }}
                                            className="box"
                                        />
                                        {label}
                                    </li>
                                );
                        })}
                    </ul>
                </div>
                <Pie
                    width={pieWidth}
                    height={pieWidth}
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                data: data,
                                backgroundColor: colors(
                                    labels.indexOf("Prefer not to answer") !== -1
                                        ? labels.length - 1
                                        : null
                                ),
                                borderWidth: 0,
                            },
                        ],
                    }}
                    options={{
                        ...pieOptions,
                    }}
                />
            </StyledPieGraph>
        </Grid>
    );
}

export default PieGraph;
