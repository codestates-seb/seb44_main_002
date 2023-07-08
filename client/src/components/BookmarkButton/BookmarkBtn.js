import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
// 사용법
{
  /* <BookmarkBtn
  onClick={handleBookmarkClick}
  isBookmarked={isBookmarked}
  size="w-[36px] h-[60px]"
  absolute
  top="top-0"
  right="right-14"
/> */
}
export default function BookmarkBtn({
  onClick,
  isBookmarked,
  size = 'w-[36px] h-[60px]',
  absolute,
  top,
  right,
}) {
  return (
    <Button onClick={onClick} absolute={absolute} top={top} right={right}>
      {isBookmarked ? (
        <Img
          src="/images/bookmark/bookmarkOn.png"
          alt="활성화된 북마크"
          size={size}
        />
      ) : (
        <Img
          src="/images/bookmark/bookmarkOff.png"
          alt="비활성화된 북마크"
          size={size}
        />
      )}
    </Button>
  );
}

const Button = tw.button`
  ${({ absolute, top, right }) => (absolute ? `absolute ${top} ${right}` : '')}
  focus:outline-none
`;

const Img = tw.img`
  ${({ size }) => size}
  drop-shadow-3xl
`;
