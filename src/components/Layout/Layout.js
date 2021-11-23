import * as React from 'react';
import { Box } from '@material-ui/core'
// import './style.css';

const Layout= (props) => {

const { children } = props;

// const layoutStyle = {
//   backgroundImage: backgroundImage ? backgroundImage : '',
// }

  return (
    <Box display="flex" id="mapId"
      sx={{
        display: 'flex',
        backgroundColor: 'white',
        borderRadius: '0 0 50px 50px',
        minHeight: 'calc(100vh - 56px)',
      }}
      // style={layoutStyle}
    >
     {children}
    </Box>
  );
}
export default Layout;
