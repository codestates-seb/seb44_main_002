export const PATH = Object.freeze({
  MAIN_PAGE: '/',
  CATEGORY_PAGE: '/category',
  DETAIL_PAGE: '/detail/',
  USER_PAGE: '/userpage/',
  COCKTAIL_PAGE: '/cocktail',
  MODIFY_PAGE: '/cocktail/',
  SIGNUP_PAGE: '/signup',
  COMMENT_PAGE: '/comment',
  SUCCESS_PAGE: '/success/',
  NOT_FOUND: '*',
});

export const HEADER_TITLE = Object.freeze({
  HOME: 'HOME',
  CATEGORY: 'CATEGORY',
  RECOMMEND: '추천',
  MYPAGE: 'MYPAGE',
});

export const ALERT_MESSAGE = Object.freeze({
  TOKEN_OVER: '토큰만료로 로그아웃되었습니다.',
  WELCOME: '환영합니다!',
  DELETE: '삭제되었습니다.',
  MODIFY: '수정되었습니다.',
  WITHDRAW: '탈퇴되었습니다.',
  PASSWORD_MODIFY: '비밀번호가 정상적으로 변경되었습니다.',
  IMG_FAILED: '이미지 업로드 실패!',
  BIG_IMG: '파일 크기는 1mb 이하여야 합니다.',
  LOGIN_FIRST: '로그인 후 진행해주세요.',
  PATH_CLIPBOARD: '현재 주소가 클립보드에 복사되었습니다.',
  RECIPE_CLIPBOARD: '레시피가 클립보드에 복사되었습니다.',
  ERROR: '서버와의 통신 중 에러가 발생했습니다',
  RATE_OWN_RECIPE: '자신이 작성한 레시피는 평가할 수 없습니다.',
  DOUBLE_CHECK_DELETE: '정말로 삭제하시겠습니까?',
  DOUBLE_CHECK_WITHDRAW: '정말로 탈퇴하시겠습니까?',
});

export const TIME = Object.freeze({
  MINUTES_IN_AN_HOUR: 60,
  MINUTES_IN_A_DAY: 1440,
  MILLISECONDS_TO_MINUTES: 60000,
  TIME_DIFFERENCE: 9,
});
