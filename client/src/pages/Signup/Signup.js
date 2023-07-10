import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HoverButton from '../../common/Buttons/HoverButton';
import CustomInput from '../../components/Input/CustomInput';
import UseSignupValid from '../../components/Validation/SignupValidation';
import GenderRadioInput from '../../components/Input/GenderRadioInput';

import tw from 'tailwind-styled-components';

const BASE_URL = process.env.REACT_APP_BASE_URL;
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
  //   {
  //     "email": "hgd@gmail.com",
  //     "password": "Abcd123123",
  //     "name": "홍길동",
  //     “gender” : “example”,
  //     “age” : 30
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사 로직
    UseSignupValid(form, setIsValid);
    const userinfo = {
      email: form.email,
      password: form.password,
      name: form.name,
      gender: form.gender,
      age: form.age,
    };

    fetch(`${BASE_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json', // json fetch시
      },
      body: JSON.stringify(userinfo),
    })
      .then((data) => {
        if (data.status === 201) {
          // 응답이 성공적인 경우
          console.log('요청이 성공했습니다.');
          console.log(data);
          navigate('/');
          // 여기에서 추가적인 처리를 수행할 수 있습니다.
        } else {
          // 응답이 실패한 경우
          console.log('요청이 실패했습니다.');
          // 실패에 대한 처리를 수행할 수 있습니다.
        }
      })
      .catch((error) => {
        console.log('에러', error);
        navigate('/error');
      });
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
        <LogoSection>
          <img
            role="presentation"
            src="images/logo.png"
            alt="logo"
            className="w-[32.4px] h-[48px] max-[520px]:my-4 "
            onClick={() => navigate('/')}
            onKeyDown={() => navigate('/')}
          />
        </LogoSection>
        {/* 회원가입 폼 */}
        <SignupBox>
          <SignupSection>
            <SignupHeader>회원가입</SignupHeader>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col h-full items-center"
            >
              <InputSection>
                <CustomInput
                  placeholder="2자 이상 10자 미만의 글자 "
                  labelName="이름"
                  type="text"
                  text="2자 이상 10자 미만으로 적어주세요"
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
flex-[1]
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
