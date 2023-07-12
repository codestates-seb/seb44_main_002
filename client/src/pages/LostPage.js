import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

export default function LostPage() {
  return (
    <Container>
      <ContentContainer>
        <LogoImg src={process.env.PUBLIC_URL + 'images/logo.webp'} alt="logo" />
        <ErrorTitle>
          <ItimP>ERR</ItimP>
          <FireImg src={process.env.PUBLIC_URL + 'images/fire.webp'} alt="O" />
          <ItimP>R</ItimP>
        </ErrorTitle>
        <ErrorContent>
          <p>{'불편을 드려 죄송합니다. o.<'}</p>
          <p>없는 페이지입니다.</p>
        </ErrorContent>
        <Link to="/">
          <LinkToMain>메인으로 이동 ➔</LinkToMain>
        </Link>
      </ContentContainer>
    </Container>
  );
}

const Container = tw.div`
flex
flex-col
w-screen
h-screen
py-20
bg-gradient-to-r 
from-gradi-to
to-gradi-from
max-sm:py-32
`;
const ContentContainer = tw.main`
mx-auto
text-white
`;
const LogoImg = tw.img`
mx-auto
h-24
max-sm:h-20
`;
const FireImg = tw.img`
max-lg:h-24
max-sm:h-16
`;
const ErrorTitle = tw.div`
flex
mt-20
`;
const ItimP = tw.p`
text-9xl
font-itim
max-lg:text-8xl
max-sm:text-6xl
`;
const ErrorContent = tw.div`
mt-12
text-7xl
leading-[5.5rem]
max-lg:text-5xl
max-lg:leading-[4rem]
max-sm:text-2xl
max-sm:mt-4
`;
const LinkToMain = tw.p`
mt-12
text-center
text-xl
max-sm:mt-10
max-sm:text-lg
`;
