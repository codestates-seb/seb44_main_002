export default function modifyPasswordValid(password, password2) {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const passwordIsValid = password && passwordRegex.test(password);
  const password2IsValid = password2 && password === password2;

  return {
    password: passwordIsValid,
    checkPassword: password2IsValid,
  };
}
