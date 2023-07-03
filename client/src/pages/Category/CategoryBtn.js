export default function CategoryBtn({ data, idx, selectMenuHandler }) {
  return (
    <button
      onClick={() => {
        selectMenuHandler(idx, 'category');
      }}
      className="w-[175px] h-[50px] border-2 border-solid border-white rounded-tl-3xl rounded-tr-3xl"
    >
      {data.title}
    </button>
  );
}
