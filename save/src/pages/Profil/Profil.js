import React, { useState } from "react";
import Auth from '../../components/Account/Auth';
import UserSpace from '../../components/Account/UserSpace';
import Setting from '../../components/Account/Setting';
import Logout from '../../components/Account/Logout';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const Profil = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const [profilComponent, setProfilComponent] = useState(<UserSpace />);
    var auth = (user) ? 'Logout' : 'Login';

    const handleClick = (component) => { 
        switch (component) {
            case 'Login':
                setProfilComponent(<Auth />);
              break;
            case 'Logout':
                setProfilComponent(<Logout />);
                break;
            case 'Setting':
                setProfilComponent(<Setting />);
              break;
            default:
                setProfilComponent(<UserSpace />);
          }
    }

    return (
        <div style={{ textAlign: 'center'}}>
            <ButtonGroup variant="contained">
                <Button onClick={() => handleClick(auth)}>{auth}</Button>
                <Button onClick={() => handleClick('MySpace')}>My Space</Button>
                <Button onClick={() => handleClick('Setting')}>Setting</Button>
            </ButtonGroup>

            {profilComponent}
        </div>
    )
}

export default Profil
