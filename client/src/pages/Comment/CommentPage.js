import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/api';
import { useLogout } from '../../hook/useLogout';
import tw from 'tailwind-styled-components';
import CommentValid from '../../components/Validation/CommentValidation';

export default function CommentPage() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { state } = useLocation();
  const [isCommented, setIsCommented] = useState(state[0]);
  const commentdata = state[1];
  const cocktailId = state[2];
  const [isValid, setIsValid] = useState(true);
  const [comment, setComment] = useState(commentdata.content);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const logout = useLogout();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isvalid = CommentValid(comment, setIsValid);
    //유효성검사가 통과되었다면
    if (isvalid) {
      //댓글 수정이라면
      if (isCommented) {
        try {
          const response = await api.patchCommentApi(
            commentdata.commentId,
            comment
          );
          if (response === 401) {
            alert('토큰만료로 로그아웃되었습니다.');
            logout();
          }
          if (response === 200) {
            setErrorMsg(null);
            navigate(`/detail/${cocktailId}`);
            alert('수정했습니다!');
          }
        } catch (error) {
          console.log(error);
          navigate('/error');
        }
        //대댓글 수정이라면
      } else {
        fetch(`${BASE_URL}replies/${commentdata.replyId}`, {
          method: 'PATCH',
          headers: {
            //'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json', // json fetch시
          },
          body: JSON.stringify({
            userId: commentdata.userId,
            taggedUserId: commentdata.taggedUserInfo.taggedUserId,
            taggedUserName: commentdata.taggedUserInfo.taggedUserName,
            content: comment,
          }),
        })
          .then((data) => {
            if (data.status === 200) {
              // 응답이 성공적인 경우
              console.log('요청이 성공했습니다.');
              // console.log(data);
              setErrorMsg(null);
              navigate(`/detail/${cocktailId}`);
              alert('수정했습니다!');
            } else {
              // 응답이 실패한 경우
              console.log('요청이 실패했습니다.');
            }
          })
          .catch((error) => {
            console.log('에러', error);
            navigate('/error');
          });
      }
    } else {
      console.log('유효성검사에 걸렸습니다.');
      setErrorMsg('1~200사이 글자로 입력해주세요');
    }
  };

  return (
    <Container>
      {/* 로고 */}
      <button onClick={() => navigate('/')}>
        <LogoImg src="/images/logo.webp" alt="로고" />
      </button>

      <SectionDiv>
        <Title>댓글 수정</Title>
        {/* 태그된 유저이름 */}
        <TaguserH3>
          {!isCommented && <p>@{commentdata.taggedUserInfo.taggedUserName}</p>}
        </TaguserH3>

        <div>
          <InputTextArea
            placeholder="댓글을 입력하세요."
            onChange={(e) => setComment(e.target.value)}
            className={
              !isValid
                ? 'border-error border-[1px] w-[400px] h-[200px] mb-[2rem] text-white '
                : 'border border-solid border-gray-200 w-[400px] h-[200px] mb-[2rem] text-white'
            }
            value={comment}
          />
          {!isValid && (
            <p className=" text-error ">1~200자 범위내로 작성해주세요</p>
          )}
        </div>
        <InputButton onClick={handleSubmit}>전송하기</InputButton>
      </SectionDiv>
    </Container>
  );
}
const Container = tw.div`
relative bg-gradient-to-r from-gradi-to to-gradi-from w-screen h-[100vh] pt-[5rem] flex flex-col  items-center 
`;
const LogoImg = tw.img`
w-[30px] mb-[2rem] 
`;
const SectionDiv = tw.section`
w-[520px] h-[520px] rounded-2xl bg-[#000000]/40 mb-[10rem] flex flex-col items-center
`;
const Title = tw.h1`
mt-[30px] text-gray-200 font-bold text-[20px] mb-[2rem]
`;
const TaguserH3 = tw.h3`
text-white flex  w-[400px] mb-2
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
