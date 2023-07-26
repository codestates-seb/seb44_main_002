export default function UseSignupValid(form) {
  const nameRegex = /^(?!.*편한$)[^\s]{2,9}$/;
  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  // const passwordRegex =
  //   /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[a-z\d@$!%*#?&]{8,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  const ageRegex = /^(?:20|[2-9][0-9]|1[0-1][0-9]|12[0-2])$/;

  const nameIsValid = form.name && nameRegex.test(form.name);
  const emailIsValid = form.email && emailRegex.test(form.email);
  const passwordIsValid = form.password && passwordRegex.test(form.password);
  const confirmPasswordIsValid = form.password === form.confirmPassword;
  const genderIsValid = form.gender.length !== 0;
  const ageIsValid = form.age && ageRegex.test(form.age);

  return {
    name: nameIsValid,
    email: emailIsValid,
    password: passwordIsValid,
    confirmPassword: confirmPasswordIsValid,
    gender: genderIsValid,
    age: ageIsValid,
  };
}
