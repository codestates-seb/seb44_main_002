import { useState } from 'react';

export default function CategoryBtn({ data, idx, selectMenuHandler, onClick }) {
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
        selectMenuHandler(idx, 'category');
        buttonClicked();
      }}
      className={` w-[175px]
        h-[50px] 
        border-2 
        border-solid 
        
         rounded-tl-3xl 
         rounded-tr-3xl 
         font-bold
        
       ${
         isClicked
           ? 'text-[#ffffff] border-[#ffffff]'
           : ' text-[#8F8F8F] border-[#8F8F8F]'
       }
     `}
    >
      {data.title}
    </button>
  );
}
