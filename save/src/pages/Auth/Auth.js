import React, {  useState, useEffect } from "react";
import useUsers from '../../hooks/useUsers';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Auth = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useUsers();

  const handleEmailChange = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  const handleClick = () => {
    console.log(email);
    console.log(password);
    login(email, password);
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>

    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
          handleChange={handleEmailChange}
        />
      
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          handleChange={handlePasswordChange}
        />

        <Button onClick={handleClick} variant="contained">Contained</Button>
       
      </div>
    </Box>
     
    </div>
  );
}
export default Auth;
