import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/slice/isLoginSlice';

import HeaderModal from './Modal/HeaderModal';
import Hamburger from './Hamburger/Hamburger';

import tw from 'tailwind-styled-components';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header() {
  const [position, setPosition] = useState(0);
  const navigate = useNavigate();

  // 리덕스 툴킷
  const isLogin = useSelector((state) => state.isLogin.isLogin);
  const dispatch = useDispatch();

  // 스크롤 이벤트
  const onScroll = () => {
    setPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // useNavigate 함수
  const MenuItem = ({ path, label }) => (
    <div
      className="cursor-pointer mr-[10px] max-[768px]:hidden"
      role="presentation"
      onClick={() => navigate(path)}
      onKeyDown={() => navigate(path)}
    >
      {label}
    </div>
  );

  return (
    <HeaderContainer position={position}>
      <HeaderDiv>
        <img
          role="presentation"
          src="images/logo.png"
          alt="logo"
          className="h-[40px] cursor-pointer"
          onClick={() => navigate('/')}
          onKeyDown={() => navigate('/')}
        />
      </HeaderDiv>
      <HeaderDiv className="justify-center">
        <MenuItem path="/" label="HOME" />
        <MenuItem path="/category" label="Category" />
        <div className="max-[768px]:hidden">???</div>
      </HeaderDiv>
      {isLogin ? (
        <>
          <HeaderDiv className="justify-end max-[768px]:hidden">
            <div className="flex mx-2 items-center">일이삼사</div>
            <div className="mx-2">
              <MenuItem
                path="/mypage"
                label={<PersonIcon fontSize="large" />}
              />
            </div>
            <div className="mx-2">
              <LogoutIcon
                onClick={() => dispatch(logout())}
                fontSize="large"
                style={{ cursor: 'pointer' }}
              />
            </div>
          </HeaderDiv>
          <HeaderDiv className="justify-end min-[769px]:hidden">
            <Hamburger />
          </HeaderDiv>
        </>
      ) : (
        <>
          <HeaderDiv className="justify-end max-[768px]:hidden">
            <HeaderModal />
          </HeaderDiv>
          <HeaderDiv className="justify-end min-[769px]:hidden">
            <Hamburger />
          </HeaderDiv>
        </>
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = tw.header`
  fixed
  w-full
  flex
  justify-between
  h-[80px]
  px-10
  items-center
  text-white
  duration-500 
  z-50
  ${(props) => props.position && 'bg-white text-black shadow-lg'}
`;

const HeaderDiv = tw.div`
flex
flex-1
`;
