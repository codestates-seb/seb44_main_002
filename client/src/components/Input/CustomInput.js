// CustomInput 사용방법
// isValid : 유효성검사 불리언값
// labelName : input 위에 이름
// type : input type
// value : input value를 state로 설정
// onChange : input onChange 설정
// text : 유효성 검사 통과 못했을때 띄울 오류 문구
// size : 인풋 박스 사이즈 조절

export default function CustomInput({
  placeholder = '',
  isValid = true,
  labelName = 'labelName',
  type = 'text',
  value = 'value를 설정해주세요',
  onChange = () => {
    console.log('onChange를 설정해주세요');
  },
  text = '오류문구 출력',
  size = 'w-[220px] h-[40px]',
}) {
  return (
    <div>
      <label
        className={`flex flex-col font-bold  ${
          isValid ? 'text-gray-200' : 'text-[#FF1AE8]'
        }`}
      >
        {labelName}
        <input
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          className={`${size} mt-1 outline-none border border-solid text-gray-200 font-normal text-sm bg-transparent ${
            isValid ? 'border-gray-200' : 'border-[#FF1AE8]'
          }`}
        />
      </label>
      <div className="h-4">
        <p className={`${isValid && 'hidden'} text-[#FF1AE8] text-[10px]`}>
          {text}
        </p>
      </div>
    </div>
  );
}
