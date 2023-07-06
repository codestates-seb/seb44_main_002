import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slice/isLoginSlice';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import HoverButton from '../../common/Buttons/HoverButton';
import tw from 'tailwind-styled-components';
import useLoginValid from '../Validation/LoginValidation';
import CustomInput from '../Input/Input';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  height: 400,
  bgcolor: '#3D4E83',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function HeaderModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 유효성검사 state
  const [isValid, setIsValid] = useState({
    email: true,
    password: true,
  });
  // input 값 value 저장
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사 로직
    useLoginValid(form, setIsValid);

    // 전역상태관리 로그인으로 변경
    // dispatch(() => login())
  };

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
          <LoginContainer>
            <LoginHeader>환영합니다!</LoginHeader>
            <form
              className="flex flex-col flex-[6] justify-between"
              onSubmit={handleSubmit}
            >
              <CustomInput
                isValid={isValid.email}
                labelName={'이메일'}
                type={'email'}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                text={'이메일을 확인해주세요'}
              />
              <CustomInput
                isValid={isValid.password}
                labelName={'비밀번호'}
                type={'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                text={'비밀번호를 확인해주세요'}
              />
              <div className="flex justify-center">
                <HoverButton type="submit">로그인</HoverButton>
              </div>
            </form>
            <div className="flex-[1] flex items-end">
              <button
                className="items-end text-gray-300 font-bold"
                onClick={() => {
                  navigate('/signup');
                  handleClose();
                }}
              >
                sign up
              </button>
            </div>
          </LoginContainer>
        </Box>
      </Modal>
    </div>
  );
}

const LoginContainer = tw.div`
  flex
  w-full
  h-full
  flex-col
  justify-around
  items-center
`;

const LoginHeader = tw.div`
  text-white
  text-2xl
  flex-[1]
  mb-2
  font-bold
`;
