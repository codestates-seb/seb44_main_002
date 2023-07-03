import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import HeaderModal from '../Modal/HeaderModal';
import HoverButton from '../../common/Buttons/HoverButton';

export default function Hamburger() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openHome = () => {
    navigate('/');
    setAnchorEl(null);
  };

  const openCategory = () => {
    navigate('/category');
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
        <MenuIcon sx={{ color: 'white', fontSize: 50 }} />
      </Button>
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
        <MenuItem onClick={openHome}>
          <HoverButton>HOME</HoverButton>
        </MenuItem>
        <MenuItem onClick={openCategory}>
          <HoverButton>Category</HoverButton>
        </MenuItem>
      </Menu>
    </div>
  );
}
