import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import RoomIcon from '@mui/icons-material/Room';
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import ForumIcon from '@mui/icons-material/Forum';
import { useHistory } from 'react-router-dom';
import "./style.css"

const NavBar = () => {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  const map = () => { history.push('/map'); };
  const spot = () => { history.push('/spot'); };
  const chat = () => { history.push('/chat'); };
  const ad = () => { history.push('/ad'); };
  const profil = () => { history.push('/profil'); };
  const history = useHistory();

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
/*           showLabels
 */       value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          style={{backgroundColor: "#3F3979"}}
          focused={true}
        >
          <BottomNavigationAction style={{color: "#ffffff"}} onClick={map} icon={<RoomIcon />}
          />
          <BottomNavigationAction style={{color: "#ffffff"}} onClick={spot} icon={<PhotoCameraIcon />} />
          <BottomNavigationAction style={{color: "#ffffff"}} onClick={chat} icon={<ForumIcon />} />
          <BottomNavigationAction style={{color: "#ffffff"}} onClick={ad} icon={<AirportShuttleIcon />} />
          <BottomNavigationAction style={{color: "#ffffff"}} onClick={profil} icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
export default NavBar;