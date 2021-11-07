import React, {  useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const initialState = { first_name: '', last_name: '', email: '', password: '', confirmPassword: '', phone: '', role: '' };

const Auth = () => {
    
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (isSignup) {
          dispatch(signup(form, history));
        } else {
          dispatch(signin(form, history));
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Box
      sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
      noValidate
      autoComplete="off"
    >
    <h1>{ isSignup ? 'Sign up' : 'Sign in' }</h1>
    <form onSubmit={handleSubmit}>
        <section className="accFormWrapper">
            <div className="alignCenter">

            { isSignup && (
                <>
                    <TextField
                        required
                        id="lName"
                        label="Nom"
                        name="last_name"
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="fName"
                        label="Prénom"
                        name="first_name"
                        onChange={handleChange}
                    />
                    
                </>
            )}

            <TextField
                required
                id="email"
                label="Email"
                name="email"
                onChange={handleChange}
            />
   
            <TextField
                label="Mot de passe"
                id="password"
                type="password"
                name="password"
                helperText="Some important text"
                onChange={handleChange}
            />

            { isSignup && (
                <>
                    <TextField
                        label="Confimer le mot de passe"
                        id="confirmed_password"
                        type="password"
                        name="confirmPassword"
                        helperText="Some important text"
                        onChange={handleChange}
                    />

                    <TextField
                        label="Telephone"
                        id="telephone"
                        type="text"
                        name="phone"
                        helperText="Some important text"
                        onChange={handleChange}
                    />

                    <TextField
                        label="Role"
                        id="role"
                        type="text"
                        name="role"
                        helperText="Some important text"
                        onChange={handleChange}
                    />

                </>
            )}
            </div>
            <div className="alignCenter">
                <Button variant="contained" size="medium" type="submit" >{ isSignup ? 'Sign Up' : "Sign In" }</Button>
            </div>
        </section>
    </form> 
    <Button onClick={switchMode} variant="contained" size="medium" type="button" >{ isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }</Button>
    </Box>
  );
}

export default Auth;
