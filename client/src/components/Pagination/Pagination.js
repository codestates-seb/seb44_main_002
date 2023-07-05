import React, { useState } from 'react';
const PAGE_BLOCK_SIZE = 5;

export default function Pagination({ currentPage, setCurrentPage, pageInfo }) {
  const [paginationList, setPaginationList] = useState([]);

  const createPageList = (current) => {
    //숫자배열이 나옴
    return Array.from({ length: PAGE_BLOCK_SIZE }, (_, idx) => {
      return current - 2 + idx;
    });
  };

  //버튼을 클릭하면 페이지 이동
  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };
  const updatePaginationList = () => {
    if (currentPage <= CHANGE_PAGE_LIST_CNT) {
      if (pageInfo.totalPages <= PAGE_BLOCK_SIZE) {
        return new Array(pageInfo.totalPages).fill(0).map((_, idx) => idx + 1);
      }
      return new Array(PAGE_BLOCK_SIZE).fill(0).map((_, idx) => idx + 1);
    }
    if (currentPage >= pageInfo.totalPages - 3) {
      return new Array(PAGE_BLOCK_SIZE)
        .fill(0)
        .map((_, idx) => idx + pageInfo.totalPages - CHANGE_PAGE_LIST_CNT);
    }
    return createPageList(currentPage);
  };

  return (
    <div>
      {/* {[1, 2, 3].map((i, idx) => (
        <ClickButton
          size="w-[20px] h-[30px]"
          key={idx}
          color={`${
            currentPage === idx
              ? 'text-[#BB40F1] bg-transparent'
              : 'text-[#7B7B7B] bg-transparent'
          }`}
          borderColor={`${
            currentPage === idx ? 'border-[#BB40F1]' : 'border-[#7B7B7B]'
          }`}
          onClick={() => {
            setCurrentPage(idx);
          }}
        >
          {i}
        </ClickButton>
      ))} */}
    </div>
  );
}
