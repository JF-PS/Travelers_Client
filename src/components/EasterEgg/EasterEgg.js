import React, { useEffect, useState } from "react"
import image from './easterEgg.gif'
import Button from '@mui/material/Button';
import Popup from '../Popup/Popup';
import haha from './1bruitage-rire-sitcom.mp3'

const style = { 
    float: 'right', 
    right: '0px',
    width: '10%', 
    height: '10vh',
    border: 'none !important', 
    // border: 'solid yellow 2px',
    outline: 'none',
    position: 'absolute'
}

const EasterEgg = () => {

    const [ismousOver, setIsmousOver] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(
		() => {
            console.log("ismousOver : " + ismousOver);
		},
		[ismousOver]
	);

    const handleKeyDown = (e) => {
        if ((e.code === "ControlLeft" || e.code === "ControlRight") && ismousOver) {
          handleOpen();
        }
    };


    return (
        <>
            <div style={style} 
                tabIndex="-1" 
                onKeyUp={handleKeyDown}
                onMouseEnter={() => setIsmousOver(true)}
                onMouseLeave={() => setIsmousOver(false)}>
            </div>
            <Popup open={open} title="Easter Egg !!!!">
                <img src={image} alt="Iymage" />
                <br />
                <audio controls src={haha} autoPlay></audio>
                <br />
                <Button variant="contained" size="medium" onClick={handleClose} type="button" >close</Button>  
            </Popup>
        </>

    )
}

export default EasterEgg

