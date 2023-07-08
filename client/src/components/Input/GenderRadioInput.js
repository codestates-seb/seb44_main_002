export default function GenderRadioInput({
  isValid = true,
  onChange = () => {
    console.log('onChange를 설정해주세요');
  },
}) {
  return (
    <div>
      <label
        className={`flex flex-col font-bold  ${
          isValid ? 'text-gray-200' : 'text-[#FF1AE8]'
        }`}
      >
        성별
        <div className="flex flex-row items-center justify-center">
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={onChange}
            className={`w-[30px] h-[40px] mr-2 outline-none border border-solid text-gray-200 font-normal text-sm bg-transparent ${
              isValid ? 'border-gray-200' : 'border-[#FF1AE8]'
            }`}
          />
          <p className="mr-8">남성</p>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={onChange}
            className={`w-[30px] h-[40px] mr-2 outline-none border border-solid text-gray-200 font-normal text-sm bg-transparent ${
              isValid ? 'border-gray-200' : 'border-[#FF1AE8]'
            }`}
          />
          여성
        </div>
      </label>
      <div className="h-7">
        <p className={`${isValid && 'hidden'} text-[#FF1AE8]`}>
          성별을 체크해주세요
        </p>
      </div>
    </div>
  );
}
