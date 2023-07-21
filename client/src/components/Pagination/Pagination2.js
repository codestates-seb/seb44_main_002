import React, { useState, useEffect } from 'react';

import tw from 'tailwind-styled-components';

export default function Pagination2({
  currentPage,
  setCurrentPage,
  totalPage,
}) {
  const [paginationList, setPaginationList] = useState([]);

  // 페이지 선택
  const handleButtonClick = (page) => {
    scrollToTop();
    setCurrentPage(page);
  };

  const updatePageList = () => {
    const firstPage = Math.floor(currentPage / 5) * 5;
    const endPage =
      firstPage + 4 < totalPage - 1 ? firstPage + 4 : totalPage - 1;
    const array = Array.from({ length: endPage - firstPage + 1 }, (_, idx) => {
      return idx + firstPage;
    });
    console.log(array, firstPage, endPage, totalPage);
    return array;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    setPaginationList(() => updatePageList());
  }, [totalPage, currentPage]);

  return (
    <>
      <Container>
        <MovePrev
          onClick={() => {
            if (currentPage > 0) handleButtonClick(currentPage - 1);
          }}
          currentPage={currentPage}
        >
          <p>{'< Prev'}</p>
        </MovePrev>
        {paginationList &&
          paginationList.map((page, idx) => {
            return (
              <PageButton
                key={idx}
                onClick={() => {
                  scrollToTop();
                  setCurrentPage(idx);
                }}
                currentPage={currentPage}
                idx={idx}
              >
                {page + 1}
              </PageButton>
            );
          })}
        <MoveNext
          onClick={() => {
            if (currentPage < totalPage - 1) handleButtonClick(currentPage + 1);
          }}
          currentPage={currentPage}
          totalPages={totalPage}
        >
          <p>{'Next >'}</p>
        </MoveNext>
      </Container>
    </>
  );
}
const Container = tw.div`
leading-[13px]
`;
const MovePrev = tw.button`
text-white
text-base
mr-4
${(props) =>
  props.currentPage > 0 ? 'text-[#ffffff]' : 'text-[#8F8F8F] cursor-auto'}
`;

const MoveNext = tw.button`
text-white
text-base
ml-2
${(props) =>
  props.currentPage < props.totalPages - 1
    ? 'text-[#ffffff]'
    : 'text-[#8F8F8F] cursor-auto'}
`;

const PageButton = tw.button`
w-[25px]
h-[25px] 
border-[1px] 
rounded-lg mr-2
${(props) =>
  props.currentPage % 5 === props.idx
    ? 'text-[#BB40F1] bg-transparent border-[#BB40F1]'
    : 'text-[#7B7B7B] bg-transparent border-[#7B7B7B]'}
`;
