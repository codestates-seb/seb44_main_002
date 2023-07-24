import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

// import { RootState } from '../../redux/store';

const CHANGE_PAGE_LIST_CNT = 4;
const PAGE_BLOCK_SIZE = 5;

export default function Pagination({ currentPage, setCurrentPage, pageInfo }) {
  const navigate = useNavigate();
  const [paginationList, setPaginationList] = useState([]);

  const createPageList = (current) => {
    return Array.from({ length: PAGE_BLOCK_SIZE }, (_, idx) => {
      return current - 2 + idx;
    });
  };

  const handleButtonClick = (page) => {
    setCurrentPage(page);
    // navigate(`?page=${page}`);
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

  useEffect(() => {
    setPaginationList(() => updatePaginationList());
  }, [currentPage, searchKeyword]);

  useEffect(() => {
    console.log(pageInfo);
  });

  return (
    <>
      <div className="float-left">
        {currentPage > 1 && (
          <button
            onClick={() => {
              handleButtonClick(currentPage - 1);
            }}
          >
            Prev
          </button>
        )}
        {currentPage >= PAGE_BLOCK_SIZE &&
          PAGE_BLOCK_SIZE !== pageInfo.totalPages && (
            <>
              <button
                onClick={() => {
                  handleButtonClick(1);
                }}
              >
                1
              </button>
              {/* <PaginationExtension>...</PaginationExtension> */}
            </>
          )}
        {paginationList &&
          paginationList.map((page) => {
            return (
              <button
                className={`${
                  page === currentPage
                    ? 'text-white bg-orange-point hover:bg-orange-point border-transparent hover:border-transparent'
                    : ''
                }`}
                onClick={() => {
                  handleButtonClick(page);
                }}
                key={page}
              >
                {page}
              </button>
            );
          })}
        {currentPage <
          pageInfo.totalPages - (pageInfo.totalPages % PAGE_BLOCK_SIZE) &&
          !(pageInfo.totalPages <= PAGE_BLOCK_SIZE) && (
            <>
              {/* <PaginationExtension>...</PaginationExtension> */}
              <button
                onClick={() => {
                  handleButtonClick(pageInfo.totalPages);
                }}
              >
                {pageInfo.totalPages}
              </button>
            </>
          )}
        {currentPage < pageInfo.totalPages && (
          <button
            onClick={() => {
              handleButtonClick(currentPage + 1);
            }}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}
