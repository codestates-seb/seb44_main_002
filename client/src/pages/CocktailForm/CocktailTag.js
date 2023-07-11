import { useState } from 'react';
import TagButton from '../../common/Buttons/TagButton';
import ClickButton from '../../common/Buttons/ClickButton';

export default function CocktailTag({ form, setForm }) {
  const handleAlcoholClick = (selectedAlcohol) => {
    setForm((prevform) => ({
      ...prevform,
      degree: prevform.degree === selectedAlcohol ? '' : selectedAlcohol,
    }));
  };

  const handleFlavorClick = (selectedFlavor) => {
    setForm((prevform) => {
      const updatedFlavor = [...prevform.flavor];
      const flavorIndex = updatedFlavor.findIndex(
        (flavorObj) => flavorObj.tag === selectedFlavor
      );

      if (flavorIndex !== -1) {
        updatedFlavor.splice(flavorIndex, 1);
      } else {
        updatedFlavor.push({ tag: selectedFlavor });
      }

      return {
        ...prevform,
        flavor: updatedFlavor,
      };
    });
  };

  const isAlcoholSelected = (selectedAlcohol) => {
    return form.degree === selectedAlcohol;
  };

  const isFlavorSelected = (selectedFlavor) => {
    return form.flavor.some((flavorObj) => flavorObj.tag === selectedFlavor);
  };

  return (
    <div className="flex flex-col">
      <p className="font-bold text-gray-200 mb-4">태그를 골라주세요</p>
      <div className="flex w-full h-[45px] mb-4 justify-around">
        <TagButton
          onClick={() => handleAlcoholClick('high')}
          selected={isAlcoholSelected('high')}
        >
          # 도수 높음
        </TagButton>
        <TagButton
          onClick={() => handleAlcoholClick('medium')}
          selected={isAlcoholSelected('medium')}
        >
          # 도수 보통
        </TagButton>
        <TagButton
          onClick={() => handleAlcoholClick('low')}
          selected={isAlcoholSelected('low')}
        >
          # 도수 낮음
        </TagButton>
      </div>
      <div className="flex h-[45px] w-full justify-around">
        <ClickButton
          onClick={() => handleFlavorClick('sweet')}
          selected={isFlavorSelected('sweet')}
        >
          # 단맛
        </ClickButton>
        <ClickButton
          onClick={() => handleFlavorClick('sour')}
          selected={isFlavorSelected('sour')}
        >
          # 신맛
        </ClickButton>
        <ClickButton
          onClick={() => handleFlavorClick('bitter')}
          selected={isFlavorSelected('bitter')}
        >
          # 쓴맛
        </ClickButton>
      </div>
    </div>
  );
}
