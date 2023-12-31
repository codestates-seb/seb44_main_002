import { useState } from 'react';

import { ALERT_MESSAGE } from '../../constants/constants';

import tw from 'tailwind-styled-components';

export default function Process({ cocktailDetail }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const clickCopy = () => {
    let formattedRecipe = '';
    cocktailDetail.recipe.forEach((step, index) => {
      formattedRecipe += `${index + 1}. ${step.process}\n`;
    });
    navigator.clipboard
      .writeText(formattedRecipe)
      .then(() => {
        alert(ALERT_MESSAGE.RECIPE_CLIPBOARD);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <ProcessContainer>
        <div className="text-white flex justify-end mt-4 text-sm flex-wrap">
          <p className="text-error">{`# ${cocktailDetail.liquor}`}</p>
          {cocktailDetail.tags.map((ele, idx) => {
            return (
              <p className="ml-3" key={ele + idx}>
                {ele.tag}
              </p>
            );
          })}
        </div>
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
              <p>{ele.process}</p>
            </ProcessP>
          );
        })}
      </ProcessContainer>
      <div className="text-right mt-4">
        <button
          className="text-gray-300 cursor-pointer border-[1px] border-gray-300 px-3 py-2 rounded-md hover:text-white hover:border-white"
          onClick={clickCopy}
        >
          제조과정 복사
        </button>
      </div>
    </>
  );
}
const ProcessContainer = tw.div`
pb-4
text-gray-200
text-sm
border-b
border-gray-300/50
`;
const ProcessHeader = tw.div`
flex
items-center
mt-14
`;
const ProcessHr = tw.hr`
ml-2 
border
border-solid 
border-gray-300/50
w-[calc(100%-60px)]
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
border
border-gray-300/50
h-5
text-[10px]
`;
const HoverdNum = tw(ProcessNum)`
border-pointPurple-100
`;
