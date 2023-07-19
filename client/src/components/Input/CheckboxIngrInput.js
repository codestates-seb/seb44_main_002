export default function CheckboxIngrInput({ isValid = true, setForm }) {
  const checkboxHandler = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setForm((prevForm) => ({
        ...prevForm,
        baseIngredients: [...prevForm.baseIngredients, { ingredient: name }],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        baseIngredients: prevForm.baseIngredients.filter(
          (ingredient) => ingredient.ingredient !== name
        ),
      }));
    }
  };
  return (
    <div className="mb-2">
      <div
        className={`flex flex-col font-bold w-[320px]  ${
          isValid ? 'text-gray-200' : 'text-error'
        }`}
      >
        기본 속재료
        <div className="flex flex-row items-center justify-center flex-wrap  w-[355px] h-[100px]">
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="설탕"
              name="설탕"
              value="설탕"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="설탕">
              설탕
            </label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="소금"
              name="소금"
              value="소금"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="소금">
              소금
            </label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="과일음료"
              name="과일음료"
              value="과일음료"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="과일음료">
              과일음료
            </label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="탄산음료"
              name="탄산음료"
              value="탄산음료"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="탄산음료">
              탄산음료
            </label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="레몬즙"
              name="레몬즙"
              value="레몬즙"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="레몬즙">
              레몬즙
            </label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="라임즙"
              name="라임즙"
              value="라임즙"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="라임즙">
              라임즙
            </label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="우유"
              name="우유"
              value="우유"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="우유">
              우유
            </label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="얼음"
              name="얼음"
              value="얼음"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="얼음">
              얼음
            </label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="민트"
              name="민트"
              value="민트"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="민트">
              민트
            </label>
          </div>
        </div>
      </div>
      <div className="h-7">
        <p className={`${isValid && 'hidden'} text-sm text-error`}>
          기본 속재료를 한개 이상 골라주세요
        </p>
      </div>
    </div>
  );
}
