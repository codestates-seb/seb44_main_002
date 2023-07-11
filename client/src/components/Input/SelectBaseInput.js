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
        베이스 술
        <select
          value={value}
          onChange={onChange}
          className={`${size} outline-none border border-solid text-gray-200 font-normal text-sm bg-transparent ${
            isValid ? 'border-gray-200' : 'border-error'
          }`}
        >
          <option value="">베이스 술을 골라주세요</option>
          <option value="liquer">리큐르</option>
          <option value="rum">럼</option>
          <option value="whisky">위스키</option>
          <option value="jin">진</option>
          <option value="vodka">보드카</option>
          <option value="tequila">데낄라</option>
        </select>
      </label>
      <div className="h-7">
        <p className={`${isValid && 'hidden'} text-error`}>
          베이스 술을 골라주세요
        </p>
      </div>
    </div>
  );
}
