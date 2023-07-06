import tw from 'tailwind-styled-components';

export default function Community({ cocktailDetail }) {
  return (
    <CommunityContainer>
      <CommunityHeader>댓글을 작성해보세요!</CommunityHeader>
      <InputContainer>
        <InputTextArea placeholder="댓글을 입력하세요." />
        <InputButton>전송하기</InputButton>
      </InputContainer>
      <div>
        {cocktailDetail.comments.map((ele) => {
          return (
            <>
              <CommentContainer key={ele.userId}>
                <CommentWriter>{ele.name}</CommentWriter>
                <CommentContent>{ele.content}</CommentContent>
                <CommentAndButton>
                  <CommentDate>{ele.date}</CommentDate>
                  <ButtonContainer>
                    {ele.userId === 3 ? (
                      <>
                        <CommentButton>삭제하기</CommentButton>
                        <CommentButton>수정하기</CommentButton>
                        <CommentButton>답변하기</CommentButton>
                      </>
                    ) : (
                      <CommentButton>답변하기</CommentButton>
                    )}
                  </ButtonContainer>
                </CommentAndButton>
              </CommentContainer>
              {ele.replies.map((rp) => {
                return (
                  <ReplyContainer key={rp.userId}>
                    <CommentWriter>{rp.name}</CommentWriter>
                    <CommentContent>
                      {'@' + rp.taggedUserName + ' ' + rp.content}
                    </CommentContent>
                    <CommentAndButton>
                      <CommentDate>{rp.date}</CommentDate>
                      <ButtonContainer>
                        {rp.userId === 3 ? (
                          <>
                            <CommentButton>삭제하기</CommentButton>
                            <CommentButton>수정하기</CommentButton>
                            <CommentButton>답변하기</CommentButton>
                          </>
                        ) : (
                          <CommentButton>답변하기</CommentButton>
                        )}
                      </ButtonContainer>
                    </CommentAndButton>
                  </ReplyContainer>
                );
              })}
            </>
          );
        })}
      </div>
    </CommunityContainer>
  );
}

const CommunityContainer = tw.div`
mt-24
`;
const CommunityHeader = tw.p`
text-xl 
text-gray-200 
text-center
font-bold 
`;
const InputContainer = tw.div`
flex 
p-4 
my-5 
border-[1px] 
border-gray-300/50 
text-xs 
text-gray-200 
items-end
max-md:flex-col
`;
const InputTextArea = tw.textarea`
h-24 
w-[calc(100%-100px)]
bg-transparent 
max-md:w-full
`;
const InputButton = tw.button`
h-8 
w-20 
ml-6
pb-0.5 
border-[1px] 
border-gray-400
rounded-md  
inline-block 
text-gray-400
hover:text-pointPurple-100
hover:border-pointPurple-100
max-md:mt-4
`;
const CommentContainer = tw.div`
flex-col
items-end
justify-between
py-3
border-b-[1px]
border-gray-300/50
max-md:flex-col
max-md:items-start
`;
const CommentWriter = tw.p`
text-gray-200 
text-xs
`;
const CommentContent = tw.p`
text-gray-100
text-sm
`;
const CommentDate = tw.p`
mt-1.5
text-gray-200 
text-xs
`;
const CommentAndButton = tw.div`
flex 
justify-between 
max-md:flex-col
`;
const ButtonContainer = tw.div`
mt-3 
max-md:mt-0 
max-md:text-right
`;
const ReplyContainer = tw(CommentContainer)`
ml-12
`;
const CommentButton = tw.button`
w-13
h-7
ml-2
border-[1px]
border-gray-400
rounded-md
text-xs
text-gray-400
px-2
hover:text-white
hover:border-white
max-md:ml-0
max-md:mr-1
max-md:mt-4
`;
