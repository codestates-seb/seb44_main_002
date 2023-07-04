export default function Sort({ isdescendingOrder, setIsdescendingOrder }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setIsdescendingOrder(!isdescendingOrder);
      }}
    >
      {isdescendingOrder ? (
        <div className="flex ">
          <img src="/images/arrow/arrowDownOn.png" alt="내림차순" />
          <img src="/images/arrow/arrowUpOff.png" alt="올림차순 비활성화" />
        </div>
      ) : (
        <div className="flex ">
          <img src="/images/arrow/arrowDownOff.png" alt="내림차순 비활성화" />
          <img src="/images/arrow/arrowUpOn.png" alt="내림차순" />
        </div>
      )}
    </button>
  );
}
