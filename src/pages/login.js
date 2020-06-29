import Head from "next/head";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Button, Fade, CircularProgress } from "@material-ui/core";
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
    mutation login($password: String, $code: String) {
        login(password: $password, code: $code) {
            id
            token
        }
    }
`;

//Mutation for adding events
const ADD_EVENT = gql`
    mutation addEvent($id: ID!, $type: String!, $description: String) {
        addEvent(id: $id, type: $type, description: $description) {
            id
        }
    }
`;

function Login() {
    // State to determine whether to render for mobile or not
    const [isMobile, setMobile] = useState(true);
    // Mutation to login
    const [login, { data }] = useMutation(LOGIN);
    //Mutation to add an event
    const [addEvent] = useMutation(ADD_EVENT);
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(false);
    // Router
    const router = useRouter();

    // Resize listener to set mobile on render
    useEffect(() => {
        //Check to see if the param code is included
        if (router.asPath.includes("code=")) {
            const params = new URLSearchParams(window.location.search);

            setAlert({ severity: "info", message: "Checking validity..." });

            //Login mutation
            login({
                variables: {
                    code: params.get("code"),
                },
            })
                // Successfully logged in
                .then((snapshot) => {
                    // Set token to local storage
                    localStorage.setItem("token", snapshot.data.login.token);

                    setAlert({ severity: "success", message: "Logging you in homie..." });

                    //Event logger
                    addEvent({
                        variables: {
                            id: snapshot.data.login.id,
                            type: "LOGIN",
                            description: "Slack Login",
                        },
                    });
                    // Push to dashboard and force reload
                    setTimeout(() => {
                        router.push("/").then(() => location.reload());
                    }, 500);
                })
                // Error logging in
                .catch((e) => {
                    if (alert) {
                        setAlert({});
                        setTimeout(() => {
                            setAlert({ severity: "error", message: e.message });
                        }, 125);
                    } else {
                        setAlert({ severity: "error", message: e.message });
                    }
                });
        } else if (router.asPath.includes("?logout")) {
            setAlert({ severity: "success", message: "Successfully logged you out." });

            setTimeout(() => {
                setAlert({});
            }, 2000);
        } else if (router.asPath.includes("error=")) {
            setAlert({ severity: "error", message: "Unable to log you in, try again." });
        }
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
    const onSubmit = (e) => {
        event.preventDefault();
        event.stopPropagation();

        setLoading(true);

        // Calling mutation
        login({
            variables: {
                password: password,
            },
        })
            // Successfully logged in
            .then((snapshot) => {
                // Set token to local storage
                localStorage.setItem("token", snapshot.data.login.token);

                //Event logger
                addEvent({
                    variables: {
                        id: snapshot.data.login.id,
                        type: "LOGIN",
                        description: "Company Login",
                    },
                });
                // Push to dashboard and force reload
                setTimeout(
                    () =>
                        router.push("/").then(() => {
                            setLoading(false);
                        }),
                    500
                );
            })
            // Error logging in
            .catch((e) => {
                setLoading(false);
                if (alert) {
                    setAlert({});
                    setTimeout(() => {
                        setAlert({ severity: "error", message: e.message });
                    }, 125);
                } else {
                    setAlert({ severity: "error", message: e.message });
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
                <form onSubmit={onSubmit} className="content">
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
                        <Button
                            onClick={onSubmit}
                            variant="outlined"
                            size="small"
                            color="primary"
                            endIcon={loading ? <CircularProgress size={14} /> : null}
                        >
                            Login
                        </Button>
                        <a
                            href={`https://slack.com/oauth/authorize?scope=identity.basic&client_id=${process.env.SLACK_CLIENT_ID}`}
                            className="teamMember"
                        >
                            team member?
                        </a>
                    </div>
                    {/* Alerts */}
                    <Fade in={alert.message !== undefined} timeout={0}>
                        <Alert severity={alert.severity} className="alert">
                            {alert.message}
                        </Alert>
                    </Fade>
                </form>
            </div>
        </StyledLogin>
    );
}

export default Login;
