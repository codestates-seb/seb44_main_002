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
          isValid ? 'text-gray-200' : 'text-[#FF1AE8]'
        }`}
      >
        속재료
        <div className="flex flex-row items-center justify-center flex-wrap w-[355px] h-[100px]">
          {/* 설탕 소금 과일음료 탄산음료 레몬즙 라임즙 우유 */}
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="sugar"
              name="sugar"
              value="sugar"
              onChange={checkboxHandler}
            />
            <label htmlFor="sugar">설탕</label>
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
            <label htmlFor="salt">소금</label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="fruitdrink"
              name="fruitdrink"
              value="fruitdrink"
              onChange={checkboxHandler}
            />
            <label htmlFor="fruitdrink">과일음료</label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="sparklingdrink"
              name="sparklingdrink"
              value="sparklingdrink"
              onChange={checkboxHandler}
            />
            <label htmlFor="sparklingdrink">탄산음료</label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="lemon"
              name="lemon"
              value="lemon"
              onChange={checkboxHandler}
            />
            <label htmlFor="lemon">레몬즙</label>
          </div>
          <div className="mr-4">
            <input
              className="mr-1"
              type="checkbox"
              id="lime"
              name="lime"
              value="lime"
              onChange={checkboxHandler}
            />
            <label htmlFor="lime">라임즙</label>
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
            <label htmlFor="milk">우유</label>
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
            <label htmlFor="ice">얼음</label>
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
            <label htmlFor="mint">민트</label>
          </div>
        </div>
      </div>
      <div className="h-7">
        <p className={`${isValid && 'hidden'} text-[#FF1AE8]`}>
          속재료를 한개 이상 골라주세요
        </p>
      </div>
    </div>
  );
}
