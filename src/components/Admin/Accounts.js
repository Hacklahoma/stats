import styled from "styled-components";
import { FiActivity, FiPlus } from "react-icons/fi";
import { Button } from "@material-ui/core";

const StyledAccounts = styled.div`
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
        .add {
            margin-right: 10px;
        }
    }
    table {
        margin-top: 30px;
        border-collapse: collapse;
        width: 100%;
        tr {
            th {
                border-bottom: 1px solid #ebebeb;
                text-align: left;
                padding: 5px 0;
            }
            td {
                padding: 10px 0;
            }
        }
        tr:nth-child(odd) {
            td {
                background: #f4f4f4;
            }
        }
    }
    @media only screen and (max-width: 619px) {
        .buttons {
            position: fixed;
            top: 17px;
        }
    }
`;

function Accounts() {
    return (
        <StyledAccounts>
            <div className="buttons">
                <Button className="icon add" size="small">
                    <FiPlus />
                </Button>
                <Button className="icon activity" size="small">
                    <FiActivity />
                </Button>
            </div>
            <table>
                <tr>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Views</th>
                </tr>
                <tr>
                    <td>Boeing</td>
                    <td>disabled</td>
                    <td>24</td>
                </tr>
                <tr>
                    <td>Tailwind</td>
                    <td>enabled</td>
                    <td>12</td>
                </tr>
                <tr>
                    <td>JPMorgan Chase & Co.</td>
                    <td>enabled</td>
                    <td>34</td>
                </tr>
                <tr>
                    <td>Northrop Grumman</td>
                    <td>enabled</td>
                    <td>51</td>
                </tr>
                <tr>
                    <td>Microsoft</td>
                    <td>enabled</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>Microsoft</td>
                    <td>enabled</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>Microsoft</td>
                    <td>enabled</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>Microsoft</td>
                    <td>enabled</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>Microsoft</td>
                    <td>enabled</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>Microsoft</td>
                    <td>enabled</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>Microsoft</td>
                    <td>enabled</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>Microsoft</td>
                    <td>enabled</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>Microsoft</td>
                    <td>enabled</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>Microsoft</td>
                    <td>enabled</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>Microsoft</td>
                    <td>enabled</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>Microsoft</td>
                    <td>enabled</td>
                    <td>5</td>
                </tr>
            </table>
        </StyledAccounts>
    );
}

export default Accounts;
