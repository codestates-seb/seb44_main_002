import { Link } from 'react-router-dom';

import Card from '../../components/Card/Card';

import tw from 'tailwind-styled-components';

export default function UserBookmarked({ userInfo, localData }) {
  return (
    <Container>
      <Title>북마크 된 레시피</Title>
      <Bookmark>
        {userInfo.bookmarkedCocktails.length === 0 ? (
          <div className="text-white mx-auto text-center">
            <p>북마크 된 레시피가 없습니다.</p>
            {userInfo.userId === localData.userId && (
              <Link to={'/category'}>
                <p className="mt-2 hover:text-pointPurple-100">
                  레시피 구경가기 ➤
                </p>
              </Link>
            )}
          </div>
        ) : (
          userInfo.bookmarkedCocktails.map((ele) => {
            return (
              <CardContainer key={ele.cocktailId}>
                <Card item={ele} />
              </CardContainer>
            );
          })
        )}
      </Bookmark>
    </Container>
  );
}

const Container = tw.div`
mt-24
mx-12
`;
const Title = tw.p`
text-white
text-2xl
max-sm:text-base
`;
const Bookmark = tw.div`
flex
flex-wrap
mt-12
max-md:justify-around
max-sm:mt-8
`;
const CardContainer = tw.div`
mb-12 
mr-6
`;
