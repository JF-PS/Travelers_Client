import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const ButtonGeneric = ({ variant, name, icon, color, borderRadius, borderColor, backgroundColor, width, height, fontSize }) => {

    var icons = [];
    icons['DeleteIcon'] = <DeleteIcon />;

    const buttonStyle = {
        textTransform: "none",
        boxShadow: "0 4px 50px rgba(187, 187, 187)",
        backgroundColor: backgroundColor ? backgroundColor : 'transparent',
        borderColor: borderColor ? borderColor : 'inherit',
        borderRadius: borderRadius ? borderRadius : '0',
        color: color ? color : '#000000',
        width: width ? width : '20px',
        height: height ? height : '20px',
        fontSize: fontSize ? fontSize : '16px'
    }

    return (<>
            <Button variant={variant ? variant : null} startIcon={icon ? icons[icon] : null} style={buttonStyle}>
                {name}
            </Button>
    </>)
}

export default ButtonGeneric;
