import { useRef } from 'react';
import tw from 'tailwind-styled-components';
import HoverButton from '../../common/Buttons/HoverButton';

export default function CocktailRecipeInput({ form, setForm }) {
  const nextID = useRef(1);

  // 추가
  function addInput() {
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

  // 삭제
  function deleteInput(id) {
    setForm((prevForm) => ({
      ...prevForm,
      recipe: prevForm.recipe.filter((item) => item.id !== id),
    }));
  }

  function handleChange(e, id) {
    setForm((prevForm) => ({
      ...prevForm,
      recipe: prevForm.recipe.map((item) =>
        item.id === id ? { ...item, process: e.target.value } : item
      ),
    }));
  }

  return (
    <>
      <div className="flex flex-col w-[350px] max-[520px]:w-[320px]">
        <p className="flex flex-col font-bold mb-2 text-gray-200">
          나만의 레시피 순서
        </p>
        {form.recipe.map((item, index) => (
          <div className="flex flex-col" key={item.id}>
            <div className="flex font-bold text-gray-200 mr-1">{index + 1}</div>
            <div className="flex flex-row items-center">
              <Input
                type="text"
                onChange={(e) => handleChange(e, item.id)}
                value={item.process}
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
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center">
        {form.recipe.length < 99 && (
          <HoverButton size="w-6 h-6 mt-1" onClick={addInput}>
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
