import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import tw from 'tailwind-styled-components';
import BasicModal from './Modal/HeaderModal';
import Hamburger from './Hamburger/Hamburger';

export default function Header() {
  const [position, setPosition] = useState(0);
  const navigate = useNavigate();

  const onScroll = () => {
    setPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

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
      <HeaderDiv className="justify-end max-[768px]:hidden">
        <BasicModal />
      </HeaderDiv>
      <HeaderDiv className="justify-end min-[768px]:hidden">
        <Hamburger />
      </HeaderDiv>
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
