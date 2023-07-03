import Card from '../../components/Card/Card';
export default function Category() {
  //category 변경함 루트 변경했습니다.->import app.js
  //reset.css는 어디있나용?
  //

  const isBookmarked = true;
  const item = {
    itemid: '99',
    img: 'images/cocktailSample.jpg',
    title: '타이틀',
  };
  return (
    <div className="bg-gradient-to-r from-gradi-to to-gradi-from w-screen h-screen flex items-center justify-center">
      <Card item={item} isBookmarked={isBookmarked} />
    </div>
  );
}
