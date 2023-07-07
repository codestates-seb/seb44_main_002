import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slice/isLoginSlice';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import HeaderModal from './HeaderModal';
import HoverButton from '../../common/Buttons/HoverButton';

export default function Hamburger() {
  const [position, setPosition] = useState(0);

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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  //리덕스툴킷
  const isLogin = useSelector((state) => state.isLogin.isLogin);
  const dispatch = useDispatch();

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
          <MenuItem onClick={() => openPage('/')}>
            <HoverButton>HOME</HoverButton>
          </MenuItem>
          <MenuItem onClick={() => openPage('/category')}>
            <HoverButton>Category</HoverButton>
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
          <MenuItem onClick={() => openPage('/mypage')}>
            <HoverButton>Mypage</HoverButton>
          </MenuItem>
          {/* 로그아웃 dispatch를 바로 보내고있습니다 alert가 한번 더 뜨게 해야됩니다 */}
          <MenuItem onClick={() => dispatch(logout())}>
            <HoverButton>Logout</HoverButton>
          </MenuItem>
        </Menu>
      )}
    </div>
  );
}
