// category_one / category_two / cateory_three

// liqueurNtequila
// rumNgin
// vodkaNwhiskey

export const CategoryFilter = [
  {
    id: 0,
    title: 'All',
    type: 'all',
  },
  {
    id: 1,
    title: 'liqueur N tequila',
    type: 'category_one',
  },
  {
    id: 2,
    title: 'rum N gin',
    type: 'category_two',
  },
  {
    id: 3,
    title: 'vodka N whiskey',
    type: 'category_three',
  },
  {
    id: 4,
    title: 'etc',
    type: 'category_four',
  },
];
export const tagFrequencyData = [
  {
    id: 0,
    title: '도수 높음',
    type: 'frequency_high',
  },
  {
    id: 1,
    title: '도수 보통',
    type: 'frequency_medium',
  },
  {
    id: 2,
    title: '도수 낮음',
    type: 'frequency_low',
  },
];
// SWEET
//  BITTER
//  SOUR
export const tagTasteData = [
  {
    id: 0,
    title: '단맛',
    type: 'sweet',
  },
  {
    id: 1,
    title: '새콤',
    type: 'sour',
  },
  {
    id: 2,
    title: '쓴맛',
    type: 'bitter',
  },
];
// 조회수 높은 순 : most_viewed
// 조회수 낮은 순 : least_viewed
// 별점 높은 순 : highest_rate
// 별잠 낮은 순 : lowest_rate
export const descendingData = [
  {
    id: 0,
    title: '내림차순',
    type: 'descendingOrder',
  },
  {
    id: 1,
    title: '오름차순',
    type: 'ascendingOrder',
  },
];
export const sortTypeData = [
  {
    id: 0,
    title: '조회순',
    type: 'viewed',
  },
  {
    id: 1,
    title: '별점순',
    type: 'rate',
  },
];
