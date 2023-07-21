import { useEffect, useState } from 'react';
import TagButton from '../../common/Buttons/TagButton';
import FlavorButton from '../../common/Buttons/FlavorButton';

export default function CocktailTag({ form, setForm, isValid }) {
  const handleAlcoholClick = (selectedAlcohol) => {
    setForm((prevform) => ({
      ...prevform,
      degree: prevform.degree === selectedAlcohol ? '' : selectedAlcohol,
    }));
  };

  const isAlcoholSelected = (selectedAlcohol) => {
    return form.degree === selectedAlcohol;
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

  // 특정 flavor tag가 form.flavor 배열에 존재하는지 확인하는 함수
  const isFlavorSelected = (selectedFlavor) => {
    return form.flavor.some((flavorObj) => flavorObj.tag === selectedFlavor);
  };

  return (
    <div className="flex flex-col">
      <p
        className={`font-bold mb-4 ${
          isValid.degree && isValid.flavor ? 'text-gray-200' : 'text-error'
        }`}
      >
        태그를 골라주세요
      </p>
      <div className="flex w-full h-[45px] mb-4 justify-around">
        <TagButton
          onClick={() => handleAlcoholClick('frequency_high')}
          selected={isAlcoholSelected('frequency_high')}
        >
          # 도수 높음
        </TagButton>
        <TagButton
          onClick={() => handleAlcoholClick('frequency_medium')}
          selected={isAlcoholSelected('frequency_medium')}
        >
          # 도수 보통
        </TagButton>
        <TagButton
          onClick={() => handleAlcoholClick('frequency_low')}
          selected={isAlcoholSelected('frequency_low')}
        >
          # 도수 낮음
        </TagButton>
      </div>
      <div className="flex h-[45px] w-full justify-around">
        <FlavorButton
          onClick={() => handleFlavorClick('sweet')}
          isSelected={isFlavorSelected('sweet')}
        >
          # 단맛
        </FlavorButton>
        <FlavorButton
          onClick={() => handleFlavorClick('sour')}
          isSelected={isFlavorSelected('sour')}
        >
          # 신맛
        </FlavorButton>
        <FlavorButton
          onClick={() => handleFlavorClick('bitter')}
          isSelected={isFlavorSelected('bitter')}
        >
          # 쓴맛
        </FlavorButton>
      </div>
      <div className="h-8">
        <p
          className={` text-error
            ${isValid.degree && isValid.flavor ? 'hidden' : ''}
          `}
        >
          맛, 도수 태그를 1개씩 골라주세요
        </p>
      </div>
    </div>
  );
}
