import { useSelector, useDispatch } from 'react-redux';
import { updateBookmark } from '../../redux/slice/userInfoSlice';
import tw from 'tailwind-styled-components';
// 사용가능한 props : 아무것도 안적으면 기본값 적용됨
// -> size : 버튼 사이즈 커스텀
//item  형태
// {
//     cocktailId: 2,
//     name: '체리주',
//     imageUrl: 'images/cocktail/cocktail2.jpg',
//     isBookmarked: true
//   }
const BookmarkButton = ({
  item,
  onClick,
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
