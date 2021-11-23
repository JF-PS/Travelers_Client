import * as React from 'react';
import { Box } from '@material-ui/core'

const Center = (props) => {

const { children, title } = props;

  return (
    <Box display="flex" sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#DCDCDC', border: '1px solid #808080', borderRadius: '10px', padding: '30px'}} >
     <h1>{title}</h1>
     {children}
    </Box>
  );
}

export default Center;