import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import HoverButton from '../../common/Buttons/HoverButton';
import CustomInput from '../../components/Input/CustomInput';
import UseSignupValid from '../../components/Validation/SignupValidation';
import GenderRadioInput from '../../components/Input/GenderRadioInput';

import tw from 'tailwind-styled-components';
import { ALERT_MESSAGE, PATH } from '../../constants/constants';

export default function Signup() {
  const navigate = useNavigate();
  const [test, setTest] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  // 유효성검사 state
  const [isValid, setIsValid] = useState({
    name: true,
    email: true,
    password: true,
    confirmPassword: true,
    gender: true,
    age: true,
  });
  // input 값 value 저장
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 불리언값으로나옴
    const { name, email, password, confirmPassword, gender, age } =
      UseSignupValid(form);
    // 불리언값으로나옴
    const updatedIsValid = {
      name,
      email,
      password,
      confirmPassword,
      gender,
      age,
    };
    setIsValid(updatedIsValid);
    const userinfo = {
      email: form.email,
      password: form.password,
      name: form.name,
      gender: form.gender,
      age: form.age,
    };
    // credentials: 'include',
    const allValid = Object.values(updatedIsValid).every(
      (value) => value === true
    );
    if (allValid) {
      try {
        const response = await api.signupApi(userinfo);
        if (response === 201) {
          // 응답이 성공적인 경우
          setErrorMsg(null);
          navigate(PATH.MAIN_PAGE);
          alert(ALERT_MESSAGE.WELCOME);
        } else {
          // 응답이 실패한 경우
          if (response === 409) {
            setErrorMsg('이미 가입된 계정입니다. 로그인해보세요!');
          }
          if (response === 500) {
            setErrorMsg('이런! 서버에 문제가 생겼어요!');
          }
        }
      } catch (error) {
        console.log(error);
        //  navigate('/error');
      }
    }
  };

  return (
    <SignupScreen>
      {/* 펜슬 이미지 */}
      <img
        src="images/background/pencil.png"
        alt="pencil"
        className="absolute bottom-0 right-60 max-[768px]:right-0"
      />
      <SignupContainer>
        {/* 로고 */}
        <div>
          <></>
          <LogoSection>
            <img
              role="presentation"
              src="images/logo.webp"
              alt="logo"
              className="w-[32.4px] h-[48px] max-[520px]:my-4  "
              onClick={() => navigate(PATH.MAIN_PAGE)}
              onKeyDown={() => navigate(PATH.MAIN_PAGE)}
            />
          </LogoSection>
        </div>
        {/* 회원가입 폼 */}
        <SignupBox>
          <SignupSection>
            <div className="w-[80%] flex flex-row justify-between ">
              <div></div>
              <SignupHeader>회원가입</SignupHeader>
              {/* 뒤로가기 버튼 */}
              <button onClick={() => navigate(PATH.MAIN_PAGE)}>
                <img src="images/delete/x.png" alt="뒤로가기" />
              </button>
            </div>
            {errorMsg && <p className="text-error text-[13px]">{errorMsg}</p>}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center h-full"
            >
              <InputSection>
                <CustomInput
                  placeholder="공백없이 2자 이상 10자 미만의 글자 "
                  labelName="이름"
                  type="text"
                  text="공백없이 2자 이상 10자 미만으로 적어주세요"
                  size="w-[22rem] h-[2.5rem] max-[520px]:w-[280px]"
                  isValid={isValid.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <CustomInput
                  labelName="이메일"
                  type="email"
                  text="이메일을 확인해주세요"
                  size="w-[22rem] h-[2.5rem] max-[520px]:w-[280px]"
                  isValid={isValid.email}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <CustomInput
                  placeholder="최소 8자, 문자, 숫자는 1개이상 "
                  labelName="비밀번호"
                  type="password"
                  text="비밀번호를 확인해주세요"
                  size="w-[22rem] h-[2.5rem] max-[520px]:w-[280px]"
                  isValid={isValid.password}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <CustomInput
                  labelName="비밀번호 확인"
                  type="password"
                  text="비밀번호가 일치하지않습니다"
                  size="w-[22rem] h-[2.5rem] max-[520px]:w-[280px]"
                  isValid={isValid.confirmPassword}
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                />
                <GenderRadioInput
                  isValid={isValid.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                />
                <CustomInput
                  labelName="나이"
                  type="number"
                  text="나이를 확인해주세요"
                  size="w-[22rem] h-[2.5rem] max-[520px]:w-[280px]"
                  isValid={isValid.age}
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </InputSection>
              {/* 회원가입 버튼  */}
              <ButtonSection>
                <HoverButton
                  type="submit"
                  size="w-[159px] h-[40px]"
                  radius="rounded-full"
                  fontSize="text-sm"
                  onClick={() => setTest(!test)}
                >
                  회원가입 하기
                </HoverButton>
              </ButtonSection>
            </form>
          </SignupSection>
        </SignupBox>
      </SignupContainer>
    </SignupScreen>
  );
}

const SignupScreen = tw.div`
  bg-gradient-to-r from-gradi-to to-gradi-from
  w-screen
  h-screen
  relative
  flex
  justify-center
  items-start
  max-[520px]:overflow-hidden
  pb-52
`;

const SignupContainer = tw.div`
  h-[90%]
  flex
  flex-col
  justify-between
  max-[520px]:w-screen
  mb-[10%]
`;

const LogoSection = tw.div`
flex
justify-center
items-center
mt-[3rem]

`;

const SignupBox = tw.div`
  z-50
  w-[32.5rem]
  h-full
  flex
  justify-center
  items-center
  rounded-3xl
  bg-black
  bg-opacity-50
  mt-[2rem]
  pt-[2.5rem]

  max-[520px]:w-full
  max-[520px]:rounded-none
`;

const SignupSection = tw.div`
  w-[90%]
  h-[99%]
  flex
  flex-col
  justify-center
  items-center
`;
// text-2xl
const SignupHeader = tw.h1`
  flex
  mb-4
  text-gray-100
  text-[1.25rem]
  font-bold
  items-center
  max-[520px]:mb-0
`;

const InputSection = tw.div`
  h-full
  flex
  flex-col
  justify-between
  max-[520px]:items-center

  overflow-y-scroll
`;

const ButtonSection = tw.div`
  flex
  flex-1
  items-center
  mb-8
`;
