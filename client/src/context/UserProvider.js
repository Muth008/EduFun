import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import {
    getUser,
    loginUser,
    logoutUser,
    registerUser,
    getProtected,
} from "../api/api";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const storeUser = async (data) => {
        setUser(data?.user);
        setToken(data?.token);
        localStorage.setItem("authToken", data?.token);
    }

    const login = async (email, password) => {
        const response = await loginUser({ email, password });
        console.log("login", response);

        storeUser(response?.data);
    };

    const logout = async () => {
        // const response = await logoutUser();
        // console.log("logout", response);
        storeUser(null);
    };

    const register = async (userData) => {
        const response = await registerUser(userData);
        console.log("register", response);
        storeUser(response?.data);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            setToken(storedToken);
            console.log("storedToken", storedToken);
            //get user by token
            getUser(storedToken).then((response) => {
                if (response.status === 401) {
                    localStorage.removeItem("authToken");
                    return;
                }
                setUser(response?.data);
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ token, user, login, logout, register }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
