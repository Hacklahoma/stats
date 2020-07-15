import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { Grid, Dialog, DialogTitle, DialogContent, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useState } from 'react';
import { pieWidth, getColors, pieOptions } from '../utils';

const StyledPieGraph = styled.div`
  border: 3px solid #f7f7f7;
  border-radius: 12px;
  box-shadow: 2px 3px 9px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  max-height: 250px;
  min-height: 250px;
  padding: 25px;

  .left {
    display: flex;
    flex-direction: column;
    padding: 0 20px 0 0;
    overflow-y: scroll;

    h3 {
      margin-bottom: 10px;
    }

    .subtitle {
      font-size: 0.8em;
      font-weight: normal;
      margin-bottom: 8px;
      margin-top: -8px;
    }

    ul {
      margin-left: 2px;

      li {
        color: #555;
        list-style: none;

        .box {
          float: left;
          height: 12px;
          margin: 4px 12px 0 0;
          width: 20px;
        }
      }
    }
  }

  @media only screen and (max-width: 619px) {
    align-items: center;
    flex-direction: column;
    max-height: none;
    min-height: none;
    padding: 30px 0;

    .left {
      max-width: 90%;
      min-width: 90%;
      padding: 0 0 30px;
    }
  }
`;

/**
 * PieGraph template that is used multiple times.
 *
 * @param {array} data Data to display
 * @param {array} rawMajors Only used for display majors, it's all
 * the raw data to display dialog of raw majors when clicking slice
 * @param {array} labels Labels for each data in array
 * @param {string} title Title for pie graph
 * @param {string} subtitle Subtitle for pie graph
 */
function PieGraph({ data, rawMajors, labels, title, subtitle }) {
  const [open, setOpen] = useState(false);
  const [majors, setMajors] = useState({});
  const [category, setCategory] = useState();
  return (
    <Grid item>
      <StyledPieGraph>
        {/* Dialog for showing raw majors */}
        <Dialog onClose={() => setOpen(false)} open={open}>
          <DialogTitle onClose={() => setOpen(false)}>
            <strong>{category}</strong>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {Object.keys(majors).map((i) => (
              <p key={i}>
                <strong>{i}: </strong>{majors[i]}
              </p>
            ))}
          </DialogContent>
        </Dialog>

        <div className="left">
          <h3>
            {title}{' '}
            {subtitle && <span className="subtitle">({subtitle})</span>}
          </h3>
          <ul>
            {labels.map((label, i) => {
              if (label === 'Prefer not to answer') {
                return (
                  <li key={`pie-graph-label-${i}`}>
                    <div
                      style={{
                        background: getColors()[getColors().length - 1],
                      }}
                      className="box"
                    />
                    {label}
                  </li>
                );
              }
              return (
                <li key={`pie-graph-label-${i}`}>
                  <div style={{ background: getColors()[i] }} className="box" />
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
            labels,
            datasets: [
              {
                data,
                backgroundColor: getColors(
                  labels.indexOf('Prefer not to answer') !== -1
                    ? labels.length - 1
                    : null,
                ),
                borderWidth: 0,
              },
            ],
          }}
          options={{
            ...pieOptions,
            onClick: (e, chart) => {
              if (title !== 'Majors') return;
              // If majors, parse and show raw majors dialog
              if (chart[0]) {
                const index = chart[0]._index;
                const counts = {};

                console.log(rawMajors);

                rawMajors[index].split(',').forEach((x) => {
                  counts[x] = (counts[x] || 0) + 1;
                });

                // Make obj into array
                const sortable = [];
                Object.keys(counts).forEach((i) => sortable.push([i, counts[i]]));

                // Sort array
                sortable.sort((a, b) => b[1] - a[1]);

                // Rebuild sorted array into object
                const objSorted = {};
                sortable.forEach((item) => {
                  objSorted[item[0]] = item[1];
                });

                setCategory(chart[0]._model.label);
                setMajors(objSorted);
                setOpen(true);
              }
            },
          }}
        />
      </StyledPieGraph>
    </Grid>
  );
}

export default PieGraph;
