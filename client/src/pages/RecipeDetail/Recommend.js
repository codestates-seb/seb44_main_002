import { Link } from 'react-router-dom';

import Card from '../../components/Card/Card';

import tw from 'tailwind-styled-components';
import { useState } from 'react';

export default function Recommend({ cocktailDetail }) {
  const [recommends, setRecommends] = useState(cocktailDetail);
  console.log(recommends);
  return (
    <RecommendContainer>
      <RecommentP>이런 칵테일은 어떠세요?</RecommentP>
      <CardContainer>
        {recommends.map((ele) => {
          return (
            <Link to={`/detail/${ele.cocktailId}`} key={ele.cocktailId}>
              <div className="mb-12 mr-4">
                <Card item={ele} />
              </div>
            </Link>
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
