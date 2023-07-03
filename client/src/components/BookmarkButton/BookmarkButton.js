//item, isBookmarked 를 props 로 받습니다.
const BookmarkButton = ({ item, isBookmarked }) => {
  const bookmarkHandler = () => {
    //북마크 클릭시
  };
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        bookmarkHandler();
      }}
    >
      {isBookmarked ? (
        <img src="/images/bookmarkOn.png" alt="활성화된 북마크" />
      ) : (
        <img src="/images/bookmarkOff.png" alt="활성화된 북마크" />
      )}
    </button>
  );
};

export default BookmarkButton;
