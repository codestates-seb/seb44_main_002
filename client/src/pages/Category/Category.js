import Card from '../../components/Card/Card';
export default function Category() {
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
