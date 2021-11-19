import React from "react";
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../actions/auth';


const Logout = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const actionLogout = () => {
        dispatch(logout(null, history));
    };

    return (
        <>
            <Button variant="contained" href="#contained-buttons" style ={{ backgroundColor: 'red' }} onClick={actionLogout}>Logout</Button>
        </>
    )
}

export default Logout
