import { useSelector, useDispatch } from 'react-redux';
import { updateBookmark } from '../../redux/slice/userInfoSlice';

const BookmarkButton = ({ item, setData, data }) => {
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
        }
      }}
    >
      {item.isBookmarked ? (
        <img src="/images/bookmark/bookmarkOn.png" alt="활성화된 북마크" />
      ) : (
        <img src="/images/bookmark/bookmarkOff.png" alt="활성화된 북마크" />
      )}
    </button>
  );
};

export default BookmarkButton;
