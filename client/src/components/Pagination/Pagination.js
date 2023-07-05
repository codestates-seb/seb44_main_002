import React from 'react';

export default function Pagination() {
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
