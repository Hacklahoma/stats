import Head from "next/head";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Button } from "@material-ui/core";
import Link from "next/link";

const StyledLogin = styled.div`
    display: flex;
    .logo {
        animation: slide-in 0.2s;
        position: absolute;
        z-index: 1;
        top: 50px;
        left: 40px;
        display: flex;
        align-items: center;
        img {
            margin-right: 10px;
            width: 55px;
        }
    }
    .left {
        background: #fcfcfc;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.12);
        height: 100vh;
        width: 40vw;
        max-width: 450px;
        display: flex;
        justify-items: center;
        align-items: center;
        .content {
            padding: 40px;
            margin-top: ${(props) => (props.isMobile ? "-13vh" : "0")};
            transition: margin-top 0.2s;
            p {
                margin-top: 10px;
            }
        }
    }
    .left-enter {
        margin-left: -40vw;
    }
    .left-enter-active {
        margin-left: 0;
        transition: margin-left 0.2s;
    }
    .left-exit {
        margin-left: 0;
    }
    .left-exit-active {
        margin-left: -40vw;
        transition: margin-left 0.2s;
    }
    .right {
        height: ${(props) => (props.isMobile ? "87vh" : "100vh")};
        transition: height 0.2s;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .content {
            margin: 0 50px;
            h2 {
                font-size: 1.7em;
            }
            input {
                box-sizing: border-box;
                max-width: 358px;
                -webkit-appearance: none;
                height: 34px;
                width: 100%;
                padding: 0 7px;
                margin: 12px 20px 20px 0;
                background: #fcfcfc;
                border: 2px solid #eee;
                border-radius: 3px;
                outline: none;
            }
            .submit {
                display: flex;
                align-items: center;
                .teamMember {
                    margin-left: 10px;
                    color: #888;
                    text-decoration: none;
                    font-size: .85em;
                }
                .teamMember:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    @keyframes slide-in {
        0% {
            opacity: 0;
            transform: translateX(-100px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

function Login() {
    // State to determine whether to render for mobile or not
    const [isMobile, setMobile] = useState(true);

    // Resize listener to set mobile on render
    useEffect(() => {
        function handleResize() {
            setMobile(window.innerWidth < 720);
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <StyledLogin isMobile={isMobile}>
            <Head>
                <title>Statistics • Login</title>
            </Head>

            <div className="logo">
                <img src="/images/logo192.png" alt="" />
                <h2>Statistics</h2>
            </div>

            <CSSTransition in={!isMobile} timeout={200} classNames="left" unmountOnExit>
                <div className="left">
                    <div className="content">
                        <h2>Hacklahoma’s statistics at your fingertips.</h2>
                        <p>
                            We provide all sponsors with statistics of our attendees. Reach out to
                            your Liaison for a password.
                        </p>
                    </div>
                </div>
            </CSSTransition>

            <div className="right">
                <div className="content">
                    <h2>Enter your password to get started:</h2>
                    <input type="password" />
                    <div className="submit">
                        <Link href="/">
                            <Button variant="outlined" size="small" color="primary">
                                Login
                            </Button>
                        </Link>
                        <a href="" className="teamMember">
                            team member?
                        </a>
                    </div>
                </div>
            </div>
        </StyledLogin>
    );
}

export default Login;
