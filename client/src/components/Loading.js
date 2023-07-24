import tw from 'tailwind-styled-components';
import styled, { css, keyframes } from 'styled-components';

export default function Loading() {
  return (
    <LoadingDiv>
      <div className="text-4xl text-gray-200">화면 그리는중...</div>
      <div className="flex">
        <LoadingImg src="/images/loading/loading.svg" delay="0s" />
        <LoadingImg src="/images/loading/loading2.svg" delay="0.2s" />
        <LoadingImg src="/images/loading/loading3.svg" delay="0.4s" />
      </div>
    </LoadingDiv>
  );
}

// TODO: 스타일 컴포넌트 방식
// const LoadingDiv = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

const LoadingDiv = tw.div`
  flex
  flex-col
  justify-center
  items-center
  h-screen
  bg-gradient-to-r from-gradi-to to-gradi-from
`;

const loading = keyframes`
  0%, 100% {
    opacity: 1;
    // transform: scale(0.5);
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    // transform: scale(1.2);
    transform: translateY(-40px);
  }
  
`;

// TODO: animation-delay는 tailwind에서 지원이 안된다고함 그래서 스타일 컴포넌트를 사용했음.
const LoadingImg = styled.img`
  display: inline-block;
  width: 90px;
  height: 130px;
  margin-top: 12rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  ${({ delay }) =>
    delay &&
    css`
      animation: ${loading} 0.9s linear infinite;
      animation-delay: ${delay};
    `};
`;
