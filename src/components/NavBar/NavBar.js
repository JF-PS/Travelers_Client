import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import RoomIcon from '@mui/icons-material/Room';
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';

const NavBar = () => {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  const explore = () => { history.push('/'); };
  const map = () => { history.push('/map'); };
  const profil = () => { history.push('/profil'); };
  const ad = () => { history.push('/ad'); };
  const spot = () => { history.push('/spot'); };
  const history = useHistory();

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          style={{ backgroundColor: "#B68973", borderRadius: "16px 16px 0 0", color: "#FAF3F0"}}
        >
          <BottomNavigationAction style={{color: "#FAF3F0", fontSize: "7px"}} onClick={explore} label="Explore" icon={<SearchIcon />} />
          <BottomNavigationAction style={{ color: "#FAF3F0" }} onClick={map} label="Carte" icon={<RoomIcon />} />
          <BottomNavigationAction style={{ color: "#FAF3F0" }} onClick={spot} label="Spot" icon={<PhotoCameraIcon />} />
          <BottomNavigationAction style={{ color: "#FAF3F0" }} onClick={ad} label="Annonce" icon={<AirportShuttleIcon />} />
          <BottomNavigationAction style={{ color: "#FAF3F0" }} onClick={profil} label="Profil" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
export default NavBar;