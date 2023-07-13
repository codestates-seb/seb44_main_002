import { rest } from 'msw';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const handlers = [
  // 메인 페이지 랭킹 비로그인 상태
  rest.get(`${BASE_URL}recommend/unsigned`, (req, res, ctx) => {
    const bestCocktails = [
      {
        cocktailId: 1,
        cocktailName: 'sample cocktail',
        cocktailImageUrl:
          'https://i.fltcdn.net/contents/3285/original_1475799975238_qffdj0b2o6r.jpeg',
        isBookmarked: true,
      },
      {
        cocktailId: 2,
        cocktailName: 'sample cocktail',
        cocktailImageUrl:
          'https://i.fltcdn.net/contents/3285/original_1475799975238_qffdj0b2o6r.jpeg',
        isBookmarked: true,
      },
      {
        cocktailId: 3,
        cocktailName: 'sample cocktail',
        cocktailImageUrl:
          'https://i.fltcdn.net/contents/3285/original_1475799975238_qffdj0b2o6r.jpeg',
        isBookmarked: true,
      },
      {
        cocktailId: 4,
        cocktailName: 'sample cocktail',
        cocktailImageUrl:
          'https://i.fltcdn.net/contents/3285/original_1475799975238_qffdj0b2o6r.jpeg',
        isBookmarked: true,
      },
      {
        cocktailId: 5,
        cocktailName: 'sample cocktail',
        cocktailImageUrl:
          'https://i.fltcdn.net/contents/3285/original_1475799975238_qffdj0b2o6r.jpeg',
        isBookmarked: true,
      },
    ];
    return res(ctx.status(200), ctx.json({ bestCocktails }));
  }),

  // ------------------------------------------------------------------------------------------

  // // 메인페이지 랭킹 로그인 상태
  rest.get(`${BASE_URL}recommend/signed`, (req, res, ctx) => {
    const bestCocktails = [
      {
        cocktailId: 1,
        cocktailName: 'sample cocktail',
        cocktailImageUrl:
          'http://res.heraldm.com/content/image/2015/03/12/20150312001242_0.jpg',
        isBookmarked: true,
      },
      {
        cocktailId: 2,
        cocktailName: 'sample cocktail',
        cocktailImageUrl:
          'http://res.heraldm.com/content/image/2015/03/12/20150312001242_0.jpg',
        isBookmarked: true,
      },
      {
        cocktailId: 3,
        cocktailName: 'sample cocktail',
        cocktailImageUrl:
          'http://res.heraldm.com/content/image/2015/03/12/20150312001242_0.jpg',
        isBookmarked: true,
      },
      {
        cocktailId: 4,
        cocktailName: 'sample cocktail',
        cocktailImageUrl:
          'http://res.heraldm.com/content/image/2015/03/12/20150312001242_0.jpg',
        isBookmarked: true,
      },
      {
        cocktailId: 5,
        cocktailName: 'sample cocktail',
        cocktailImageUrl:
          'http://res.heraldm.com/content/image/2015/03/12/20150312001242_0.jpg',
        isBookmarked: true,
      },
    ];
    const recommendedCocktails = [
      {
        cocktailId: 1,
        cocktailName: 'recommended cocktail',
        cocktailImageUrl:
          'http://res.heraldm.com/content/image/2015/03/12/20150312001242_0.jpg',
        isBookmarked: false,
      },
      {
        cocktailId: 2,
        cocktailName: 'recommended cocktail',
        cocktailImageUrl:
          'http://res.heraldm.com/content/image/2015/03/12/20150312001242_0.jpg',
        isBookmarked: false,
      },
      {
        cocktailId: 3,
        cocktailName: 'recommended cocktail',
        cocktailImageUrl:
          'http://res.heraldm.com/content/image/2015/03/12/20150312001242_0.jpg',
        isBookmarked: false,
      },
      {
        cocktailId: 4,
        name: 'recommended cocktail',
        cocktailImageUrl:
          'http://res.heraldm.com/content/image/2015/03/12/20150312001242_0.jpg',
        isBookmarked: false,
      },
      {
        cocktailId: 5,
        name: 'recommended cocktail',
        cocktailImageUrl:
          'http://res.heraldm.com/content/image/2015/03/12/20150312001242_0.jpg',
        isBookmarked: false,
      },
    ];
    return res(
      ctx.status(200),
      ctx.json({ bestCocktails, recommendedCocktails })
    );
  }),

  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 로그인
  rest.post(`${BASE_URL}auth/signin`, (req, res, ctx) => {
    const { email, password } = req.body;
    // 예시로 사용할 유저 정보
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'example@example.com',
    };
    // 예시로 사용할 액세스 토큰과 리프레시 토큰
    const accessToken = 'example_access_token';
    const refreshToken = 'example_refresh_token';
    // 응답 헤더에 사용자 ID, 액세스 토큰, 리프레시 토큰 추가
    const headers = {
      userId: user.id,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    // 예시로 사용할 응답 데이터
    const response = {
      user,
    };
    // 응답 상태 코드 200과 함께 응답 데이터와 헤더 반환
    return res(ctx.status(200), ctx.set(headers), ctx.json(response));
  }),

  // ---------------------------------------------------------------------------

  // 유저 정보 조회
  rest.get(`${BASE_URL}users/:id`, (req, res, ctx) => {
    const { userId: userId } = req.params;
    // 예시로 사용할 응답 데이터
    const responseData = {
      userId: userId,
      name: 'kim',
      profileImageUrl:
        'https://cphoto.asiae.co.kr/listimglink/1/2020051809533442217_1589763214.jpg',
      gender: 'male',
      age: 20,
      email: 'kim@example.com',
      subscribedCount: 0,
      bookmarked: [
        {
          cocktailId: 1,
          name: 'sample cocktail1',
          imageUrl:
            'https://cphoto.asiae.co.kr/listimglink/1/2020051809541442224_1589763254.jpg',
          isBookmarked: true,
        },
        {
          cocktailId: 2,
          name: 'sample cocktail2',
          isBookmarked: true,
        },
      ],
      boards: [
        {
          boardId: 1,
          title: 'title1',
          content: 'content1',
        },
        {
          boardId: 2,
          title: 'title2',
          content: 'content2',
        },
      ],
      subscribe: [
        {
          userId: 1,
          name: 'kim',
          profileImageUrl:
            'https://cphoto.asiae.co.kr/listimglink/1/2020051809541442224_1589763254.jpg',
        },
        {
          userId: 2,
          name: 'park',
          profileImageUrl:
            'https://cphoto.asiae.co.kr/listimglink/1/2020051809541442224_1589763254.jpg',
        },
      ],
    };
    return res(ctx.status(200), ctx.json(responseData));
  }),

  // ----------------------------------------------------------------------------------------------

  // FIXME: 상세 페이지를 볼려면 밑에 코드를 주석을 푸세요
  // rest.get(`${BASE_URL}cocktails/:id`, (req, res, ctx) => {
  //   const { cocktailId: cocktailId } = req.params;
  //   // 예시로 사용할 칵테일 상세정보
  //   const cocktailDetail = {
  //     cocktailId: 1,
  //     userId: 1,
  //     userName: 'chan',
  //     name: '체리주',
  //     imageUrl:
  //       'https://cphoto.asiae.co.kr/listimglink/1/2020051809541442224_1589763254.jpg',
  //     liquor: '럼',
  //     viewCount: 1,
  //     createdAt: '2000-00-00',
  //     modifiedAt: '2000-00-00',
  //     ingredients: [
  //       {
  //         ingredient: 'Light rum',
  //       },
  //       {
  //         ingredient: 'Lime',
  //       },
  //       {
  //         ingredient: 'Sugar',
  //       },
  //       {
  //         ingredient: 'Mint',
  //       },
  //       {
  //         ingredient: 'Soda water',
  //       },
  //       {
  //         ingredient: 'Tonic water',
  //       },
  //       {
  //         ingredient: 'Lemon water',
  //       },
  //       {
  //         ingredient: 'Lime water',
  //       },
  //     ],
  //     recipe: [
  //       { process: `Pour the rum and top with soda water.` },
  //       { process: 'Pour the rum and top with soda water.with soda water.' },
  //       {
  //         process:
  //           'Pour the rum and top with soda water.Pour the rum and top with soda water.',
  //       },
  //       { process: 'Pour the rum and top with soda water.' },
  //       {
  //         process:
  //           'Pour he rum and top with soda water. with soda water with soda water',
  //       },
  //       {
  //         process: 'Pour the rum and top with soda water.',
  //       },
  //     ],
  //     tags: [
  //       {
  //         tag: 'value',
  //       },
  //     ],
  //     rating: 4.5,
  //     comments: [
  //       {
  //         commentId: 1,
  //         userId: 2,
  //         name: 'kim',
  //         content:
  //           '깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!깔끔하고 맛있네요!',
  //         date: '2023-02-16',
  //         replies: [
  //           {
  //             replyId: 1,
  //             userId: 3,
  //             name: 'chan',
  //             content: '저도 그렇게 생각합니다!',
  //             taggedUserInfo: [
  //               {
  //                 taggedUserId: 2,
  //                 taggedUserName: 'kimchi',
  //               },
  //             ],
  //             date: '2023-02-16',
  //           },
  //         ],
  //       },
  //       {
  //         commentId: 2,
  //         userId: 3,
  //         name: 'chan',
  //         content:
  //           '그놈은 멋있었다...백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.백엔드는 멋있었다.',
  //         date: '2023-02-16',
  //         replies: [
  //           {
  //             replyId: 2,
  //             userId: 4,
  //             name: 'jae',
  //             content: '백엔드는 멋있다.',
  //             taggedUserId: 3,
  //             taggedUserName: 'chan',
  //             date: '2023-02-16',
  //           },
  //           {
  //             userId: 3,
  //             name: 'euni',
  //             content:
  //               '이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면 이제 아셨습니까. 휴면',
  //             taggedUserId: 4,
  //             taggedUserName: 'jae',
  //             date: '2023-02-16',
  //           },
  //         ],
  //       },
  //     ],
  //     recommend: [
  //       //category idx 와 userinfo 리덕스 데이터와 겹쳐서 cocktailId와 isBookmarked  달리 수정했습니다.
  //       {
  //         cocktailId: 7,
  //         name: '라떼 밀크주',
  //         imageUrl: 'https://2bob.co.kr/data/recipe/20210707094952-WOE78.jpg',
  //         isBookmarked: false,
  //       },
  //       {
  //         cocktailId: 8,
  //         name: '논알콜 청포도 모히토',
  //         imageUrl: 'https://2bob.co.kr/data/recipe/20210706172910-2B1WD.jpg',
  //         isBookmarked: false,
  //       },
  //       {
  //         cocktailId: 9,
  //         name: '시트러스 주스',
  //         imageUrl: 'https://2bob.co.kr/data/recipe/20210706173724-7B5QW.jpg',
  //         isBookmarked: false,
  //       },
  //     ],
  //     bookmarked: false,
  //     adminWritten: false,
  //   };
  //   return res(ctx.status(200), ctx.json(cocktailDetail));
  // }),

  // --------------------------------------------------------------------------------------

  // FIXME: 카테고리 페이지를 보실려면 밑에 코드를 주석을 푸세요
  // rest.get(
  //   `${BASE_URL}cocktails/filter?page=1&size=$16&sort=most_viewed`,
  //   (req, res, ctx) => {
  //     // 예시로 사용할 필터링 결과
  //     const data = {
  //       data: [
  //         {
  //           cocktailId: 1,
  //           name: 'sample cocktail',
  //           imageUrl:
  //             'https://cphoto.asiae.co.kr/listimglink/1/2020051809541442224_1589763254.jpg',
  //           isBookmarked: true,
  //         },
  //         {
  //           cocktailId: 2,
  //           name: 'sample cocktail',
  //           imageUrl:
  //             'https://cphoto.asiae.co.kr/listimglink/1/2020051809541442224_1589763254.jpg',
  //           isBookmarked: false,
  //         },
  //         {
  //           cocktailId: 3,
  //           name: 'sample cocktail',
  //           imageUrl:
  //             'https://cphoto.asiae.co.kr/listimglink/1/2020051809541442224_1589763254.jpg',
  //           isBookmarked: true,
  //         },
  //         {
  //           cocktailId: 4,
  //           name: 'sample cocktail',
  //           imageUrl:
  //             'https://cphoto.asiae.co.kr/listimglink/1/2020051809541442224_1589763254.jpg',
  //           isBookmarked: false,
  //         },
  //         {
  //           cocktailId: 5,
  //           name: 'sample cocktail',
  //           imageUrl:
  //             'https://cphoto.asiae.co.kr/listimglink/1/2020051809541442224_1589763254.jpg',
  //           isBookmarked: true,
  //         },
  //       ],
  //     };

  //     return res(ctx.status(200), ctx.json(data));
  //   }
  // ),
];
