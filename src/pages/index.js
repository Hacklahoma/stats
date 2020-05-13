import Router from "next/router";

function Overall() {
    React.useEffect(() => {
        Router.replace("/login", { shallow: true });
    }, []);
    return <div className="container">Dashboard</div>;
}

export default Overall;
