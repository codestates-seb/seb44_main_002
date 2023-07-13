import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import CommentValid from '../../components/Validation/CommentValidation';
// [
//   {
//       “commentId” : 1,
//       “userId” : 1,
//       “userName” : “kim”,
//       “content” : “blah”,
//       “replies” : [
//           {
//                   “replyId” : 1,
//                   “userId” : 1,
//                   “userName” : “jjigae”,
//                   “taggedUserInfo” : [
//                            {
//                                          “taggedUserId” : 2,
//                                          “taggedUserName” : “kimchi”,
//                             }
//                    ],
//                   “content” : “shut up”,
//                   “createdAt” : 2000-00-00T00:00:00
//                   “modifiedAt” : 2000-00-00T00:00:00
//       ],
//       “createdAt” : 2000-00-00T00:00:00
//   }
// ],
export default function CommentPage() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { state } = useLocation();
  const [isCommented, setIsCommented] = useState(state[0]);
  const commentdata = state[1];
  const [isValid, setIsValid] = useState(true);
  const [comment, setComment] = useState(commentdata.content);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  console.log(state);
  const handleSubmit = (e) => {
    e.preventDefault();
    CommentValid(comment, setIsValid);
    //유효성검사가 통과되었다면
    if (isValid) {
      //댓글 수정이라면
      if (isCommented) {
        fetch(`${BASE_URL}comments/${commentdata.commentId}`, {
          method: 'PATCH',
          headers: {
            //'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json', // json fetch시
          },
          body: JSON.stringify({ content: comment }),
        })
          .then((data) => {
            if (data.status === 200) {
              // 응답이 성공적인 경우
              console.log('요청이 성공했습니다.');
              // console.log(data);
              setErrorMsg(null);
              navigate('/');
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
            taggedUserId: commentdata.taggedUserId,
            taggedUserName: commentdata.taggedUserName,
            content: commentdata.content,
          }),
        })
          .then((data) => {
            if (data.status === 200) {
              // 응답이 성공적인 경우
              console.log('요청이 성공했습니다.');
              // console.log(data);
              setErrorMsg(null);
              navigate('/');
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
    <div className="relative bg-gradient-to-r from-gradi-to to-gradi-from w-screen h-100% pt-[5rem] flex flex-col  items-center ">
      <button onClick={() => navigate('/')}>
        <img
          src="/images/logo.webp"
          alt="로고"
          className="w-[30px] mb-[2rem] "
        />
      </button>

      <section className="w-[520px] h-[520px] rounded-2xl bg-[#000000]/40 mb-[10rem] flex flex-col items-center">
        <h1 className="mt-[30px] text-gray-200 font-bold text-[20px] mb-[2rem]">
          댓글 수정
        </h1>
        {!isCommented && (
          <p>@{commentdata[0].taggedUserInfo[0].taggedUserName}</p>
        )}
        <div>
          <InputTextArea
            placeholder="댓글을 입력하세요."
            onChange={(e) => setComment(e.target.value)}
            className={
              !isValid
                ? 'border-red-500 border-[1px]'
                : 'border border-solid border-gray-200 w-[400px] h-[200px] mb-[2rem]'
            }
            value={comment}
          />
          {!isValid && (
            <p className="text-red-500">1~200자 범위내로 작성해주세요</p>
          )}
        </div>
        {errorMsg && <p className="text-error ">{errorMsg}</p>}
        <InputButton onClick={handleSubmit}>전송하기</InputButton>
      </section>
    </div>
  );
}
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
