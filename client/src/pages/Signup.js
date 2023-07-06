import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HoverButton from '../common/Buttons/HoverButton';
import CustomInput from '../components/Input/Input';
import useValid from '../components/Validation/Validation';

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

  console.log(form);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사 로직
    useValid(form, setIsValid);

    // 전역상태관리 로그인으로 변경
    // dispatch(() => login())
  };

  return (
    <div className="bg-gradient-to-r from-gradi-to to-gradi-from w-screen h-screen relative flex justify-center items-start max-[520px]:overflow-hidden">
      <img
        src="images/background/pencil.png"
        alt="pencil"
        className="absolute bottom-10 right-72 max-[768px]:right-0"
      />
      <div className="h-[90%] flex flex-col justify-between max-[520px]:w-screen">
        <div className="flex flex-[1] justify-center items-center">
          <img
            role="presentation"
            src="images/logo.png"
            alt="logo"
            className="w-[32.4px] h-[48px] max-[520px]:my-4"
            onClick={() => navigate('/')}
            onKeyDown={() => navigate('/')}
          />
        </div>
        <div className="z-50 w-[520px] h-full flex flex-[6] justify-center items-center rounded-3xl bg-black bg-opacity-50 max-[520px]:w-full max-[520px]:rounded-none">
          <div className="w-[90%] h-[90%] flex flex-col justify-center items-center">
            <h1 className="flex mb-8 text-white text-2xl font-bold items-center max-[520px]:mb-0">
              회원가입
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col h-full items-center"
            >
              <div className="flex h-full flex-col flex-[6] justify-between  max-[520px]:overflow-y-scroll max-[520px]:items-center">
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
                <CustomInput
                  labelName="성별"
                  type="radio"
                  text="성별을 체크해주세요"
                  isValid={isValid.gender}
                  value={form.gender}
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
              </div>
              <div className="flex flex-1 items-center">
                <HoverButton
                  type="submit"
                  size="w-[159px] h-[53px]"
                  radius="rounded-full"
                  fontSize="text-xl"
                  onClick={() => setTest(!test)}
                >
                  회원가입 하기
                </HoverButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
