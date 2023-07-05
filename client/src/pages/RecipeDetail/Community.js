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
                <div>
                  <CommentWriter>{ele.name}</CommentWriter>
                  <CommentContent>{ele.content}</CommentContent>
                  <CommentDate>{ele.date}</CommentDate>
                </div>
                {ele.userId === 3 ? (
                  <div>
                    <CommentButton>삭제하기</CommentButton>
                    <CommentButton>수정하기</CommentButton>
                    <CommentButton>답변하기</CommentButton>
                  </div>
                ) : (
                  <CommentButton>답변하기</CommentButton>
                )}
              </CommentContainer>
              {ele.replies.map((rp) => {
                return (
                  <ReplyContainer key={rp.userId}>
                    <div>
                      <CommentWriter>{rp.name}</CommentWriter>
                      <CommentContent>
                        {'@' + rp.taggedUserName + ' ' + rp.content}
                      </CommentContent>
                      <CommentDate>{rp.date}</CommentDate>
                    </div>
                    <CommentButton>답변하기</CommentButton>
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
`;
const InputTextArea = tw.textarea`
h-24 
w-[calc(100%-100px)]
bg-transparent 
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
`;
const CommentContainer = tw.div`
flex
items-end
justify-between
py-3
border-b-[1px]
border-gray-300/50
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
`;
