import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hook/useLogout';

import UserPageApi from '../../api/UserPageApi';
import CustomInput from '../../components/Input/CustomInput';
import modifyPasswordValid from '../../components/Validation/ModifyPwdValidation';
import { ALERT_MESSAGE } from '../../constants/constants';

import tw from 'tailwind-styled-components';
import { Modal, Box } from '@mui/material';

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
export default function PasswordModal({ localData }) {
  const logout = useLogout();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ password: '', checkPassword: '' });
  const [isValid, setIsValid] = useState({
    password: true,
    checkPassword: true,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({ password: '', checkPassword: '' });
    setIsValid({ password: true, checkPassword: true });
  };
  const modifyPassword = async () => {
    try {
      const response = await UserPageApi.modifyUser(localData.userId, {
        password: form.password,
      });
      if (response === 401) {
        alert(ALERT_MESSAGE.TOKEN_OVER);
        logout();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = () => {
    const { password, checkPassword } = modifyPasswordValid(
      form.password,
      form.checkPassword
    );
    setIsValid({ password: password, checkPassword: checkPassword });
    if (password === true && checkPassword === true) {
      modifyPassword();
      alert(ALERT_MESSAGE.PASSWORD_MODIFY);
      handleClose();
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>수정하기</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <Container>
            <Header>비밀번호 변경</Header>
            <CustomInput
              isValid={isValid.password}
              labelName={'비밀번호'}
              type={'text'}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              text={'알파벳과 숫자를 포함한 8자 이상'}
            />
            <CustomInput
              isValid={isValid.checkPassword}
              labelName={'비밀번호 확인'}
              type={'text'}
              value={form.checkPassword}
              onChange={(e) =>
                setForm({ ...form, checkPassword: e.target.value })
              }
              text={'비밀번호와 일치하지 않습니다'}
            />
            <ButtonContainer>
              <HandleButton onClick={onSubmit}>확인</HandleButton>
              <HandleButton onClick={handleClose}>취소</HandleButton>
            </ButtonContainer>
          </Container>
        </Box>
      </Modal>
    </>
  );
}

const Button = tw.button`
mb-2
px-6
py-2
border
border-gray-400
rounded-md
text-xs
text-gray-400
hover:border-pointPurple-100
hover:text-pointPurple-100
max-lg:ml-2
max-sm:px-4
max-sm:py-1
`;
const HandleButton = tw(Button)`
mx-4
hover:border-white
hover:text-white
`;
const Container = tw.div`
flex
w-full
h-full
flex-col
justify-around
items-center
`;
const ButtonContainer = tw.div`
flex-[1] 
flex 
items-end
`;
const Header = tw.p`
text-white
text-2xl
flex-[1]
mb-2
font-bold
`;
