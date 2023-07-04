import { useState } from 'react';

export default function CategoryBtn({
  data,
  idx,
  selectMenuHandler,
  setfocusCategory,
  onClick,
  focusCategory,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const buttonClicked = () => {
    setIsClicked(!isClicked);
    if (onClick) {
      onClick();
    }
  };
  return (
    <button
      onClick={() => {
        setfocusCategory(data.type);
        selectMenuHandler(idx, 'category');
        buttonClicked();
      }}
      className={` w-[175px]
        h-[50px] 
        border-2 
        border-solid 
         rounded-tl-[40px] 
         rounded-tr-[40px]
         font-bold
         text-[15px]

       ${
         focusCategory === data.type
           ? 'text-[#ffffff] border-[#ffffff]'
           : ' text-[#8F8F8F] border-[#8F8F8F]'
       }`}
      //  onFocus={() => setFocused(true)}}
    >
      {data.title}
    </button>
  );
}
