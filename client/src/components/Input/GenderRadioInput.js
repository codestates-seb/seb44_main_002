export default function GenderRadioInput({
  isValid = true,
  onChange = () => {
    console.log('onChange를 설정해주세요');
  },
}) {
  return (
    <div className="w-[350px] max-[520px]:w-[300px]">
      <label
        className={`flex flex-col font-bold  ${
          isValid ? 'text-gray-200' : 'text-error'
        }`}
      >
        성별
        <div className="flex flex-row items-center justify-center">
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={onChange}
            className={`w-[15px] h-[15px] mr-2 outline-none border border-solid text-gray-200 font-normal text-sm bg-transparent ${
              isValid ? 'border-gray-200' : 'border-error'
            }`}
          />
          <p className="mr-8">남성</p>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={onChange}
            className={`w-[15px] h-[15px] mr-2 outline-none border border-solid text-gray-200 font-normal text-sm bg-transparent ${
              isValid ? 'border-gray-200' : 'border-error'
            }`}
          />
          여성
        </div>
      </label>
      <div className="h-4">
        <p className={`${isValid && 'hidden'} text-error text-[10px]`}>
          성별을 체크해주세요
        </p>
      </div>
    </div>
  );
}
