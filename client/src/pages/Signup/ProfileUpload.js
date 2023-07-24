import { useState, useRef } from 'react';
import { ALERT_MESSAGE } from '../../constants/constants';

const ProfileUpload = ({ form, setForm }) => {
  const [imageSrc, setImageSrc] = useState(form.imageUrl);
  const inputRef = useRef();

  const onUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setImageSrc(null);
      inputRef.current.value = '';
      return; // 파일 선택이 취소된 경우 처리 중단
    }

    if (file.size > 1 * 1024 * 1024) {
      alert(ALERT_MESSAGE.BIG_IMG);
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
      console.log(formData);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}upload/users`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        // 유효성 검사 true로 변경
        const imageUrl = await response.json();
        console.log(imageUrl);
        setForm({ ...form, profileImageUrl: imageUrl.url });
      } else {
        // 유효성 검사 false로 변경
        alert(ALERT_MESSAGE.IMG_FAILED);
        setForm({ ...form, profileImageUrl: '' });

        setImageSrc(null);
        inputRef.current.value = '';

        // 업로드 실패 시 에러 처리
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
    }
  };

  return (
    <div>
      <p className={`w-full flex justify-start font-bold text-gray-200 mb-1`}>
        프로필 사진 등록
      </p>
      <div
        style={{
          backgroundImage: !imageSrc ? `url('/images/dnd.svg')` : '',
          backgroundSize: '150px 150px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <input
          id="file-input"
          ref={inputRef}
          className={`text-gray-200 mb-1 rounded-sm w-full cursor-pointer ${
            !imageSrc && 'h-[300px] border border-gray-200 border-solid'
          } `}
          accept="image/*"
          type="file"
          onChange={onUpload}
        />
      </div>
      <div className="h-8">
        {/* <p className={`h-8 text-sm text-error ${isValid.imageUrl && 'hidden'}`}>
          칵테일 사진을 등록해주세요
        </p> */}
      </div>

      <div
        className={`w-[355px] h-[300px] mb-5  max-[520px]:w-[280px] max-[520px]:h-full ${
          !imageSrc && 'hidden'
        }`}
      >
        <img
          className={`w-full h-full object-contain `}
          src={form.profileImageUrl ? form.profileImageUrl : imageSrc}
          alt="preview"
        />
      </div>
    </div>
  );
};

export default ProfileUpload;
