import { useNavigate } from 'react-router-dom';

import tw from 'tailwind-styled-components';

import { PATH } from '../constants/constants';

export default function Footer() {
  const navigate = useNavigate();

  const redirectToPath = (name) => {
    switch (name) {
      case '김민재':
        window.open('https://github.com/crowcrow07', '_blank');
        break;
      case '황찬우':
        window.open('https://github.com/HChanWoo', '_blank');
        break;
      case '이은희':
        window.open('https://github.com/joywhy', '_blank');
        break;
      case '박태양':
        window.open('https://github.com/park-tae-yang', '_blank');
        break;
      case '노재경':
        window.open('https://github.com/jkroh1995', '_blank');
        break;
      case '김수민':
        window.open('https://github.com/soomni95', '_blank');
        break;
      case '사이트':
        window.open(
          'https://github.com/codestates-seb/seb44_main_002',
          '_blank'
        );
        break;
      default:
        break;
    }
  };

  return (
    <FooterContainer>
      <FooterSection>
        <div className="flex w-[32px] h-[48px] mb-4 max-[768px]:w-[28px] max-[768px]:h-[44px]">
          <img
            role="presentation"
            onClick={() => navigate(PATH.MAIN_PAGE)}
            onKeyDown={() => navigate(PATH.MAIN_PAGE)}
            src={process.env.PUBLIC_URL + `/images/logo.webp`}
            alt="footerLogo"
            className="cursor-pointer"
          />
        </div>
        <FooterTextSection>
          <h1 className="mb-6 opacity-100">프로젝트 편한</h1>
          <p className="max-[768px]:ml-4">
            <button onClick={() => redirectToPath('사이트')}>TEAM 002</button>
          </p>
        </FooterTextSection>
        <FooterTextSection>
          <h1 className="mb-6">TEAM FE</h1>
          <FooterText className="mb-4 max-[768px]:ml-4">
            <button onClick={() => redirectToPath('황찬우')}>황찬우</button>
          </FooterText>
          <FooterText className="mb-4 max-[768px]:ml-2">
            <button onClick={() => redirectToPath('이은희')}>이은희</button>
          </FooterText>
          <FooterText className="max-[768px]:ml-2">
            <button onClick={() => redirectToPath('김민재')}>김민재</button>
          </FooterText>
        </FooterTextSection>
        <FooterTextSection>
          <h1 className="mb-6">TEAM BE</h1>
          <FooterText className="mb-4 max-[768px]:ml-4">
            <button onClick={() => redirectToPath('노재경')}>노재경</button>
          </FooterText>
          <FooterText className="mb-4 max-[768px]:ml-2">
            <button onClick={() => redirectToPath('김수민')}>김수민</button>
          </FooterText>
          <FooterText className="max-[768px]:ml-2">
            <button onClick={() => redirectToPath('박태양')}>박태양</button>
          </FooterText>
        </FooterTextSection>
      </FooterSection>
    </FooterContainer>
  );
}

const FooterContainer = tw.div`
  flex
  h-[300px]
  justify-center
  items-center
  bg-[#242629]
`;

const FooterSection = tw.div`
  flex
  justify-around
  w-[1280px]
  h-[80%]
  font-bold
  text-gray-100
  max-[1280px]:w-full
  max-[768px]:flex-col
  max-[768px]:items-center
`;

const FooterTextSection = tw.div`
  flex
  flex-col
  max-[768px]:flex-row
  
`;

const FooterText = tw.p`
  text-sm
  opacity-30
  text-gray-300
`;
