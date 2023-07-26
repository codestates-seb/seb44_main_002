import { useState, useEffect } from 'react';
import RankingCard from './RankingCard';
import { useSelector } from 'react-redux';
import { useLogout } from '../../../hook/useLogout';
import tw from 'tailwind-styled-components';
import { RankingApi } from '../../../api/RankingApi';
import { ALERT_MESSAGE } from '../../../constants/constants';

export default function Ranking({ error, setError }) {
  const name = localStorage.getItem('name');
  const age = localStorage.getItem('age');
  const ageRange = Math.floor(age / 10) * 10;
  const gender = localStorage.getItem('gender');

  //console.log(ageRange);
  const [data, setData] = useState({
    totalRank: null,
    signedUserRank: null,
  });
  const isLogin = useSelector((state) => state.isLogin.isLogin);

  const logout = useLogout();
  useEffect(() => {
    // rankingApi fetch
    RankingApi(isLogin)
      .then((json) => {
        if (json === 401) {
          alert(ALERT_MESSAGE.TOKEN_OVER);
          logout();
          return;
        }
        return json;
      })
      .then((json) => json.json())
      .then((json) => {
        if (json.totalRank.length === 0) {
          setError(true);
        } else if (json.signedUserRank === undefined) {
          setError(false);
          setData({ ...data, totalRank: json.totalRank });
        } else {
          setError(false);
          setData({
            ...data,
            totalRank: json.totalRank,
            signedUserRank: json.signedUserRank,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, [isLogin]);

  return (
    <Container className={isLogin ? 'h-[700px]' : 'h-[500px]'}>
      {/* 가장 핫한 레시피글만 모아봤어요!  */}
      <Title>많은 분들이 저장한 칵테일 레시피에요!</Title>
      <ItemContainer className="mb-2">
        {data.totalRank &&
          data.totalRank.map((item, index) => (
            <RankingCard key={index} item={item} idx={index} />
          ))}
        {error && (
          <div className="text-error text-4xl max-[768px]:text-xl">
            이런! 서버에 문제가 생긴 것 같아요
          </div>
        )}
      </ItemContainer>
      {/* 내 동년배들은 이런거 좋아한다더라! */}
      <Title className={`${!isLogin && 'hidden'} mt-16`}>
        {`${name}님과 같은 ${ageRange}대 ${
          gender === 'female' ? '여성' : '남성'
        }분들이 많이 저장한 칵테일 레시피에요!`}
      </Title>
      <ItemContainer className={`${!isLogin && 'hidden'}`}>
        {data.signedUserRank &&
          data.signedUserRank.map((item, index) => (
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

const Container = tw.div`flex flex-col text-white h-[600px] mt-[70px] w-screen max-[884px]:h-full`;
const Title = tw.div` drop-shadow-3xl flex flex-[1] mb-14 font-bold text-2xl ml-24 max-[884px]:justify-center max-[884px]:ml-0 max-[884px]:mb-10`;
const ItemContainer = tw.div`drop-shadow-3xl flex flex-[10] mb-24 justify-around items-center max-[884px]:flex-col max-[884px]:w-full max-[884px]:mb-12`;
