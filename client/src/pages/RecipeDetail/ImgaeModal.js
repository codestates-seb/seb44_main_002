import React, { useState } from 'react';

import { Modal, Box } from '@mui/material';

import tw from 'tailwind-styled-components';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#000000',
  width: '70vw',
  height: '80vh',
};
export default function ImageModal({ imageUrl }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <InfoImage src={imageUrl} onClick={handleOpen} alt="와인사진" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style} onClick={handleClose}>
          <ModalImage src={imageUrl} alt="와인사진" />
          <CloseP>✕</CloseP>
        </Box>
      </Modal>
    </>
  );
}

const InfoImage = tw.img`
w-[260px]
h-[full]
object-cover
rounded-2xl
cursor-pointer
hover:scale-105
max-md:w-full
`;
const ModalImage = tw.img`
w-full
h-full
object-contain
cursor-pointer
`;
const CloseP = tw.p`
fixed
text-3xl 
text-white  
top-1 
right-1 
cursor-pointer
`;
