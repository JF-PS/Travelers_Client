import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const BeigeRoundedBtn = ({ variant, name, icon, color, borderRadius, borderColor, backgroundColor }) => {

    var icons = [];
    icons['DeleteIcon'] = <DeleteIcon />;

    return <>
        {icon ? <Button Button variant={variant} startIcon={icons[icon]} style={{ textTransform: "none", boxShadow: "0 4px 50px rgba(187, 187, 187)", color: color, borderRadius: borderRadius, borderColor: borderColor }}>
        {name}
        </Button>
            : variant = "contained" ? <Button Button variant={variant} style={{ textTransform: "none", boxShadow: "0 4px 50px rgba(187, 187, 187)", backgroundColor: backgroundColor, color: color, borderRadius: borderRadius, borderColor: borderColor }}>
            {name}
        </Button>
                : <Button Button variant={variant} style={{ textTransform: "none", boxShadow: "0 4px 50px rgba(187, 187, 187)", color: color, borderRadius: borderRadius, borderColor: borderColor }}>
            {name}
            </Button>
    }
    </>
}

export default BeigeRoundedBtn;
