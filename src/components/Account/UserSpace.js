import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Divider from '@mui/material/Divider';
import DriveEtaIcon from '@mui/icons-material/DriveEta';

const UserSpace = () => {
    return (
        <>
            <h1>My Space</h1>
            <List sx={{width: '100%',maxWidth: 360, bgcolor: 'background.paper'}}>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Spots" secondary="Watch your favorite spots" />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <DriveEtaIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Journey" secondary="Review your trips" />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <PeopleAltIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Friends" secondary="Your traveler friends met" />
                </ListItem>
            </List>
        </>
    )
}

export default UserSpace
