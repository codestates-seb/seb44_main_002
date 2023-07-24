import tw from 'tailwind-styled-components';

export default function SkeletonCard() {
  return (
    <Container>
      <ImgDiv />
      <TitleDiv />
    </Container>
  );
}

const Container = tw.div`
w-[11.25rem]
h-[15rem] 
`;

const ImgDiv = tw.div`
w-[11.25rem]
h-[12.5rem] 
rounded-tl-2xl 
rounded-br-2xl 
animate-skeleton
 `;

const TitleDiv = tw.div`
mt-2
h-[1.5rem]
animate-skeleton
`;
