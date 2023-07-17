import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slice/isLoginSlice';
import { userinfoLoginOut } from '../../redux/slice/userInfoSlice';
import Swal from 'sweetalert2';

import HeaderModal from './HeaderModal';
import Hamburger from './Hamburger';

import tw from 'tailwind-styled-components';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header() {
  const [position, setPosition] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  // 리덕스 툴킷
  const isLogin = useSelector((state) => state.isLogin.isLogin);
  const userinfo = useSelector((state) => state.userinfo);
  const dispatch = useDispatch();

  const [hovered, setHovered] = useState(false);
  const [randomColor, setRandomColor] = useState('');

  // 글자 색 바꾸기
  useEffect(() => {
    // 0.2초마다 함수 실행
    const interval = setInterval(generateRandomColor, 200);

    return () => {
      clearInterval(interval); // 컴포넌트가 언마운트될 때 interval을 정리합니다.
    };
  }, []);

  // 색깔 랜덤으로 띄우는 함수
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setRandomColor(color);
  };

  const randomColorHandler = () => {
    setHovered(true);
  };

  const resetColor = () => {
    setHovered(false);
  };

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
      className={`text-xl font-bold cursor-pointer mr-[10px] max-[768px]:hidden`}
      role="presentation"
      onClick={() => navigate(path)}
      onKeyDown={() => navigate(path)}
    >
      {label}
    </div>
  );
  const handleLogOut = () => {
    console.log('동작');
    localStorage.clear();
    dispatch(logout());
    dispatch(userinfoLoginOut());
    navigate('/');
  };

  const randomHandler = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}cocktails/random`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      // 성공
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        navigate(`/detail/${json.cocktailId}`);
      })
      // 실패
      .catch((error) => {
        console.log(error);
        navigate('/error');
      });
  };

  return (
    <HeaderContainer position={position}>
      <HeaderDiv>
        <img
          role="presentation"
          src={process.env.PUBLIC_URL + `/images/logo.webp`}
          alt="logo"
          className="h-[40px] cursor-pointer"
          onClick={() => navigate('/')}
          onKeyDown={() => navigate('/')}
        />
      </HeaderDiv>
      <HeaderDiv className="justify-center">
        <div
          className={`text-xl cursor-pointer mr-[10px] max-[768px]:hidden ${
            location.pathname === '/'
              ? `${position ? 'text-black' : 'text-white'} font-bold`
              : 'text-gray-200 font-normal'
          }`}
          role="presentation"
          onClick={() => navigate('/')}
          onKeyDown={() => navigate('/')}
        >
          HOME
        </div>
        <div
          className={`text-xl font-bold cursor-pointer mr-[10px] max-[768px]:hidden ${
            location.pathname === '/category'
              ? `${position ? 'text-black' : 'text-white'} font-bold`
              : 'text-gray-200 font-normal'
          }`}
          role="presentation"
          onClick={() => navigate('/category')}
          onKeyDown={() => navigate('/category')}
        >
          CATEGORY
        </div>
        <div
          className={`text-xl font-bold cursor-pointer mr-[10px] max-[768px]:hidden text-gray-200`}
          role="presentation"
          onClick={randomHandler}
          style={{ color: hovered ? randomColor : '' }}
          onMouseEnter={randomColorHandler}
          onMouseLeave={resetColor}
        >
          추천
        </div>
      </HeaderDiv>
      {isLogin ? (
        <>
          <HeaderDiv className="justify-end max-[768px]:hidden">
            <div className="flex mx-2 font-bold items-center">
              {userinfo.name}
            </div>
            <div className="mx-2">
              {/* <MenuItem
                path="/userpage/:id"
                label={<PersonIcon fontSize="large" />}
              /> */}
              <div
                className={`text-xl font-bold cursor-pointer mr-[10px] max-[768px]:hidden`}
                role="presentation"
                onClick={() => navigate(`/userpage/${userinfo.userId}`)}
                onKeyDown={() => navigate(`/userpage/${userinfo.userId}`)}
              >
                <PersonIcon fontSize="large" />
              </div>
            </div>
            <div className="mx-2">
              <LogoutIcon
                onClick={() =>
                  // window.confirm('로그아웃하시겠습니까?')
                  //   ? handleLogOut()
                  //   : ''

                  Swal.fire({
                    title: '정말로 로그아웃하시겠습니까?',
                    text: '정말로 로그아웃하시겠습니까?',
                    icon: 'warning',
                    showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
                    confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
                    cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
                    confirmButtonText: '로그아웃하기', // confirm 버튼 텍스트 지정
                    cancelButtonText: '취소', // cancel 버튼 텍스트 지정
                    reverseButtons: true, // 버튼 순서 거꾸로
                  }).then((result) => {
                    // 만약 Promise리턴을 받으면,
                    if (result.isConfirmed) {
                      // 만약 모달창에서 confirm 버튼을 눌렀다면
                      handleLogOut();
                    }
                  })
                }
                fontSize="large"
                style={{ cursor: 'pointer' }}
              />
            </div>
          </HeaderDiv>
          <HeaderDiv className="justify-end min-[769px]:hidden">
            <Hamburger handleLogOut={handleLogOut} />
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
