import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import LocationOffIcon from '@mui/icons-material/LocationOff';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import LanguageIcon from '@mui/icons-material/Language';
import SelectCountry from '../Inputs/SelectCountry'
import PublicIcon from '@mui/icons-material/Public';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Setting = () => {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    return (
        <>
            <h1>Setting</h1>
            <List sx={{width: '100%',maxWidth: 360, bgcolor: 'background.paper'}}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <CircleNotificationsIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Notification" secondary="Allowed notifications" />
                    <Switch {...label} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <LocationOffIcon />
                        </Avatar>
                    </ListItemAvatar> 
                    <ListItemText primary="Geolocation" secondary="Allow travelers to access my location." />
                    <Switch {...label} />
                </ListItem>

                <Divider variant="inset" component="li" />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PublicIcon />
                        </Avatar>
                    </ListItemAvatar> 
                    <ListItemText primary="Public" secondary="Allowed data sharing." />
                    <Switch {...label} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <LanguageIcon />
                        </Avatar>
                    </ListItemAvatar> 
                    <ListItemText primary="Language" secondary="Choose your language." />
                    <SelectCountry />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>H</Avatar>
                    </ListItemAvatar> 
                    <ListItemText primary="Mon Compte" secondary="Mettre à jours les informations" />
                    <a href="edit-profil">
                        <ManageAccountsIcon />
                    </a>
                </ListItem>
            </List>
        </>
    )
}

export default Setting
