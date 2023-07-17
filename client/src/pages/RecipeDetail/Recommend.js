import { Link } from 'react-router-dom';

import Card from '../../components/Card/Card';

import tw from 'tailwind-styled-components';
import { useEffect, useState } from 'react';

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
            //북마크 클릭시 link 가 이동해서 card 안에 navigate(`/detail/${item.cocktailId}`)으로 수정했습니다.
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
