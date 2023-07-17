import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import HoverButton from '../../common/Buttons/HoverButton';

import './SuccessPage.css';
import Loading from '../../components/Loading';

export default function SuccessPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  setTimeout(() => {
    setIsLoading(true);
  }, 1000);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const url = `${BASE_URL}cocktails/${id}`;

  console.log(url);

  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => setUserData(json));
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="relative flex items-center justify-center w-screen h-screen overflow-hidden text-white bg-gradient-to-r from-gradi-to to-gradi-from">
          <div className="z-10 flex flex-col justify-around h-full w-96">
            <div className="flex-[1] flex justify-center items-center w-[full] h-full">
              <img
                role="presentation"
                className="w-[60px] h-[80px] cursor-pointer max-[768px]:w-[50px] max-[768px]:h-[70px]"
                src="/images/logo.webp"
                alt="img"
                onClick={() => navigate('/')}
                onKeyDown={() => navigate('/')}
              />
            </div>
            <div className="flex flex-col flex-[2] justify-around items-center">
              <img
                src={userData && userData.imageUrl}
                alt="userimg"
                className="mb-6 max-[768px]:w-[90%] rounded-full"
              />
              <div className="flex text-4xl font-bold justify-center items-center text-center max-[768px]:text-2xl">
                칵테일을 등록해주셔서 <br />
                감사합니다!
              </div>
            </div>
            <div className="flex flex-[1] justify-around items-center">
              <HoverButton
                size="h-[60px] w-[100px]"
                color="white"
                fontSize="text-2xl"
                onClick={() => navigate('/category')}
              >
                목록으로
              </HoverButton>
              <HoverButton
                color="white"
                size="w-[200px] h-[60px]"
                fontSize="text-2xl"
                onClick={() => navigate(`/detail/${userData.cocktailId}`)}
              >
                내 레시피 확인하기
              </HoverButton>
            </div>
          </div>
          {/* 파도 애니메이션 요소 */}
          <div className="absolute ocean opacity-10">
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
