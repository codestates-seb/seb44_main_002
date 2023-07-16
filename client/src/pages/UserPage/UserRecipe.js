import Card from '../../components/Card/Card';
import OwnRecipeCard from '../../components/Card/OwnRecipeCard';
import tw from 'tailwind-styled-components';

export default function UserRecipe({ userInfo }) {
  return (
    <Container>
      <Title>자신의 레시피</Title>
      <Bookmark>
        {userInfo.bookmarked.map((ele) => {
          return (
            <>
              <CardContainer key={ele.cocktailId}>
                <OwnRecipeCard item={ele} />
              </CardContainer>
            </>
          );
        })}
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
`;
const Bookmark = tw.div`
flex
flex-wrap
mt-12
max-md:justify-around
`;
const CardContainer = tw.div`
mb-12
mr-6
`;
