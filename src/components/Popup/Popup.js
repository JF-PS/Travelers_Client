import React  from 'react';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overflow:'auto',
  textAlign: 'center'
};



const Popup = (props) => {

    const { children, open, title } = props;

  return (
    <>
     <Modal
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        open={open}
        hideBackdrop
        // onClose={handleClose}
        BackdropComponent={Backdrop}
        closeAfterTransition
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Box sx={{ ...style, width: '100%' }}>
          <h2 id="child-modal-title">{title}</h2>
          {children}                  
        </Box>
        
    </Modal>
    </>

  );
}

export default Popup;