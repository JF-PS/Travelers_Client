import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./style.css"


const SlideButton = () => {
  const [alignment, setAlignment] = React.useState('Entraide');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      // color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      style={{backgroundColor: "white", borderRadius: "8px", marginLeft: '20px', marginRight: '20px'}}
      fullWidth
    >
      <ToggleButton value="Entraide" style={{textTransform: "none", lineHeight: '1', border: '0', color: "#A480A6"}}>Entraide</ToggleButton>
      <ToggleButton value="Spots" style={{textTransform: "none", lineHeight: '1', border:'0', color: "#A480A6"}}>Spots</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default SlideButton;