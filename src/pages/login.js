import Head from "next/head";
import styled from "styled-components";

const StyledLogin = styled.div`
    .left {
        background: #fcfcfc;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.12);
        height: 100vh;
        width: 40vw;
        .container {
            .logo {
                display: flex;
                align-items: center;
                img {
                    width: 55px;
                }
            }
            .content {
                text-align: left;
            }
        }
    }
    .right {
    }
`;

function Login() {
    return (
        <StyledLogin>
            <Head>
                <title>Statistics • Login</title>
            </Head>
            <div className="left">
                <div className="container">
                    <div className="logo">
                        <img src="/images/logo192.png" alt="" />
                        <h2>Statistics</h2>
                    </div>
                    <div className="content">
                        <h2>Hacklahoma’s data at your fingertips.</h2>
                        <p>
                            We provide all sponsors with statistics of our audience and how we fund
                            our events.
                        </p>
                    </div>
                </div>
            </div>
            <div className="right"></div>
        </StyledLogin>
    );
}

export default Login;
