import * as React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slice/isLoginSlice';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import HoverButton from '../../common/Buttons/HoverButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 600,
  bgcolor: '#3D4E83',
  boxShadow: 24,
  p: 4,
};

export default function HeaderModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  return (
    <div>
      <HoverButton>
        <Button style={{ color: '#8F8F8F' }} onClick={handleOpen}>
          로그인
        </Button>
      </HoverButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>Welcome!</div>
          <div>인풋</div>
          <HoverButton onClick={() => dispatch(login())}>로그인</HoverButton>
        </Box>
      </Modal>
    </div>
  );
}
