export default function UseSignupValid(form, setIsValid) {
  // 이름 2자 이상 10자 미만 공백포함X
  const nameRegex = /^(?!.*편한$)[^\s]{2,9}$/;
  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  // 비밀번호 8자 이상, 최소한 하나의 문자열, 최소한 하나의 숫자
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  // 나이 1세 ~ 122세 통과 (기네스북 최장나이 122세)
  const ageRegex = /^(1[0-1][0-9]|12[0-2]|[1-9][0-9]|[1-9])$/;

  const nameIsValid = form.name && nameRegex.test(form.name);
  const emailIsValid = form.email && emailRegex.test(form.email);
  const passwordIsValid = form.password && passwordRegex.test(form.password);
  const confirmPasswordIsValid = form.password === form.confirmPassword;
  const genderIsValid = form.gender.length !== 0;
  const ageIsValid = form.age && ageRegex.test(form.age);

  setIsValid({
    name: nameIsValid,
    email: emailIsValid,
    password: passwordIsValid,
    confirmPassword: confirmPasswordIsValid,
    gender: genderIsValid,
    age: ageIsValid,
  });
}
