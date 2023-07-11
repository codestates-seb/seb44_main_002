// email 정규식, password 정규식

export default function useCocktailFormValid(form, setIsValid) {
  // const emailRegex =
  //   /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  // // 비밀번호 8자 이상, 최소한 하나의 문자열, 최소한 하나의 숫자
  // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const nameRegex = /^.{1,19}$/;

  const nameIsValid = form.name && nameRegex.test(form.name);
  const imgIsValid = form.img === true;
  const liquorIsValid = form.liquor !== '';
  const ingredientsIsValid = form.ingredients.length !== 0;

  setIsValid({
    name: nameIsValid,
    email: imgIsValid,
    liquor: liquorIsValid,
    ingredients: ingredientsIsValid,
  });
}
