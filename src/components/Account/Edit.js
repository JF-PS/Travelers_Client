import React, {  useState, useMemo } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { update, deleteProfil } from '../../actions/auth';

const userInfos = { first_name: 'John', last_name: 'DOE', email: 'johndoe@gmail.com', password: 'test', phone: '0123456789' };

export default function Edit() {

    const loggedInUser = useMemo(() => JSON.parse(localStorage.getItem('profile')), []);

    const dispatch = useDispatch();
    const history = useHistory();
    
    const [form, setForm] = useState(userInfos);
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = () => {

        form["role"] = null;
        delete form["role"];
        
        if(form.first_name === userInfos.first_name || form.first_name === ''){
            form["first_name"] = null;
            delete form["first_name"];
        }

        if(form.last_name === userInfos.last_name || form.last_name === ''){
            form["last_name"] = null;
            delete form["last_name"];
        }

        if(form.email === userInfos.email || form.email === ''){
            form["email"] = null;
            delete form["email"];
        }

        if(form.phone === userInfos.phone || form.phone === ''){
            form["phone"] = null;
            delete form["phone"];
        }

        if(form.password === userInfos.password || form.password === ''){
            form["password"] = null;
            delete form["password"];
        }

        if(Object.keys(form).length > 0 && loggedInUser){

            if(loggedInUser.result){
                dispatch(update(form, loggedInUser.result.id, history));
            }else{
                dispatch(update(form, loggedInUser.id, history));
            }
            

            // userService.updateUserProfil(form, loggedInUser.result.id).then((user) => {
            //     setUser(user);
            // });
        }else{
            console.log("Aucne modification répérée")
        }
    }

    const handleDelete = () => {
        if(Object.keys(form).length > 0 && loggedInUser){
            if(loggedInUser.result){
                dispatch(deleteProfil(loggedInUser.result.id, history));
            }else{
                dispatch(deleteProfil(loggedInUser.id, history));
            }
        }
        console.log("Supprimer le compte svp");
    }

    if(loggedInUser) {
        if(loggedInUser.result){
            userInfos.first_name = (loggedInUser.result.first_name) ? loggedInUser.result.first_name : "Non Renseigné";
            userInfos.last_name = (loggedInUser.result.last_name) ? loggedInUser.result.last_name : "Non Renseigné";
            userInfos.email = (loggedInUser.result.email) ? loggedInUser.result.email : "";
            userInfos.phone = (loggedInUser.result.phone) ? loggedInUser.result.phone : "";
            userInfos.role = (loggedInUser.result.role) ? loggedInUser.result.role : "Abonné";
        }else{
            userInfos.first_name = (loggedInUser.first_name) ? loggedInUser.first_name : "Non Renseigné";
            userInfos.last_name = (loggedInUser.last_name) ? loggedInUser.last_name : "Non Renseigné";
            userInfos.email = (loggedInUser.email) ? loggedInUser.email : "";
            userInfos.phone = (loggedInUser.phone) ? loggedInUser.phone : "";
            userInfos.role = (loggedInUser.role) ? loggedInUser.role : "Abonné";
        }

        let user_avatar = userInfos.last_name.charAt(0);
        user_avatar += userInfos.first_name.charAt(0);

        return (
            <>
                <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
        
                <section className="accFormWrapper">
                    <Stack direction="row" spacing={2}>
                        <Avatar>{user_avatar.toUpperCase()}</Avatar>
                        
                        {/* <Avatar sx={{ bgcolor: deepOrange[500] }}>JD</Avatar>
                        <Avatar sx={{ bgcolor: deepPurple[500] }}>JD</Avatar> */}
                    </Stack>
                    <p><strong>{userInfos.first_name} {userInfos.last_name}</strong></p>
                    <p>{userInfos.role}</p>
                    <h3>Mettez à jour votre profil</h3>
                    
                    <div className="alignCenter">
                        <TextField
                            required
                            defaultValue={userInfos.last_name}
                            id="lName"
                            label="Nom"
                            name="last_name"
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            id="fName"
                            defaultValue={userInfos.first_name}
                            label="Prénom"
                            name="first_name"
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            id="phone"
                            defaultValue={userInfos.phone}
                            label="Téléphone"
                            name="phone"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="alignCenter">
                        <TextField
                            id="email"
                            defaultValue={userInfos.email}
                            label="Email"
                            name="email"
                            onChange={handleChange}
                        />
                        <TextField
                            label="Nouveau mot de passe"
                            id="password"
                            type="password"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="alignCenter">
                        <Button variant="contained" size="medium" type="button" onClick={handleSubmit}>Mettre à jour mon compte</Button>
                        <Button variant="contained" size="medium" type="button" onClick={handleDelete}>Supprimer mon compte</Button>
                    </div>
                </section>
                </Box>
            </>
          );
    }
    else{
        return (
            <>
                <p>Veuillez vous connecter d'abord</p>
            </>
        );
    }
}
