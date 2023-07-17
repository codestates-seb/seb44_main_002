export default function CheckboxIngrInput({ isValid = true, setForm }) {
  const checkboxHandler = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setForm((prevForm) => ({
        ...prevForm,
        ingredients: [...prevForm.ingredients, { ingredient: name }],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        ingredients: prevForm.ingredients.filter(
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
        속재료
        <div className="flex flex-row items-center justify-center flex-wrap  w-[355px] h-[100px]">
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="sugar"
              name="sugar"
              value="sugar"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="sugar">
              설탕
            </label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="salt"
              name="salt"
              value="salt"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="salt">
              소금
            </label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="beverage"
              name="beverage"
              value="beverage"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="beverage">
              과일음료
            </label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="soda"
              name="soda"
              value="soda"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="soda">
              탄산음료
            </label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="lemonSqueeze"
              name="lemonSqueeze"
              value="lemonSqueeze"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="lemonSqueeze">
              레몬즙
            </label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="limeSqueeze"
              name="limeSqueeze"
              value="limeSqueeze"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="limeSqueeze">
              라임즙
            </label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="milk"
              name="milk"
              value="milk"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="milk">
              우유
            </label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="ice"
              name="ice"
              value="ice"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="ice">
              얼음
            </label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="mint"
              name="mint"
              value="mint"
              onChange={checkboxHandler}
            />
            <label className="text-sm" htmlFor="mint">
              민트
            </label>
          </div>
        </div>
      </div>
      <div className="h-7">
        <p className={`${isValid && 'hidden'} text-sm text-error`}>
          속재료를 한개 이상 골라주세요
        </p>
      </div>
    </div>
  );
}
