import styled from "styled-components";
import { lineWidth, colors, lineOptions } from "../utils";
import { Line } from "react-chartjs-2";
import { Grid } from "@material-ui/core";

const StyledLineGraph = styled.div`
    border: 3px solid #f7f7f7;
    border-radius: 12px;
    padding: 25px;
    min-height: 205px;
    max-height: 205px;
    box-shadow: 2px 3px 9px rgba(0, 0, 0, 0.05);

    h3 {
    }

    @media only screen and (max-width: 619px) {
        flex-direction: column;
        align-items: center;
        padding: 30px 0;
        min-height: none;
        max-height: none;
    }
`;

function PieGraph({ data, label, labels, title }) {
    return (
        <Grid item>
            <StyledLineGraph>
                <h3>{title}</h3>
                <Line
                    width={lineWidth}
                    height={lineWidth / 3.2}
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: label,
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(75,192,192,0.4)",
                                borderColor: colors()[1],
                                borderCapStyle: "butt",
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: "miter",
                                pointBorderColor: colors()[0],
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 2,
                                pointHoverRadius: 10,
                                pointHoverBackgroundColor: colors()[0],
                                pointHoverBorderColor: colors()[0],
                                pointHoverBorderWidth: 2,
                                pointRadius: 5,
                                pointHitRadius: 20,
                                data: data,
                            },
                        ],
                    }}
                    options={{
                        ...lineOptions,
                    }}
                />
            </StyledLineGraph>
        </Grid>
    );
}

export default PieGraph;
