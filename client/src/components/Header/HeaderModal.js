import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/slice/isLoginSlice';
import { open, close } from '../../redux/slice/isModalSlice';
import { userinfoLogin, userinfoGet } from '../../redux/slice/userInfoSlice';

import HoverButton from '../../common/Buttons/HoverButton';
import CustomInput from '../Input/CustomInput';
import useLoginValid from '../Validation/LoginValidation';
import api from '../../api/api';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import tw from 'tailwind-styled-components';
import Swal from 'sweetalert2';

import { PATH } from '../../constants/constants';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  height: 400,
  background: 'linear-gradient(to right, #4A4676, #1A344A)',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};
export default function HeaderModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isModal = useSelector((state) => state.isModal.isModal);

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
  const [errorMSG, setErrorMSG] = useState(null);

  const handleOpen = () => dispatch(open());
  const handleClose = () => dispatch(close());

  const handleNaviModal = (userid) => {
    Swal.fire({
      title: '마이페이지로 이동하시겠습니까?',
      text: '마이페이지로 이동하시겠습니까?',
      icon: 'question',
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#FF1AE8',
      confirmButtonText: '마이페이지로이동',
      cancelButtonText: '아니요',
      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 마이페이지로이동
      if (result.isConfirmed) {
        navigate(`${PATH.USER_PAGE}${userid}`);
      } else {
        window.location.reload();
      }
    });
  };

  // 사용자 이름및 사용자 정보 조회 함수
  const handleUserInfo = async (memberId) => {
    try {
      const response = await api.getUserinfoApi(memberId);
      console.log('동작');

      const data = await response.json();
      dispatch(userinfoGet(data));
      // console.log(data);
      localStorage.setItem('name', data.name);
      localStorage.setItem('age', data.age);
      localStorage.setItem('gender', data.gender);
    } catch (error) {
      console.log(error);
      navigate('/error');
    }
  };
  // Login 버튼 클릭시 실행되는 함수
  const handleSubmit = async (e, isguest = false) => {
    e.preventDefault();
    // 유효성 검사 로직
    const { email, password } = useLoginValid(form);
    setIsValid({
      email,
      password,
    });

    if (email && password) {
      //분리된 api 연결
      try {
        const response = await api.loginApi(form);
        //성공
        if (response.status === 200) {
          //리덕스에 저장 ->  할필요가 있을까? 새로고침되는데?
          dispatch(
            userinfoLogin({
              userId: response.headers.get('userId'),
              accessToken: response.headers.get('Authorization'),
              IsAdmin: response.headers.get('IsAdmin'),
            })
          );
          //사용자 정보 조회
          handleUserInfo(response.headers.get('userId'));
          // 전역상태관리 로그인으로 변경
          dispatch(login());
          handleClose();
          handleNaviModal(response.headers.get('userId'));
        } else {
          // 응답 실패
          if (response === 401) {
            setErrorMSG('없는 계정입니다. 회원가입 진행해 주세요');
          }
        }
      } catch (error) {
        console.log(error);
        handleClose();
        navigate('/error');
      }
    }
  };
  const handleGuestSubmit = async () => {
    const guestform = { email: 'test@test.com', password: 'test1234' };
    try {
      const response = await api.loginApi(guestform);
      //성공
      if (response.status === 200) {
        //리덕스에 저장 ->  할필요가 있을까? 새로고침되는데?
        dispatch(
          userinfoLogin({
            userId: response.headers.get('userId'),
            accessToken: response.headers.get('Authorization'),
            IsAdmin: response.headers.get('IsAdmin'),
          })
        );
        //사용자 정보 조회
        handleUserInfo(response.headers.get('userId'));
        // 전역상태관리 로그인으로 변경
        dispatch(login());
        handleClose();
        handleNaviModal(response.headers.get('userId'));
      } else {
        // 응답 실패
        if (response === 401) {
          setErrorMSG('없는 계정입니다. 회원가입 진행해 주세요');
        }
      }
    } catch (error) {
      console.log(error);
      handleClose();
      navigate('/error');
    }
  };
  return (
    <div>
      <HoverButton>
        <Button
          style={{ color: '#8F8F8F', fontWeight: 'bold' }}
          onClick={handleOpen}
        >
          LOGIN
        </Button>
      </HoverButton>
      <Modal
        open={isModal}
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
              {errorMSG && <p className="text-error text-[13px]">{errorMSG}</p>}
              <div className="flex justify-center gap-3">
                <HoverButton type="submit">LOGIN</HoverButton>
                {/* <HoverButton
                  onClick={() => handleGuestSubmit()}
                  size="w-[110px] h-[36px]"
                >
                  {' '}
                  GUEST LOGIN{' '}
                </HoverButton> */}
              </div>
            </form>

            <div className="flex-[1] flex items-end">
              <button
                className="items-end font-bold text-gray-300"
                onClick={() => {
                  navigate(PATH.SIGNUP_PAGE);
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
