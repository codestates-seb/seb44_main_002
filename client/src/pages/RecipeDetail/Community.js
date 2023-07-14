import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CommentValid from '../../components/Validation/CommentValidation';
import RecipeApi from './RecipeApi';

import tw from 'tailwind-styled-components';

export default function Community({ cocktailDetail, userInfo, getTime }) {
  const [tag, setTag] = useState({ userId: '', userName: '' });
  const [comment, setComment] = useState('');
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  // 댓글 등록
  const postComment = async () => {
    try {
      const response = await RecipeApi.PostComments(
        cocktailDetail.cocktailId,
        { content: comment },
        userInfo.accessToken
      );
    } catch (error) {
      console.log(error);
    }
  };

  // 대댓글 등록
  const postReply = async () => {
    try {
      const repliInfo = {
        userId: userInfo.UserId,
        taggedUserId: tag.userId,
        taggedUserName: tag.userName,
        content: comment,
      };
      const response = await RecipeApi.PostReplys(
        cocktailDetail.cocktailId,
        repliInfo,
        userInfo.accessToken
      );
    } catch (error) {
      console.log(error);
    }
  };

  // 댓글 삭제
  const deleteComment = async (commentId) => {
    try {
      const response = await RecipeApi.deleteComments(
        commentId,
        userInfo.accessToken
      );
    } catch (error) {
      console.log(error);
      // navigate('/catogory');
      location.reload();
    }
  };

  // 대댓글 삭제
  const deleteReply = async (replyId) => {
    try {
      const response = await RecipeApi.deleteReplies(
        replyId,
        userInfo.accessToken
      );
    } catch (error) {
      console.log(error);
      location.reload();
    }
  };

  // 댓글, 대댓글 작성
  const handleSubmit = (e) => {
    e.preventDefault();

    if (userInfo.UserId === null) {
      alert('로그인 후 이용해주세요');
      return;
    }

    CommentValid(comment, setIsValid);

    if (!isValid) return;

    if (tag.userId === '') {
      postComment();
    } else {
      postReply();
    }
  };

  const changeTag = (userId, userName) => {
    // 본인 태그 방지
    if (userId !== 1) {
      setTag({ userId: userId, userName: userName });
    }
  };

  return (
    <CommunityContainer>
      <CommunityHeader>댓글을 작성해보세요!</CommunityHeader>
      <InputContainer>
        <div className="w-[calc(100%-100px)] max-md:w-full">
          {tag.userId !== '' && (
            <TagP onClick={() => setTag({ userId: '', userName: '' })}>
              {`@${tag.userName}`}
              <span className="ml-3">x</span>
            </TagP>
          )}
          <div>
            <InputTextArea
              placeholder="댓글을 입력하세요."
              onChange={(e) => setComment(e.target.value)}
              className={!isValid && 'border-red-500 border-[1px]'}
            />
            {!isValid && (
              <p className="text-red-500">1~200자 범위내로 작성해주세요</p>
            )}
          </div>
        </div>
        <InputButton onClick={handleSubmit}>전송하기</InputButton>
      </InputContainer>
      <div>
        {cocktailDetail.comments.map((ele) => {
          return (
            <>
              <CommentContainer key={ele.userId}>
                <CommentWriter>{ele.userName}</CommentWriter>
                <CommentContent>{ele.content}</CommentContent>
                <CommentAndButton>
                  <CommentDate>{getTime(ele.createdAt)}</CommentDate>
                  <ButtonContainer>
                    {ele.userId === userInfo.UserId && (
                      <>
                        <CommentButton
                          onClick={() => deleteComment(ele.commentId)}
                        >
                          삭제하기
                        </CommentButton>
                        <CommentButton
                          onClick={() =>
                            navigate('/comment', {
                              state: [true, ele],
                            })
                          }
                        >
                          수정하기
                        </CommentButton>
                      </>
                    )}
                    <CommentButton
                      onClick={() => changeTag(ele.userId, ele.userName)}
                    >
                      답변하기
                    </CommentButton>
                  </ButtonContainer>
                </CommentAndButton>
              </CommentContainer>
              {ele.replies.map((rp) => {
                return (
                  <ReplyContainer key={rp.userId}>
                    <CommentWriter>{rp.userName}</CommentWriter>
                    <CommentContent>
                      {'@' +
                        rp.taggedUserInfo[0].taggedUserName +
                        ' ' +
                        rp.content}
                    </CommentContent>
                    <CommentAndButton>
                      <CommentDate>{getTime(rp.createdAt)}</CommentDate>
                      <ButtonContainer>
                        {rp.userId === userInfo.UserId && (
                          <>
                            <CommentButton
                              onClick={() => deleteReply(rp.replyId)}
                            >
                              삭제하기
                            </CommentButton>
                            <CommentButton
                              onClick={() =>
                                navigate('/comment', {
                                  state: [false, rp],
                                })
                              }
                            >
                              수정하기
                            </CommentButton>
                          </>
                        )}
                        <CommentButton
                          onClick={() => changeTag(rp.userId, rp.userName)}
                        >
                          답변하기
                        </CommentButton>
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
const TagP = tw.p`
inline-block
px-2 
py-1.5 
mb-4 
border-[1px] 
border-gray-400 
rounded-md 
cursor-pointer
hover:text-white 
hover:border-white
`;
const InputTextArea = tw.textarea`
h-24 
w-full
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
