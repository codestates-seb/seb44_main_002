import { Link } from 'react-router-dom';

import Card from '../../components/Card/Card';

import tw from 'tailwind-styled-components';

export default function Recommend({ cocktailDetail }) {
  return (
    <RecommendContainer>
      <RecommentP>이런 칵테일은 어떠세요?</RecommentP>
      <CardContainer>
        {cocktailDetail.recommends.map((ele) => {
          const item = {
            itemid: ele.cocktailId,
            img: ele.imageUrl,
            title: ele.name,
          };
          return (
            <Link to={`/detail/${ele.cocktailId}`} key={ele.cocktailId}>
              <Card item={item} isBookmarked={ele.isBookmarked} />
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
justify-around
mt-14
`;
