import { useSelector, useDispatch } from 'react-redux';
import { updateBookmark } from '../../redux/slice/userInfoSlice';
import tw from 'tailwind-styled-components';
// 사용가능한 props : 아무것도 안적으면 기본값 적용됨
// -> size : 버튼 사이즈 커스텀

const BookmarkButton = ({
  item,
  setData,
  data,
  size = 'w-[36px] h-[60px]',
}) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin.isLogin);

  const bookmarkHandler = (isBookmarked) => {
    //북마크 클릭시 디스패치로 아이템값과 북마크달라졌다는 내용을 등록

    const id = item.cocktailId;
    dispatch(updateBookmark({ id, item }));

    const newDate = data.map((el, idx) => {
      if (idx + 1 === item.cocktailId) {
        return { ...el, isBookmarked: !el.isBookmarked };
      }
      return el;
    });
    setData(newDate);
    // /cocktails/{cocktail-id}/bookmark
    // const handleBookmark = () => {
    //   fetch(`/cocktails/${item.cocktailId}/bookmark`, {
    //     method: 'POST',
    //     // 필요한 경우 헤더 등을 설정하세요.
    //   })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error('Bookmarking failed.'); // 요청이 실패한 경우 에러 처리
    //       }
    //       // 요청이 성공한 경우 추가적인 작업을 수행할 수 있습니다.
    //     })
    //     .catch((error) => {
    //       console.error(error); // 에러 처리
    //     });
  };
  return (
    <button
      onClick={(e, item) => {
        if (isLogin) {
          e.stopPropagation();
          bookmarkHandler(item);
        } else {
          alert('로그인해야 가능합니다');
        }
      }}
    >
      {item.isBookmarked ? (
        <Img
          src="/images/bookmark/bookmarkOn.png"
          alt="활성화된 북마크"
          size={size}
        />
      ) : (
        <Img
          src="/images/bookmark/bookmarkOff.png"
          alt="활성화된 북마크"
          size={size}
        />
      )}
    </button>
  );
};

export default BookmarkButton;

const Img = tw.img`
  ${({ size }) => size}
  drop-shadow-3xl
`;
