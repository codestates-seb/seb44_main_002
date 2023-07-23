import { useState, useEffect } from 'react';
import RankingCard from './RankingCard';
import { useSelector } from 'react-redux';

import tw from 'tailwind-styled-components';
import { RankingApi } from '../../../api/RankingApi';

export default function Ranking({ error, setError }) {
  const [data, setData] = useState(null);
  const isLogin = useSelector((state) => state.isLogin.isLogin);

  useEffect(() => {
    // rankingApi fetch
    RankingApi(isLogin)
      .then((json) => {
        if (json.bestCocktails.length === 0) {
          setError(true);
        } else {
          setError(false);
          setData(json);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, [isLogin]);

  return (
    <Container>
      <Title>가장 핫한 레시피글만 모아봤어요!</Title>
      <ItemContainer>
        {data &&
          data.bestCocktails.map((item, index) => (
            <RankingCard key={index} item={item} idx={index} />
          ))}
        {error && (
          <div className="text-error text-4xl max-[768px]:text-xl">
            이런! 서버에 문제가 생긴 것 같아요
          </div>
        )}
      </ItemContainer>
    </Container>
  );
}

const Container = tw.div`flex flex-col text-white h-[500px] mt-[70px] w-screen max-[884px]:h-full`;
const Title = tw.div`flex flex-[1] font-bold text-2xl ml-24 max-[884px]:justify-center max-[884px]:ml-0 max-[884px]:mb-10`;
const ItemContainer = tw.div`flex flex-[10] justify-around items-center max-[884px]:flex-col max-[884px]:w-full`;
