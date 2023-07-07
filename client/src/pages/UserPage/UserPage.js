import tw from 'tailwind-styled-components';

export default function UserPage() {
  const BackgroundImg = () => {
    return (
      <>
        <img
          src="/images/background/music-dynamic-gradient.png"
          alt="음표"
          className="absolute top-0 right-[-400px] pointer-events-none"
        />
        <img
          src="/images/background/star-dynamic-gradient.png"
          alt="별"
          className="absolute bottom-0 right-[900px] pointer-events-none"
        />
      </>
    );
  };
  return (
    <Background>
      <BackgroundImg />
      <OuterContainer></OuterContainer>
    </Background>
  );
}

const Background = tw.div`
relative
bg-gradient-to-r 
from-gradi-to
to-gradi-from
py-32
w-full
overflow-hidden
`;
const OuterContainer = tw.main`
mx-auto
px-[4.6875rem]
py-32
w-full
bg-[#000000]/40
rounded-ss-[3.125rem]
rounded-ee-[3.125rem]
`;
