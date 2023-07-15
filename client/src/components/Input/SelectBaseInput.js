export default function SelectBaseInput({
  isValid = true,
  value = 'value를 설정해주세요',
  onChange = () => {
    console.log('onChange를 설정해주세요');
  },
  size = 'w-[220px] h-[40px]',
}) {
  return (
    <div>
      <label
        className={`flex flex-col font-bold  ${
          isValid ? 'text-gray-200' : 'text-error'
        }`}
      >
        <p className="mb-1">베이스 술</p>
        <select
          value={value}
          onChange={onChange}
          className={`${size} outline-none border border-solid cursor-pointer text-gray-200 font-normal rounded-md text-sm bg-transparent ${
            isValid ? 'border-gray-200' : 'border-error'
          }`}
        >
          <option value="">베이스 술을 골라주세요</option>
          <option value="liqueur">리큐르</option>
          <option value="rum">럼</option>
          <option value="whiskey">위스키</option>
          <option value="jin">진</option>
          <option value="vodka">보드카</option>
          <option value="tequila">데낄라</option>
        </select>
      </label>
      <div className="h-8">
        <p className={`${isValid && 'hidden'} text-sm text-error`}>
          베이스 술을 골라주세요
        </p>
      </div>
    </div>
  );
}
