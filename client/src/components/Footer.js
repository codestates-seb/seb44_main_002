import { useNavigate } from 'react-router-dom';

import tw from 'tailwind-styled-components';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <FooterContainer>
      <FooterSection>
        <div className="flex w-[32px] h-[48px]">
          <img
            role="presentation"
            onClick={() => navigate('/')}
            onKeyDown={() => navigate('/')}
            src="../images/logo.png"
            alt="footerLogo"
            className="cursor-pointer"
          />
        </div>
        <FooterTextSection>
          <h1 className="mb-6">프로젝트 편한</h1>
          <p className="max-[768px]:ml-4">TEAM 002</p>
        </FooterTextSection>
        <FooterTextSection>
          <h1 className="mb-6">TEAM FE</h1>
          <p className="mb-4 text-gray-300 max-[768px]:ml-4">황찬우</p>
          <p className="mb-4 text-gray-300 max-[768px]:ml-2">이은희</p>
          <p className="text-gray-300 max-[768px]:ml-2">김민재</p>
        </FooterTextSection>
        <FooterTextSection>
          <h1 className="mb-6">TEAM BE</h1>
          <p className="mb-4 text-gray-300 max-[768px]:ml-4">노재경</p>
          <p className="mb-4 text-gray-300 max-[768px]:ml-2">김수민</p>
          <p className="text-gray-300 max-[768px]:ml-2">박태양</p>
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
