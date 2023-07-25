import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogout } from '../../hook/useLogout';
import Swal from 'sweetalert2';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import HeaderModal from './HeaderModal';
import HoverButton from '../../common/Buttons/HoverButton';

import { HEADER_TITLE, PATH } from '../../constants/constants';

export default function Hamburger() {
  const [position, setPosition] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const userid = localStorage.getItem('userId');

  //리덕스툴킷
  const isLogin = useSelector((state) => state.isLogin.isLogin);

  const handleLogOut = useLogout();

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPage = (path) => {
    navigate(path);
    setAnchorEl(null);
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        handleClose();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon
          sx={{ color: position === 0 ? 'white' : 'black', fontSize: 50 }}
        />
      </Button>
      {!isLogin ? (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            sx: {
              backgroundColor: '#3D4E83',
            },
          }}
        >
          {window.innerWidth <= 768 && (
            <MenuItem>
              <HeaderModal />
            </MenuItem>
          )}
          <MenuItem onClick={() => openPage(PATH.MAIN_PAGE)}>
            <HoverButton>{HEADER_TITLE.HOME}</HoverButton>
          </MenuItem>
          <MenuItem onClick={() => openPage(PATH.CATEGORY_PAGE)}>
            <HoverButton fontSize="text-sm">
              {HEADER_TITLE.CATEGORY}
            </HoverButton>
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            sx: {
              backgroundColor: '#3D4E83',
            },
          }}
        >
          <MenuItem onClick={() => openPage(`/userpage/${userid}`)}>
            <HoverButton>{HEADER_TITLE.MYPAGE}</HoverButton>
          </MenuItem>
          <MenuItem onClick={() => openPage(PATH.CATEGORY_PAGE)}>
            <HoverButton fontSize="text-md">
              {HEADER_TITLE.CATEGORY}
            </HoverButton>
          </MenuItem>

          <MenuItem
            onClick={() =>
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
          >
            <HoverButton>Logout</HoverButton>
          </MenuItem>
        </Menu>
      )}
    </div>
  );
}
