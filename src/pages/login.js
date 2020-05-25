import Head from "next/head";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Button, Fade } from "@material-ui/core";
import { gql, useMutation } from "@apollo/client";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useRouter } from "next/router";

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
            .input {
                display: flex;
                align-items: center;
                margin: 12px 20px 20px 0;
                position: relative;
                input {
                    box-sizing: border-box;
                    max-width: 358px;
                    -webkit-appearance: none;
                    padding: 0 7px;
                    height: 34px;
                    width: 100%;
                    background: #fcfcfc;
                    border: 2px solid #eee;
                    border-radius: 3px;
                    outline: none;
                }
                .visibleButton {
                    margin-left: -36px;
                    border-radius: 0 !important;
                    color: #ccc;
                    min-width: 30px !important;
                    max-height: 30px !important;
                }
            }
            .submit {
                display: flex;
                align-items: center;
                .teamMember {
                    margin-left: 10px;
                    color: #888;
                    text-decoration: none;
                    font-size: 0.85em;
                }
                .teamMember:hover {
                    text-decoration: underline;
                }
            }
            .alert {
                position: absolute;
                bottom: 30px;
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

//Mutation for login
const LOGIN = gql`
    mutation login($password: String!) {
        login(password: $password) {
            id
            isAdmin
        }
    }
`;

function Login() {
    // State to determine whether to render for mobile or not
    const [isMobile, setMobile] = useState(true);
    // Mutation to login
    const [login, { data }] = useMutation(LOGIN);
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState();
    // Router
    const router = useRouter();

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

    // Called on login
    const onSubmit = () => {
        console.log(password);

        // Calling mutation
        login({
            variables: {
                password: password,
            },
        })
            // Successfully logged in
            .then((data) => {
                console.log("Success!");
                console.log(data);
                router.push("/");
            })
            // Error logging in
            .catch((e) => {
                if (error) {
                    setError(undefined);
                    setTimeout(() => {
                        setError(e.message.substring(15));
                    }, 125);
                } else {
                    setError(e.message.substring(15));
                }
            });
    };

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
                    {/* Password input */}
                    <div className="input">
                        <input
                            type={visible ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* Visibility on/off */}
                        <Button
                            onClick={() => setVisible(!visible)}
                            className="visibleButton"
                            size="small"
                        >
                            {visible ? <VisibilityOff /> : <Visibility />}
                        </Button>
                    </div>
                    <div className="submit">
                        <Button onClick={onSubmit} variant="outlined" size="small" color="primary">
                            Login
                        </Button>
                        <a href="" className="teamMember">
                            team member?
                        </a>
                    </div>
                    {/* Error alert */}
                    <Fade in={error !== undefined} timeout={250}>
                        <Alert severity="error" className="alert">
                            {error}
                        </Alert>
                    </Fade>
                </div>
            </div>
        </StyledLogin>
    );
}

export default Login;
