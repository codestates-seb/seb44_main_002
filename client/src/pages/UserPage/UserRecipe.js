import OwnRecipeCard from '../../components/Card/OwnRecipeCard';

import tw from 'tailwind-styled-components';

export default function UserRecipe({ userInfo, localData }) {
  return (
    <Container>
      <Title>
        {userInfo.userId === localData.userId ? '자신' : userInfo.name + ' 님'}
        의 레시피
      </Title>
      <Bookmark>
        {userInfo.cocktails.length === 0 ? (
          <p className="text-white mx-auto">작성한 레시피가 없습니다.</p>
        ) : (
          userInfo.cocktails.map((ele) => {
            return (
              <>
                <CardContainer key={ele.cocktailId}>
                  <OwnRecipeCard item={ele} />
                </CardContainer>
              </>
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
