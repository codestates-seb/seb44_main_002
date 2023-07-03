import Card from '../../components/Card/Card';
export default function Category() {
  //category 변경함 루트 변경했습니다.->import app.js
  //reset.css는 어디있나용?
  //
  return (
    <div className="bg-gradient-to-r from-gradi-to to-gradi-from w-screen h-screen flex items-center justify-center">
      <div className="w-10rem h-auto border-2 border-solid border-black ">
        Categorypage
        <Card />
      </div>
    </div>
  );
}
