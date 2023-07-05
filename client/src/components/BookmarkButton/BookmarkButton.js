//item, isBookmarked 를 props 로 받습니다.
const BookmarkButton = ({ item, isLogin }) => {
  const bookmarkHandler = () => {
    //북마크 클릭시 디스패치로 아이템값과 북마크달라졌다는 내용을 등록
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
