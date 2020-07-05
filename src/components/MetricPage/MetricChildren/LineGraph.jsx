import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Grid } from '@material-ui/core';
import { lineWidth, getColors, lineOptions } from '../utils';

const StyledLineGraph = styled.div`
    border: 3px solid #f7f7f7;
    border-radius: 12px;
    box-shadow: 2px 3px 9px rgba(0, 0, 0, 0.05);
    max-height: 205px;
    min-height: 205px;
    padding: 25px;

    h3 {
    }

    @media only screen and (max-width: 619px) {
      align-items: center;
      flex-direction: column;
      max-height: none;
      min-height: none;
      padding: 30px 0;
    }
`;

/**
 * LineGraph template that is used multiple times.
 *
 * @param {array} data Data to display
 * @param {array} labels X-axis labels for each data in array
 * @param {array} label What to call the data that is graphed
 * (ex: hackers, projects, etc.)
 * @param {string} title Title for pie graph
 *
 */
function PieGraph({ data, label, labels, title }) {
  return (
    <Grid item>
      <StyledLineGraph>
        <h3>{title}</h3>
        <Line
          width={lineWidth}
          height={lineWidth / 3.2}
          data={{
            labels,
            datasets: [
              {
                label,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: getColors()[1],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: getColors()[0],
                pointBackgroundColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 10,
                pointHoverBackgroundColor: getColors()[0],
                pointHoverBorderColor: getColors()[0],
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                pointHitRadius: 20,
                data,
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
