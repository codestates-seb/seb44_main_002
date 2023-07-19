import { useEffect, useState } from 'react';

import Card from '../../components/Card/Card';

import tw from 'tailwind-styled-components';

export default function Recommend({ cocktailDetail }) {
  const [recommends, setRecommends] = useState(cocktailDetail);

  useEffect(() => {
    setRecommends(cocktailDetail);
  }, [cocktailDetail]);

  return (
    <RecommendContainer>
      <RecommentP>이런 칵테일은 어떠세요?</RecommentP>
      <CardContainer>
        {recommends.map((ele) => {
          return (
            <div className="mb-12 mr-4" key={ele.cocktailId}>
              <Card item={ele} setData={setRecommends} data={recommends} />
            </div>
          );
        })}
      </CardContainer>
    </RecommendContainer>
  );
}
const RecommendContainer = tw.div`
mt-24
`;
const RecommentP = tw.p`
text-xl
text-gray-200
font-bold
text-center
`;
const CardContainer = tw.div`
flex
flex-wrap
justify-around
mt-14
`;
