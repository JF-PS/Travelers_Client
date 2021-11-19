import { useState } from 'react';
import userServices from "../services/UserServices";

const useUsers = () => {

    const [user, setUser] = useState({});

    const login = async (username, password) => {
        await userServices.signIn({ "username": username, "password": password }).then((user) => {
            setUser(user);
        });
    }

    return { login, user };
}

export default useUsers;