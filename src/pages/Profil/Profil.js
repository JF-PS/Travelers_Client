import React, { useState } from "react";
import Layout from '../../components/Layout/Layout'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SettingsIcon from '@mui/icons-material/Settings';
import './style.css'
import NavBar from '../../components/NavBar/NavBar';
import { useHistory } from 'react-router-dom';
// import Auth from '../../components/Account/Auth';
// import { useDispatch } from 'react-redux';
// import { logout } from '../../actions/auth';
// import { FormControlUnstyledContext } from "@mui/material";


const Profil = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log(user);
    const auth = (user) ? 'Se déconnecter' : 'Se connecter';

    // const dispatch = useDispatch();
    const history = useHistory();
    const setting = () => { history.push('/poc'); };

    // const actionLogout = () => {
    //     dispatch(logout(null, history));
    // };

    const handleAuth = () => {
        if(user)
            history.push('/logout');
        else
            history.push('/auth');
    }

    const purpleButton = {
        backgroundColor: '#A480A6',
        borderRadius: '16px',
        height: '130px',
        width: '100%',
        color: 'white',
        fontSize: '18px',
        fontWeight: '400',
        textTransform: 'none',
        boxShadow: '0 2px 5px 0 rgba(164, 128, 166, 0.8)'
    }

    const yellowButton = {
        backgroundColor: '#EBA701',
        borderRadius: '16px',
        height: '60px',
        width: '100%',
        color: 'white',
        fontSize: '18px',
        textTransform: 'none',
        fontWeight: '400',
        boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.2)'
    }

    return (
        <>
            <Layout>
                <Grid container>
                    <Grid item xs={12} style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div style={{width:'100px', height:'100px', borderRadius: '50px', backgroundColor: '#8F8FD9', display: 'flex', alignItems: 'center', marginBottom: '20px', marginTop: '30px'}}></div>
                        <h2 style={{fontWeight: 'bold', fontSize: '24px', color: '#8F8FD9', margin: '0'}}>
                            Bienvenue {(user) && (user.result.first_name)}
                        </h2>

                        <Button
                            variant="text"
                            href="#contained-buttons"
                            style={{textTransform: 'none', color: '#EBA701', fontSize: '20px', margin: '0'}}
                            onClick={handleAuth}
                        >
                            {auth}
                        </Button>

                    </Grid>

                    <Grid container spacing={2} style={{display:'flex', placeItems: 'center'}}>
                        <Grid item xs={9}>
                            <Button style={purpleButton}>
                                Mes favoris
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button style={purpleButton} onClick={setting}>
                                <SettingsIcon style={{fontSize: '35px'}}/>
                            </Button>
                        </Grid>

                        <Grid item xs={6}>
                            <Button style={purpleButton}>
                                Mes posts
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button style={yellowButton}>
                                Créer un spot
                            </Button>
                            <Button style={yellowButton}>
                                Créer un véhicule
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Layout>
            <NavBar />
        </>
    )
}

export default Profil
