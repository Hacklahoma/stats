import styled from "styled-components";
import { pieWidth, pieColors, pieOptions } from "../constants";
import { Pie } from "react-chartjs-2";
import { Grid } from "@material-ui/core";

const StyledPieGraph = styled.div`
    border: 3px solid #eee;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    padding: 25px;
    .left {
        display: flex;
        flex-direction: column;
        padding: 0 20px 0 0;
        h3 {
            margin-bottom: 12px;
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
        border: none;
        border-radius: 0;
        border-top: 3px solid #eee;
        flex-direction: column;
        align-items: center;
        padding: 40px 0 20px 0;
        .left {
            min-width: 90%;
            max-width: 90%;
            padding: 0 0 30px 0;
        }
    }
`;

function PieGraph({ data, labels, title }) {
    return (
        <Grid item>
            <StyledPieGraph>
                <div className="left">
                    <h3>{title}</h3>
                    <ul>
                        {labels.map((label, i) => {
                            if (label === "Prefer not to answer")
                                return (
                                    <li>
                                        <div
                                            style={{
                                                background: pieColors()[pieColors().length - 1],
                                            }}
                                            className="box"
                                        />
                                        {label}
                                    </li>
                                );
                            else
                                return (
                                    <li>
                                        <div
                                            style={{ background: pieColors()[i] }}
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
                                backgroundColor: pieColors(
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
