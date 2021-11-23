import React from 'react'
import Button from '@mui/material/Button';
import backgroundImage from "../../images/backgroundMobile.jpg";
import { useHistory } from 'react-router-dom';
// import './style.css'

const HomePage = () => {
    const history = useHistory();
    const map = () => { history.push('/map'); };

    return (

        <div style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '700px', padding: '20px'}}
        >
            <div>
                <h2 style={{fontSize: '40px', fontWeight:'700', color: 'white', margin:'0'}}>Entraide.</h2>
                <h2 style={{fontSize: '40px', fontWeight:'700', color: '#3F3979', margin:'0'}}>Partage.</h2>
                <h2 style={{fontSize: '40px', fontWeight:'700', color: '#3F3979', margin:'0'}}>Voyage.</h2>
            </div>

            <div style={{alignItems: 'flex-end'}}>
                <Button style={{
                    backgroundColor: '#EBA701',
                    borderRadius: '8px',
                    height: '60px',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: '400',
                    width: '100%',
                    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.2)'
                }}
                    onClick={map}
                >
                        Explorer
                </Button>
            </div>
        </div>
    )
}

export default HomePage
