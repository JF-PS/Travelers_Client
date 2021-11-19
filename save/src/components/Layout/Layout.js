import * as React from 'react';
import { Box } from '@material-ui/core'

const Layout= (props) => {

const { children } = props;

  return (
    <Box display="flex" id="mapId"
      sx={{
        display: 'flex',
        backgroundColor: '#DCDCDC',
        borderRadius: '0 0 50px 50px',
        minHeight: 'calc(100vh - 56px)',
      }}
    >
     {children}
    </Box>
  );
}
export default Layout;
