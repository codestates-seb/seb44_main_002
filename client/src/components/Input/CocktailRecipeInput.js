import { useRef } from 'react';
import tw from 'tailwind-styled-components';
import HoverButton from '../../common/Buttons/HoverButton';

export default function CocktailRecipeInput({
  form,
  setForm,
  isValid,
  setIsValid,
}) {
  const nextID = useRef(1);

  // 추가 및 유효성 검사
  function addInput() {
    const recipeIsValid = form.recipe.every((item) => item.process !== '');
    setIsValid((prevIsValid) => ({
      ...prevIsValid,
      recipe: recipeIsValid,
    }));

    if (recipeIsValid) {
      const newInput = {
        id: nextID.current,
        process: '',
      };

      setForm((prevForm) => ({
        ...prevForm,
        recipe: [...prevForm.recipe, newInput],
      }));
      nextID.current += 1;
    }
  }

  // 삭제
  function deleteInput(id) {
    setForm((prevForm) => ({
      ...prevForm,
      recipe: prevForm.recipe.filter((item) => item.id !== id),
    }));
  }

  function handleChange(e, id) {
    setForm((prevForm) => {
      const updatedRecipe = prevForm.recipe.map((item) =>
        item.id === id ? { ...item, process: e.target.value } : item
      );
      const recipeIsValid = updatedRecipe.every((item) => item.process !== '');

      setIsValid((prevIsValid) => ({
        ...prevIsValid,
        recipe: recipeIsValid,
      }));

      return {
        ...prevForm,
        recipe: updatedRecipe,
      };
    });
  }

  return (
    <>
      <div className="flex flex-col w-[350px] max-[520px]:w-[320px]">
        <p
          className={`flex flex-col font-bold mb-2 ${
            isValid.recipe ? 'text-gray-200' : 'text-[#FF1AE8]'
          }`}
        >
          나만의 레시피 순서
        </p>
        {form.recipe.map((item, index) => (
          <div className="flex flex-col" key={item.id}>
            <div className="flex font-bold text-gray-200 mr-1">{index + 1}</div>
            <div className="flex flex-row items-center">
              <Input
                className={`${
                  isValid.recipe ? `border-gray-200` : 'border-[#FF1AE8]'
                }`}
                type="text"
                onChange={(e) => handleChange(e, item.id)}
                value={item.process}
                placeholder="레시피를 적어주세요"
              />
              <div className="flex w-8">
                {index > 0 && (
                  <HoverButton
                    size="w-6 h-6"
                    onClick={() => deleteInput(item.id)}
                  >
                    -
                  </HoverButton>
                )}
              </div>
            </div>
            <div className="h-6">
              <p className={`${isValid.recipe && 'hidden'} text-[#FF1AE8]`}>
                레시피를 채워 넣어주세요
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center mb-6">
        {form.recipe.length < 99 && (
          <HoverButton
            size="w-6 h-6 mt-1"
            onClick={addInput}
            disabled={!isValid.recipe}
          >
            +
          </HoverButton>
        )}
      </div>
    </>
  );
}

const Input = tw.input`
  w-[320px]
  h-[40px]
  max-[520px]:w-[290px]
  mt-1
  mr-1
  px-2
  outline-none
  border
  border-solid
  text-gray-200
  font-normal
  text-sm
  bg-transparent
`;
