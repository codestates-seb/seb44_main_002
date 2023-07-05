import { useState } from 'react';

import tw from 'tailwind-styled-components';

export default function Process({ cocktailDetail }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  return (
    <ProcessContainer>
      <ProcessHeader>
        <p>제조과정</p>
        <ProcessHr />
      </ProcessHeader>
      {cocktailDetail.recipe.map((ele, idx) => {
        return (
          <ProcessP
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            {hoveredIndex === idx ? (
              <HoverdNum>{idx + 1}</HoverdNum>
            ) : (
              <ProcessNum>{idx + 1}</ProcessNum>
            )}
            <p>{ele}</p>
          </ProcessP>
        );
      })}
    </ProcessContainer>
  );
}
const ProcessContainer = tw.div`
mt-14
pb-4
text-[#7b7b7b]
text-xs
border-b-[1px]
border-[#7b7b7b]/50
`;
const ProcessHeader = tw.div`
flex
items-center
`;
const ProcessHr = tw.hr`
ml-2 
border-1 
border-solid 
border-[#7b7b7b]/50
w-[calc(100%-53px)]
`;
const ProcessP = tw.div`
flex
mt-2
hover:text-pointPurple-100
`;
const ProcessNum = tw.p`
flex
items-center
mr-2
px-1
py-0.5
border-[1px] 
border-[#7b7b7b]/50
h-5
text-[10px]
`;
const HoverdNum = tw(ProcessNum)`
border-pointPurple-100
`;
