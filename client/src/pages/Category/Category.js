import { useState } from 'react';
import Card from '../../components/Card/Card';
import Filter from './Filter';

export default function Category() {
  //선택된 카테고리
  const [type, setType] = useState(null);

  const isBookmarked = true;
  const item = {
    itemid: '99',
    img: 'images/cocktailSample.jpg',
    title: '타이틀',
  };
  return (
    <div className="bg-gradient-to-r from-gradi-to to-gradi-from w-screen h-screen flex items-center justify-center">
      <Filter setType={setType} />
      {/* <Container>
          <ListContainer>
            {dataToRender.slice(0, count).map((item) => (
              <Item
                key={item.id}
                item={item}
                isBookmarked={bookmarks.hasOwnProperty(item.id)}
              />
            ))}
          </ListContainer>
        </Container>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <Target ref={target} isLoading={isLoading} fullyLoaded={fullyLoaded} />
        )} */}
      <Card item={item} isBookmarked={isBookmarked} />
    </div>
  );
}
