import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HoverButton from '../common/Buttons/HoverButton';
import CustomInput from '../components/Input/CustomInput';
import UseSignupValid from '../components/Validation/SignupValidation';

import tw from 'tailwind-styled-components';
import GenderRadioInput from '../components/Input/GenderRadioInput';

export default function Signup() {
  const navigate = useNavigate();
  const [test, setTest] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사 로직
    UseSignupValid(form, setIsValid);

    // 전역상태관리 로그인으로 변경
    // dispatch(() => login())
  };

  return (
    <SignupScreen>
      <img
        src="images/background/pencil.png"
        alt="pencil"
        className="absolute bottom-10 right-72 max-[768px]:right-0"
      />
      <SignupContainer>
        <LogoSection>
          <img
            role="presentation"
            src="images/logo.png"
            alt="logo"
            className="w-[32.4px] h-[48px] max-[520px]:my-4"
            onClick={() => navigate('/')}
            onKeyDown={() => navigate('/')}
          />
        </LogoSection>
        <SignupBox>
          <SignupSection>
            <SignupHeader>회원가입</SignupHeader>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col h-full items-center"
            >
              <InputSection>
                <CustomInput
                  labelName="이름"
                  type="text"
                  text="2자 이상 10자 미만으로 적어주세요"
                  size="w-[355px] h-[40px] max-[520px]:w-[300px]"
                  isValid={isValid.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <CustomInput
                  labelName="이메일"
                  type="email"
                  text="이메일을 확인해주세요"
                  size="w-[355px] h-[40px] max-[520px]:w-[300px]"
                  isValid={isValid.email}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <CustomInput
                  placeholder="비밀번호 8자 이상, 최소한 하나의 문자열, 최소한 하나의 숫자"
                  labelName="비밀번호"
                  type="password"
                  text="비밀번호를 확인해주세요"
                  size="w-[355px] h-[40px] max-[520px]:w-[300px]"
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
                  size="w-[355px] h-[40px] max-[520px]:w-[300px]"
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
                  size="w-[355px] h-[40px] max-[520px]:w-[300px]"
                  isValid={isValid.age}
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </InputSection>
              <ButtonSection>
                <HoverButton
                  type="submit"
                  size="w-[159px] h-[53px]"
                  radius="rounded-full"
                  fontSize="text-xl"
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
`;

const SignupContainer = tw.div`
  h-[90%]
  flex
  flex-col
  justify-between
  max-[520px]:w-screen
`;

const LogoSection = tw.div`
flex
flex-[1]
justify-center
items-center
`;

const SignupBox = tw.div`
  z-50
  w-[520px]
  h-full
  flex
  flex-[6]
  justify-center
  items-center
  rounded-3xl
  bg-black
  bg-opacity-50
  max-[520px]:w-full
  max-[520px]:rounded-none
`;

const SignupSection = tw.div`
  w-[90%]
  h-[90%]
  flex
  flex-col
  justify-center
  items-center
`;

const SignupHeader = tw.h1`
  flex
  mb-8
  text-white
  text-2xl
  font-bold
  items-center
  max-[520px]:mb-0
`;

const InputSection = tw.div`
  h-full
  flex
  flex-col
  flex-[6]
  justify-between
  max-[520px]:overflow-y-scroll
  max-[520px]:items-center
`;

const ButtonSection = tw.div`
  flex
  flex-1
  items-center
`;
