import { useSelector, useDispatch } from 'react-redux';
import { INFOUPDATE } from '../../redux/slice/userInfoSlice';
const BookmarkButton = ({ item }) => {
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.isLogin.isLogin);
  const bookmarkList = useSelector((state) => state.changeInfo.changeInfo);

  const bookmarkHandler = () => {
    //북마크 클릭시 디스패치로 아이템값과 북마크달라졌다는 내용을 등록
    for (let i = 0; i < bookmarkList.length; i++) {
      if (bookmarkList[i].cocktailId === item.cocktailId) {
        bookmarkList.splice(i, 1);
        break; // 일치하는 요소를 찾았으므로 반복문 종료
      }
      return;
    }
    bookmarkList.push(item);
    dispatch(INFOUPDATE({ ...userinfo, bookmarkList }));
  };
  return (
    <button
      onClick={(e) => {
        if (isLogin) {
          e.stopPropagation();
          bookmarkHandler();
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
