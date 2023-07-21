import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import CommentValid from '../../components/Validation/CommentValidation';
import RecipeApi from '../../api/RecipeApi';

import tw from 'tailwind-styled-components';

export default function Community({
  cocktailDetail,
  getTime,
  isLogin,
  localData,
}) {
  const navigate = useNavigate();

  const [tag, setTag] = useState({ userId: '', userName: '' });
  const [comment, setComment] = useState('');
  const [commentId, setCommentId] = useState(0);
  const [isValid, setIsValid] = useState(true);

  // 댓글 등록
  const postComment = async () => {
    try {
      const response = await RecipeApi.PostComments(cocktailDetail.cocktailId, {
        content: comment,
      });
      if (response === 401) {
        alert('토큰만료로 로그아웃되었습니다.');
        logout();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 대댓글 등록
  const postReply = async () => {
    try {
      const repliInfo = {
        taggedUserId: tag.userId,
        taggedUserName: tag.userName,
        content: comment,
      };
      const response = await RecipeApi.PostReplys(commentId, repliInfo);
      if (response === 401) {
        alert('토큰만료로 로그아웃되었습니다.');
        logout();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 댓글 삭제
  const deleteComment = async (commentId) => {
    try {
      const response = await RecipeApi.deleteComments(
        commentId,
        cocktailDetail.cocktailId
      );
      if (response === 401) {
        alert('토큰만료로 로그아웃되었습니다.');
        logout();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 대댓글 삭제
  const deleteReply = async (replyId) => {
    try {
      const response = await RecipeApi.deleteReplies(replyId);
      if (response === 401) {
        alert('토큰만료로 로그아웃되었습니다.');
        logout();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 댓글, 대댓글 작성
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      alert('로그인 후 이용해주세요');
      return;
    }

    // 유효성 검사
    const isValid = await CommentValid(comment, setIsValid);
    if (!isValid) return;

    if (isValid) {
      if (tag.userId === '') {
        postComment();
      } else {
        postReply();
      }
    }
  };

  // 대댓글을 달 댓글에 대한 정보 수정
  const changeTag = (userId, userName, commentId) => {
    setTag({ userId: userId, userName: userName });
    setCommentId(commentId);
  };

  // 답변 선택시 답변 구역으로 스크롤 이동
  const scrollToReply = () => {
    const targetDiv = document.getElementById('reply');
    if (targetDiv) {
      const offset = targetDiv.offsetTop - 20;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  const clickReply = (userId, userName, commentId) => {
    changeTag(userId, userName, commentId);
    scrollToReply();
  };

  return (
    <CommunityContainer>
      <CommunityHeader id="reply">댓글을 작성해보세요!</CommunityHeader>
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
                {ele.activeUserWritten ? (
                  <Link to={`/userpage/${ele.userId}`}>
                    <CommentWriter>{ele.userName}</CommentWriter>
                  </Link>
                ) : (
                  <CommentWriter>탈퇴한 유저</CommentWriter>
                )}
                <CommentContent>{ele.content}</CommentContent>
                <CommentAndButton>
                  <CommentDate>{getTime(ele.createdAt)}</CommentDate>
                  <ButtonContainer>
                    {(localData.IsAdmin || ele.userId === localData.userId) && (
                      <>
                        <CommentButton
                          onClick={() => deleteComment(ele.commentId)}
                        >
                          삭제하기
                        </CommentButton>
                        <CommentButton
                          onClick={() =>
                            navigate('/comment', {
                              state: [true, ele, cocktailDetail.cocktailId],
                            })
                          }
                        >
                          수정하기
                        </CommentButton>
                      </>
                    )}
                    {ele.activeUserWritten && (
                      <CommentButton
                        onClick={() =>
                          clickReply(ele.userId, ele.userName, ele.commentId)
                        }
                      >
                        답변하기
                      </CommentButton>
                    )}
                  </ButtonContainer>
                </CommentAndButton>
              </CommentContainer>
              {ele.replies.map((rp) => {
                return (
                  <ReplyContainer key={rp.userId}>
                    {rp.activeUserWritten ? (
                      <Link to={`/userpage/${rp.userId}`}>
                        <CommentWriter>{rp.userName}</CommentWriter>
                      </Link>
                    ) : (
                      <CommentWriter>탈퇴한 유저</CommentWriter>
                    )}
                    <CommentContent>
                      {'@' +
                        rp.taggedUserInfo.taggedUserName +
                        ' ' +
                        rp.content}
                    </CommentContent>
                    <CommentAndButton>
                      <CommentDate>{getTime(rp.createdAt)}</CommentDate>
                      <ButtonContainer>
                        {(localData.IsAdmin ||
                          rp.userId === localData.userId) && (
                          <>
                            <CommentButton
                              onClick={() => deleteReply(rp.replyId)}
                            >
                              삭제하기
                            </CommentButton>
                            <CommentButton
                              onClick={() =>
                                navigate('/comment', {
                                  state: [false, rp, cocktailDetail.cocktailId],
                                })
                              }
                            >
                              수정하기
                            </CommentButton>
                          </>
                        )}
                        {rp.activeUserWritten && (
                          <CommentButton
                            onClick={() =>
                              clickReply(rp.userId, rp.userName, ele.commentId)
                            }
                          >
                            답변하기
                          </CommentButton>
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
inline-block
text-gray-200 
text-xs
`;
const CommentContent = tw.p`
w-[calc(100%-215px)]
text-gray-100
text-sm
max-md:w-full
`;
const CommentDate = tw.p`
w-[calc(100%-215px)]
mt-1.5
text-gray-200 
text-xs
max-md:w-full
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
