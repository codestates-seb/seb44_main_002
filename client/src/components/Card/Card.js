import BookmarkButton from '../BookmarkButton/BookmarkButton';
//item 칵테일에 대한 정보가 객체형태로 담겨있습니다.
export default function Card({ item, isBookmarked }) {
  //const title = item.title;
  return (
    //rounded-br-lg
    <div className=" relative w-[180px] h-[200px] border-2 border-solid border-black   rounded-tl-2xl rounded-br-2xl">
      <BookmarkButton
        item={item}
        isBookmarked={isBookmarked}
        // className=" absolute top-0 right-10"
      />
      {/* {title} */}
    </div>
  );
}
