import BookmarkButton from '../BookmarkButton/BookmarkButton';
import { useNavigate } from 'react-router-dom';

//item 칵테일에 대한 정보가 객체형태로 담겨있습니다.
export default function Card({ item = { title: '제목' }, isBookmarked }) {
  const navigate = useNavigate();
  // background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(20210707095408-69BNH.jpg);
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), -4px -4px 16px rgba(0, 0, 0, 0.25);

  const title = item.title || '타이틀';

  //const itemImg = item.img || 'images/cocktailSample.jpg';
  const itemImg = 'images/cocktailSample.jpg';
  return (
    <button
      className=" relative w-[180px] h-[200px] "
      onClick={() => navigate('/detail/1')}
    >
      {/* 북마크 */}
      <div className="absolute top-0  right-2">
        <BookmarkButton item={item} isBookmarked={isBookmarked} />
      </div>
      {/* 칵테일 이미지 */}
      <div className="w-[180px] h-[200px] rounded-tl-2xl rounded-br-2xl ">
        <img
          src={itemImg}
          alt="칵테일 사진"
          className="w-[180px] h-[200px] rounded-tl-2xl rounded-br-2xl "
        />
      </div>
      {/* 하단 칵테일이름 */}
      <h3 className="text-[20px] font-bold text-[#B3B3B3]  hover:text-white">
        {title}
      </h3>
    </button>
  );
}
