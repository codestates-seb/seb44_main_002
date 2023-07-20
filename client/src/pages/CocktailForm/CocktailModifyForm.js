import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CustomInput from '../../components/Input/CustomInput';
import SelectBaseInput from '../../components/Input/SelectBaseInput';
import CocktailRecipeInput from '../../components/Input/CocktailRecipeInput';
import AddIngreInput from '../../components/Input/AddIngreInput';
import ImageUpload from '../../components/ImageUpload';
import Loading from '../../components/Loading';
import useCocktailFormValid from '../../components/Validation/CocktailFormValidation';
import { divisionTags, transformLiquor } from './TransformData';
import { PatchCocktailForm, GetCocktailForm } from '../../api/CocktailFormApi';
import CocktailTag from './CocktailTag';
import HoverButton from '../../common/Buttons/HoverButton';
import { useLogout } from '../../hook/useLogout';

import tw from 'tailwind-styled-components';

export default function CocktailModifyForm() {
  const logout = useLogout();
  // 로딩화면
  const [isLoading, setIsLoading] = useState(false);

  setTimeout(() => {
    setIsLoading(true);
  }, 500);

  const params = useParams();

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

  const navigate = useNavigate();

  useEffect(() => {
    // cocktailform get 요청 api 분리
    GetCocktailForm(params.id)
      .then((json) => {
        if (response === 401) {
          alert('토큰만료로 로그아웃되었습니다.');
          logout();
        }
        // console.log(json);
        const transformedTags = divisionTags(json.tags);
        const transformedLiquor = transformLiquor(json.liquor);
        setForm({
          ...form,
          name: json.name,
          imageUrl: json.imageUrl,
          recipe: json.recipe.map((item, index) => ({
            id: index,
            process: item.process,
          })),
          degree: transformedTags.degree,
          // 컴포넌트 설계 미스
          flavor: transformedTags.flavor,
          ingredients: json.ingredients.map((item) => ({
            ingredient: item.ingredient,
          })),
          liquor: transformedLiquor,
        });
      })
      .catch((error) => console.log(error));
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
    setIsValid((prevIsValid) => ({
      ...prevIsValid,
      name,
      imageUrl,
      liquor,
      ingredients,
      recipe,
      degree,
      flavor,
    }));
    const allValid = Object.values(updatedIsValid).every(
      (value) => value === true
    );

    if (allValid) {
      // cocktailform patch 요청 api 분리
      PatchCocktailForm(form, params.id)
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
              <SignupHeader>칵테일 수정</SignupHeader>
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
                    form={form}
                    setForm={setForm}
                    isValid={isValid.ingredients}
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
