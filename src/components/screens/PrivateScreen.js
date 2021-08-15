import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import { capitalize } from '../../utils/'

const PrivateScreen = ({ history }) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    const [user, setUser] = useState('')

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        history.push('/login')
    }



    useEffect(() => {
        const fetchPrivateDate = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };

            try {
                const { data } = await axios.get("/api/private", config);

                setPrivateData(data.data);
                setUser(data.user)
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }
        };

        fetchPrivateDate();
    }, [history]);

    return error ? (
        <span className="error-message">{error}</span>
    ) : (
        <>
            <h1>{`Welcome ${user.email}`}</h1>
            <h1>{user.username && `Welcome ${capitalize(user.username)}`}</h1>
            <div style={{ background: "green", color: "white" }}>{privateData}</div>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
};

export default PrivateScreen;