import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import tw from 'tailwind-styled-components';

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
        <div
          className="cursor-pointer mr-[10px]"
          role="presentation"
          onClick={() => navigate('/')}
          onKeyDown={() => navigate('/')}
        >
          HOME
        </div>
        <div
          className="cursor-pointer mr-[10px]"
          role="presentation"
          onClick={() => navigate('/category')}
          onKeyDown={() => navigate('/category')}
        >
          Category
        </div>
        <div>???</div>
      </HeaderDiv>
      <HeaderDiv className="justify-end">login</HeaderDiv>
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
  ${(props) => props.position && 'bg-white text-black shadow-lg'}
`;

const HeaderDiv = tw.div`
flex
flex-1
`;
