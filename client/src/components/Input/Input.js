// CustomInput 사용방법
// isValid : 유효성검사 불리언값
// labelName : input 위에 이름
// type : input type
// value : input value를 state로 설정
// onChange : input onChange 설정
// text : 유효성 검사 통과 못했을때 띄울 오류 문구

export default function CustomInput({
  isValid,
  labelName,
  type,
  value,
  onChange,
  text,
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
          type={type}
          value={value}
          onChange={onChange}
          className={`w-[220px] h-[40px] outline-none border border-solid text-gray-200 font-normal text-sm  bg-[#3D4E83] ${
            isValid ? 'border-gray-200' : 'border-[#FF1AE8]'
          }`}
        />
      </label>
      <div>
        <p className={`${isValid && 'hidden'} text-[#FF1AE8]`}>{text}</p>
      </div>
    </div>
  );
}
