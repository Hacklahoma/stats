import styled from "styled-components";
import { pieWidth, colors, pieOptions } from "../utils";
import { Pie } from "react-chartjs-2";
import { Grid, Dialog, DialogTitle, DialogContent, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useState } from "react";

const StyledPieGraph = styled.div`
    border: 3px solid #f7f7f7;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    padding: 25px;
    min-height: 250px;
    max-height: 250px;
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
            font-size: 0.8em;
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
                        {Object.keys(majors).map((i) => {
                            return (
                                <p key={i}>
                                    <strong>{i}:</strong> {majors[i]}
                                </p>
                            );
                        })}
                    </DialogContent>
                </Dialog>

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
                                        <div style={{ background: colors()[i] }} className="box" />
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
                        onClick: (e, chart) => {
                            if (title !== "Majors") return;
                            // If majors, parse and show raw majors dialog
                            if (chart[0]) {
                                var index = chart[0]._index;
                                var counts = {};
                                
                                rawMajors[index].split(",").forEach(function(x) {
                                    counts[x] = (counts[x] || 0) + 1;
                                });

                                // Make obj into array
                                var sortable = [];
                                for (var i in counts) {
                                    sortable.push([i, counts[i]]);
                                }

                                // Sort array
                                sortable.sort(function(a, b) {
                                    return b[1] - a[1];
                                });

                                // Rebuild sorted array into object
                                var objSorted = {};
                                sortable.forEach(function(item) {
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
