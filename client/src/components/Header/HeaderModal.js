import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slice/isLoginSlice';
import { useNavigate } from 'react-router-dom';
import { userinfoLogin, userinfoGet } from '../../redux/slice/userInfoSlice';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import HoverButton from '../../common/Buttons/HoverButton';
import tw from 'tailwind-styled-components';
import useLoginValid from '../Validation/LoginValidation';
import CustomInput from '../Input/CustomInput';

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
const BASE_URL = process.env.REACT_APP_BASE_URL;

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

  // 사용자 이름및 사용자 정보 조회 함수
  // 유저 정보 조회할때 토근으로 조회 권한 여부  credentials: 'include',
  const handleUserInfo = async (memberId) => {
    fetch(`${BASE_URL}users/${memberId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'ngrok-skip-browser-warning': 'true',
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log('동작');
        console.log(data);
        // {
        //     “name” : “kim”,
        //     “profileImageUrl” : “sample image url”
        //     “gender” : “example”,
        //     “age” : 20,
        //     “email” : “kim@example.com”,
        //     “subscribedCount” : 0,
        //     “bookmarked” : [
        //         {
        //             “cocktailId” : 1,
        //             “name” : “sample cocktail”,
        //             “imageUrl” : “sample image url”,
        //             “isBookmarked” : “true”
        //         },
        //         {
        //             “cocktailId” : 2,
        //             “name” : “sample cocktail”,
        //             “isBookmarked” : “true”
        //         }
        //     ],
        //     “boards” : [
        //         {
        //             “boardId” : 1,
        //             “title” : “title1”,
        //             “content” : “content1”
        //         },
        //         {
        //             “boardId” : 2,
        //             “title” : “title2”,
        //             “content” : “content2”
        //         },
        //     ],
        //     “subscribe” : [
        //         {
        //             “userId” : 1,
        //             “name” : “kim”,
        //             “profileImageUrl” : “sample image url”
        //         },
        //         {
        //             “userId” : 2,
        //             “name” : “park”,
        //             “profileImageUrl” : “sample image url”
        //         },
        //     ],
        // }

        // dispatch(
        //   userinfoGet({
        //     displayName: data.displayName,
        //     location: data.location,
        //     profileContent: data.profileContent,
        //     profileImage: data.profileImage,
        //     profileTitle: data.profileTitle,
        //   })
        // );
        dispatch(userinfoGet(data));
      })
      .catch((err) => {
        console.log(err);
        navigate('/error');
      });
  };
  // 로그인 버튼 클릭시 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사 로직
    const { email, password } = useLoginValid(form);
    setIsValid({
      email,
      password,
    });

    if (email && password) {
      fetch(`${BASE_URL}auth/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // 'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify(form),
      })
        .then((data) => {
          if (data.status === 200) {
            localStorage.setItem(
              'accessToken',
              data.headers.get('Authorization')
            );
            localStorage.setItem('UserId', data.headers.get('UserId'));
            //localStorage.setItem('refreshToken', data.headers.get.Refesh);
            // Refresh accessToken 만료
            //UserId
            //Name

            dispatch(
              userinfoLogin({
                UserId: data.headers.get('UserId'),
                accessToken: data.headers.get('Authorization'),
              })
            );

            //사용자 정보 조회
            handleUserInfo(data.headers.get('UserId'));
            // 전역상태관리 로그인으로 변경
            dispatch(login(() => login()));
            navigate('/');
          } else {
            console.log('요청이 실패했습니다.');
          }
        })
        .catch((err) => {
          console.log(err);
          navigate('/error');
        });
    } else {
      console.log('유효성 검사 작동');
    }
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
