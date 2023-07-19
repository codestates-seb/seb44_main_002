import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomInput from '../../components/Input/CustomInput';
import SelectBaseInput from '../../components/Input/SelectBaseInput';
import CocktailRecipeInput from '../../components/Input/CocktailRecipeInput';
import AddIngreInput from '../../components/Input/AddIngreInput';

import HoverButton from '../../common/Buttons/HoverButton';

import ImageUpload from '../../components/ImageUpload';
import CocktailTag from './CocktailTag';
import Loading from '../../components/Loading';
import useCocktailFormValid from '../../components/Validation/CocktailFormValidation';
import { PostCocktailForm } from '../../api/CocktailFormApi';

import tw from 'tailwind-styled-components';

export default function CocktailForm() {
  const [isLoading, setIsLoading] = useState(false);

  setTimeout(() => {
    setIsLoading(true);
  }, 500);

  const [form, setForm] = useState({
    name: '',
    imageUrl: '',
    liquor: '',
    ingredients: [],
    recipe: [{ id: 0, process: '' }],
    degree: '',
    flavor: [],
  });

  const [isValid, setIsValid] = useState({
    name: true,
    imageUrl: true,
    liquor: true,
    ingredients: true,
    recipe: true,
    degree: true,
    flavor: true,
  });

  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');

  // // 엔터 누르면 submit되는 현상 막기
  const preventFormSubmission = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', preventFormSubmission);
    return () => {
      document.removeEventListener('keydown', preventFormSubmission);
    };
  }, []);

  const submitHandler = (e) => {
    // console.log(form);
    e.preventDefault();
    const { name, imageUrl, liquor, ingredients, recipe, degree, flavor } =
      useCocktailFormValid(form);
    const updatedIsValid = {
      name,
      imageUrl,
      liquor,
      ingredients,
      recipe,
      degree,
      flavor,
    };
    setIsValid(updatedIsValid);
    const allValid = Object.values(updatedIsValid).every(
      (value) => value === true
    );

    if (allValid) {
      // cocktailform post 요청 api 분리
      PostCocktailForm(form)
        .then((json) => {
          // console.log(json);
          navigate(`/success/${json.cocktailId}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('유효성 검사 작동');
    }
  };

  return (
    <>
      {!isLoading ? (
        <Loading />
      ) : (
        <Background>
          <img
            className="absolute bottom-0 right-0 z-0"
            src={
              process.env.PUBLIC_URL + `/images/background/fire_cocktail.png`
            }
            alt="backgroundimg"
          />
          <Container>
            <div className="z-10 flex flex-col items-center">
              <SignupHeader>칵테일 등록</SignupHeader>
              <form
                onSubmit={submitHandler}
                className="flex flex-col items-center"
              >
                <InputSection>
                  <CustomInput
                    type="text"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    value={form.name}
                    labelName="칵테일 이름"
                    text="칵테일 이름을 적어주세요"
                    isValid={isValid.name}
                    size="w-[355px] h-[40px] max-[520px]:w-[320px]"
                    radius="rounded-md"
                  />
                  <ImageUpload
                    form={form}
                    setForm={setForm}
                    isValid={isValid}
                    setIsValid={setIsValid}
                  />
                  <SelectBaseInput
                    isValid={isValid.liquor}
                    value={form.liquor}
                    onChange={(e) =>
                      setForm({ ...form, liquor: e.target.value })
                    }
                    size="w-[355px] h-[40px] max-[520px]:w-[320px]"
                  />
                  <AddIngreInput
                    isValid={isValid.ingredients}
                    form={form}
                    setForm={setForm}
                  />
                  <CocktailRecipeInput
                    form={form}
                    setForm={setForm}
                    isValid={isValid}
                    setIsValid={setIsValid}
                  />
                  <CocktailTag
                    form={form}
                    setForm={setForm}
                    isValid={isValid}
                  />
                </InputSection>
                <div className="mt-4">
                  <HoverButton type="submit" size="w-32 h-12">
                    업로드
                  </HoverButton>
                </div>
              </form>
            </div>
          </Container>
        </Background>
      )}
    </>
  );
}

const Background = tw.div`
relative
bg-gradient-to-r 
from-gradi-to
to-gradi-from
px-12
py-52
w-full
overflow-hidden
flex
justify-center
`;
const Container = tw.main`
relative
mx-auto
px-[4.6875rem]
py-32
w-[100vw]
max-w-5xl
bg-[#000000]/40
rounded-ss-[3.125rem]
rounded-ee-[3.125rem]
max-[520px]:rounded-none
animate-fadeInDown1
`;

const SignupHeader = tw.h1`
  flex
  mb-8
  text-white
  text-2xl
  font-bold
  items-center
`;

const InputSection = tw.div`
  h-full
  flex
  flex-col
  flex-[6]
  justify-between
  max-[520px]:items-center
`;
