import { useState, useCallback } from 'react';

export default function AddIngreInput({ form, setForm, isValid = true }) {
  const [hashtag, setHashtag] = useState('');

  const handleKeyUp = useCallback(
    (e) => {
      if (e.keyCode === 13 && e.target.value.trim() !== '') {
        const newHashtag = e.target.value.trim();
        setForm((prevForm) => ({
          ...prevForm,
          ingredients: [...prevForm.ingredients, { ingredient: newHashtag }],
        }));
        setHashtag('');
      }
    },
    [setForm]
  );

  const removeHashtag = useCallback(
    (hashtagToRemove) => {
      setForm((prevForm) => ({
        ...prevForm,
        ingredients: prevForm.ingredients.filter(
          (item) => item.ingredient !== hashtagToRemove
        ),
      }));
    },
    [setForm]
  );

  return (
    <div>
      <p
        className={`mb-2 font-bold ${isValid ? 'text-gray-200' : 'text-error'}`}
      >
        속재료
      </p>
      <div className="flex w-[355px] max-[520px]:w-[320px] flex-wrap">
        {form.ingredients.map((item, index) => (
          <div
            key={index}
            role="presentation"
            className="flex items-center justify-center px-4 py-2 mt-2 mb-4 mr-2 font-bold text-gray-300 bg-transparent border border-solid rounded-full cursor-pointer hover:border-red-500 border-pointPurple-100"
            onClick={() => removeHashtag(item.ingredient)}
            onKeyUp={() => removeHashtag(item.ingredient)}
          >
            {item.ingredient}
            <span className="flex items-center justify-center ml-4 text-red-500">
              ✕
            </span>
          </div>
        ))}
      </div>
      <input
        className={`${
          isValid ? 'border-gray-200' : 'border-error'
        } w-[350px] h-[40px] max-[520px]:w-[320px] mt-1 px-2 outline-none border border-solid text-gray-200 font-normal text-sm bg-transparent`}
        type="text"
        value={hashtag}
        onChange={(e) => setHashtag(e.target.value)}
        onKeyUp={handleKeyUp}
        maxLength="32"
        placeholder="원하는 재료를 기입하고 엔터"
      />
      <div className="mb-6 h-7">
        <p className={`${isValid && 'hidden'} text-sm text-error`}>
          속재료를 한개 이상 작성해서 엔터를 눌러주세요
        </p>
      </div>
    </div>
  );
}
