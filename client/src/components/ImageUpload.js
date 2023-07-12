import { useState, useRef } from 'react';

const ImageUpload = ({ form, setForm, isValid, setIsValid }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const inputRef = useRef();

  const onUpload = async (e) => {
    const file = e.target.files[0];

    // console.log(file.name);

    if (!file) {
      setImageSrc(null);
      inputRef.current.value = '';
      return; // 파일 선택이 취소된 경우 처리 중단
    }

    if (file.size > 1 * 1024 * 1024) {
      alert('파일 크기는 1MB 이하여야 합니다.');
      setImageSrc(null);
      inputRef.current.value = '';
      return; // 파일 크기가 제한을 초과한 경우 처리 중단
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      setImageSrc(reader.result || null);
      await uploadImage(file); // 이미지 업로드 함수 호출
    };
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      // console.log(formData.get('image'));
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}upload/cocktails`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        // 유효성 검사 true로 변경
        console.log('이미지 업로드 성공');
        const imageUrl = await response.json();
        console.log(imageUrl);
        setForm({ ...form, imageUrl: imageUrl.url });
        setIsValid({ ...isValid, imageUrl: true });
        await submitData(imageUrl); // 이미지 URL을 포함하여 데이터 제출 함수 호출
      } else {
        // 유효성 검사 false로 변경
        alert('이미지 업로드 실패');
        setForm({ ...form, imageUrl: '' });
        setIsValid({ ...isValid, imageUrl: false });
        setImageSrc(null);
        inputRef.current.value = '';
        // document.getElementById('file-input').value = null;
        console.log('이미지 업로드 실패');
        // 업로드 실패 시 에러 처리
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
    }
  };

  return (
    <>
      <p
        className={`font-bold text-error mb-1 ${
          isValid.imageUrl && 'text-gray-200'
        }`}
      >
        칵테일 사진 등록
      </p>
      <input
        id="file-input"
        ref={inputRef}
        className={`text-gray-200 mb-1 ${
          !imageSrc && 'h-[300px] border border-error border-solid'
        } ${isValid.imageUrl && 'border-gray-200'}`}
        accept="image/*"
        type="file"
        onChange={onUpload}
      />
      <div className="h-8">
        <p className={`h-8 text-error ${isValid.imageUrl && 'hidden'}`}>
          칵테일 사진을 등록해주세요
        </p>
      </div>

      <div
        className={`w-[355px] h-[300px] mb-5  max-[520px]:w-[320px] max-[520px]:h-full ${
          !imageSrc && 'hidden'
        }`}
      >
        <img
          className={`w-full h-full object-contain `}
          src={imageSrc}
          alt="preview"
        />
      </div>
    </>
  );
};

export default ImageUpload;
