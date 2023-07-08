import tw from 'tailwind-styled-components';

export default function UserInfo({ userInfo }) {
  const convertNum = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  return (
    <Container>
      <InfoContainer>
        <img
          className="w-[140px] h-[140px]"
          src={`/images/user/${
            userInfo.gender === '남' ? 'user_boy.png' : 'user_girl.png'
          }`}
          alt="user img"
        />
        <UserContainer>
          <FlexContainer>
            <p>{`안녕하세요. ${userInfo.name}님.`}</p>
            <AdminP>admin 권한</AdminP>
          </FlexContainer>
          <InnerInfo>
            <InfoComponent>
              <UpInfoP>{convertNum(userInfo.subscribedCount)}</UpInfoP>
              <p>구독자수</p>
            </InfoComponent>
            <InfoComponent>
              <UpInfoP>{userInfo.age}</UpInfoP>
              <p>나이</p>
            </InfoComponent>
            <InfoComponent>
              <UpInfoP>{userInfo.email.split('@')[0]}</UpInfoP>
              <p>{'@' + userInfo.email.split('@')[1]}</p>
            </InfoComponent>
            <InfoComponent>
              <Button>구독하기</Button>
            </InfoComponent>
          </InnerInfo>
        </UserContainer>
      </InfoContainer>
      <ButtonContainer>
        <Button>수정하기</Button>
        <Button>탈퇴하기</Button>
      </ButtonContainer>
    </Container>
  );
}
const FlexContainer = tw.div`
flex
`;
const Container = tw.div`
flex
justify-between
w-full
`;
const InfoContainer = tw.div`
flex
text-white
`;
const UserContainer = tw.div`
pt-8
`;
const AdminP = tw.p`
mx-12 
px-3 
bg-yellow-100/60
`;
const InnerInfo = tw.div`
flex mt-6
`;
const InfoComponent = tw.div`
text-center 
mr-10
`;
const UpInfoP = tw.p`
text-5xl
mb-4
`;
const ButtonContainer = tw.div`
flex
flex-col
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
`;
