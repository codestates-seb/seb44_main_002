import tw from 'tailwind-styled-components';

export default function UserInfo({ userInfo }) {
  const convertNum = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  return (
    <Container>
      <InfoContainer>
        <UserImg
          src={`/images/user/${
            userInfo.gender === '남' ? 'user_boy.png' : 'user_girl.png'
          }`}
          alt="user img"
        />
        <UserContainer>
          <FlexContainer>
            {userInfo.userId === 1 ? (
              <p>{`안녕하세요. ${userInfo.name}님.`}</p>
            ) : (
              <p>{`${userInfo.name}님 페이지입니다.`}</p>
            )}
            {userInfo.userId !== 1 && <TitleButton>구독하기</TitleButton>}
          </FlexContainer>
          <InnerInfo>
            <InfoComponent>
              <UpInfoP>{convertNum(userInfo.subscribedCount)}</UpInfoP>
              <DownInfoP>구독자수</DownInfoP>
            </InfoComponent>
            <InfoComponent>
              <UpInfoP>{userInfo.age}</UpInfoP>
              <DownInfoP>나이</DownInfoP>
            </InfoComponent>
            <InfoComponent>
              <UpInfoP>{userInfo.email.split('@')[0]}</UpInfoP>
              <DownInfoP>{'@' + userInfo.email.split('@')[1]}</DownInfoP>
            </InfoComponent>
            {userInfo.userId !== 1 && (
              <InfoComponent>
                <SubscribeButton>구독하기</SubscribeButton>
              </InfoComponent>
            )}
          </InnerInfo>
        </UserContainer>
      </InfoContainer>
      {userInfo.userId === 1 && (
        <ButtonContainer>
          <Button>수정하기</Button>
          <Button>탈퇴하기</Button>
        </ButtonContainer>
      )}
    </Container>
  );
}
const FlexContainer = tw.div`
flex
max-sm:text-sm
`;
const Container = tw.div`
flex
justify-between
w-full
max-lg:flex-col-reverse
`;
const InfoContainer = tw.div`
flex
text-white
`;
const UserImg = tw.img`
w-[140px] 
h-[140px]
max-lg:w-[120px]
max-lg:h-[120px]
max-sm:w-[100px]
max-sm:h-[100px]
`;
const UserContainer = tw.div`
pt-8
`;
const InnerInfo = tw.div`
flex 
mt-6
`;
const InfoComponent = tw.div`
text-center 
mr-10
max-sm:mr-6
`;
const UpInfoP = tw.p`
text-5xl
mb-4
max-lg:text-3xl
max-lg:mb-2
max-sm:text-2xl
`;
const DownInfoP = tw.p`
max-lg:text-sm
max-sm:text-xs
`;
const ButtonContainer = tw.div`
flex
flex-col
max-lg:flex-row
max-lg:justify-end
`;
const Button = tw.button`
mb-2
px-6
py-2
border-[1px]
border-gray-400
rounded-md
text-xs
text-gray-400
hover:border-pointPurple-100
hover:text-pointPurple-100
max-lg:ml-2
max-sm:px-4
max-sm:py-1
`;
const SubscribeButton = tw(Button)`
max-sm:hidden
`;
const TitleButton = tw(Button)`
sm:hidden
`;
