# 🍻 Intro

## 지친 직장인들의 오아시스, 편의점에서 한잔 어떠세요? 편한

<div align="center"><img width="100%" src="https://cdn.discordapp.com/attachments/1122692656875708549/1132247597164273705/image.png" alt="logo" /></div>
</br>

# 🔗 배포주소 : <a href="https://main--comfortablecocktail.netlify.app/" target="_blank">편한</a>

<br />

# 🔗 서비스 메뉴얼 : <a href="https://www.notion.so/984855e488254f5b968080ac588d9231" target="_blank">노션링크</a>

</br>

# 개요

저희의 웹서비스, 편한은 칵테일 레시피 정보를 제공하는 웹사이트입니다.<br/>
자신이 직접 레시피를 등록하여 다른 사용자들과 레시피를 공유할 수 있습니다. <br/>
사용자의 나이와 성별을 기반으로 북마크한 칵테일의 태그와 관련도가 높은 칵테일을 추천해드립니다.

<br />

## 테스트 계정

- id: test@test.com
  <br />
- password: test1234
  <br />
  <br />

# 👨‍👩‍👧‍👦 팀원 소개

### Frontend

|                                                                                      황찬우 (FE 팀장)                                                                                       |                                            이은희 (FE 팀원)                                             |                                             김민재 (FE 팀원)                                             |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: |
| <img src="https://images-ext-1.discordapp.net/external/kQhSS4IkcxGfV-3wNzTUXgmrU4C46M82rsWScdIZ0s4/%3Fv%3D4/https/avatars.githubusercontent.com/u/49116370?width=924&height=924" width=150> | <img src="https://avatars.githubusercontent.com/u/82435813?v=4"  alt="beucol" width="150" height="150"> | <img src="https://avatars.githubusercontent.com/u/88226519?v=4"  alt="beucol" width="150" height="150" > |
|                                                                          [@HChanWoo](https://github.com/HChanWoo)                                                                           |                                  [@joywhy](https://github.com/joywhy)                                   |                               [@crowcrow07](https://github.com/crowcrow07)                               |

### Backend

|                                           노재경 (BE 부팀장)                                           |                                             박태양 (BE 팀원)                                             |                                             김수민 (BE 팀원)                                             |
| :----------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/85445649?v=4" alt="beucol" width="150" height="150"> | <img src="https://avatars.githubusercontent.com/u/124670911?v=4"  alt="beucol" width="150" height="150"> | <img src="https://avatars.githubusercontent.com/u/109536532?v=4"  alt="beucol" width="150" height="150"> |
|                               [@jkroh1995](https://github.com/jkroh1995)                               |                            [@park-tae-yang](https://github.com/park-tae-yang)                            |                                 [@soomni95](https://github.com/soomni95)                                 |

<br />

<details>
<summary>개발 파트</summary>
<div markdown="1">

## FE

### 황찬우

1. 상세페이지
2. 유저페이지
3. 카테고리페이지 페이지네이션
4. 에러페이지

### 이은희

1. 로그인,회원가입 ,jwt 토큰재발급
2. 카테고리페이지
3. 댓글,대댓글 수정페이지
4. 웹페이지 프로토타입 디자인

### 김민재

1. 메인페이지
2. 칵테일 등록
3. 칵테일 수정
4. 모킹 서버 구축
5. 클라이언트 배포 환경 구축

## BE

### 노재경

- 칵테일 목록 조회
  - 태그, 카테고리별 조회 기능 구현
    - 순수 spring data jpa 메서드만으로 구현 (정렬 제외)
- 칵테일 북마크 기능 구현
- 칵테일 랭킹 기능 구현
  - 북마크 도메인이 지닌 사용자 취향 반영이라는 상태성을 이용하여 북마크 테이블을 조회하는 방식으로 구현
    - group by, count 등의 기능을 jpql을 활용하여 구현
- 칵테일 CRUD 기능 구현
- 별점 등록 기능 구현
  - 별점을 별도의 테이블이 아닌, 칵테일 내부에 Embed 시켜 칼럼으로 처리하여 칵테일과 연관관계에 있는 테이블 생성을 최소화
    - 사용자 엔티티 내부에 <별점을 매긴 칵테일 : 별점>의 별도 Collection Table을 두어 별점 중복 등록 여부 확인
- 사용자 구독 기능 구현
  - 내가 구독한 사용자 목록 출력을 위한 별도의 VO (Following) 적용
- 칵테일 상세 페이지 하단부 추천 칵테일 구현
  - Transient한 칵테일 컬렉션을 칵테일 엔티티 내에 두어 조회시마다 새롭게 생성하게 구현

### 김수민

1. 댓글 crud
2. 답글 crud

### 박태양

1. user CRUD
2. spring security
3. JWT
</div>

</div>
</details>

# 🚀 Demo

## 🔗 프로젝트 상세정보 : <a href="https://www.miricanvas.com/v/129l0hc" target="_blank">PPT</a>

| 메인페이지                                                                                                                                               | 카테고리페이지                                                                                                                                           | 상세페이지                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://cdn.discordapp.com/attachments/1122692656875708549/1132847111961067570/image.png" width="100%" height="100%">                          | <img src="https://cdn.discordapp.com/attachments/1122692656875708549/1132847305117143130/image.png" width="100%" height="100%">                          | <img src="https://cdn.discordapp.com/attachments/1122692656875708549/1132847471719100597/image.png" width="100%" height="100%">                          |
| 칵테일등록페이지                                                                                                                                         | 마이페이지                                                                                                                                               | 댓글                                                                                                                                                     |
| <img src="https://cdn.discordapp.com/attachments/1122692656875708549/1132851756108370020/image.png" width="100%" height="100%">                          | <img src="https://media.discordapp.net/attachments/1122692656875708549/1132848688683823194/image.png?width=2162&height=1364" width="100%" height="100%"> | <img src="https://media.discordapp.net/attachments/1122692656875708549/1132847585447661649/image.png?width=2160&height=1364" width="100%" height="100%"> |
| 회원가입페이지                                                                                                                                           | 칵테일 등록 성공페이지                                                                                                                                   | 페이지네이션                                                                                                                                             |
| <img src="https://cdn.discordapp.com/attachments/1122692656875708549/1132853485210181702/image.png" width="100%" height="100%">                          | <img src="https://cdn.discordapp.com/attachments/1122692656875708549/1132851946647199754/image.png" width="100%" height="100%">                          | <img src="https://media.discordapp.net/attachments/1122692656875708549/1132853842791370802/image.png?width=2158&height=1364" width="100%" height="100%"> |
| 로그인                                                                                                                                                   | 랭킹페이지                                                                                                                                               | 댓글 수정페이지                                                                                                                                          |
| <img src="https://media.discordapp.net/attachments/1122692656875708549/1132855793457319936/image.png?width=2158&height=1364" width="100%" height="100%"> | <img src="https://media.discordapp.net/attachments/1122692656875708549/1132857014951890994/image.png?width=2160&height=1364" width="100%" height="100%"> | <img src="https://media.discordapp.net/attachments/1122692656875708549/1132857569048809573/image.png?width=2180&height=1361" width="100%" height="100%"> |

</br>
</br>

# ⚡️ Skills

<img src="https://cdn.discordapp.com/attachments/1122692656875708549/1132840534344466443/image_5.png" alt="skills">

</br>
</br>

# Git-Convention

| 기능 이름 | 기능 설명                                                                          |
| --------- | ---------------------------------------------------------------------------------- |
| Feat:     | 새로운 기능 추가                                                                   |
| Fix:      | 버그 수정 또는 typo                                                                |
| Refactor: | 리팩토링                                                                           |
| Chore:    | 위에 걸리지 않는 기타 변경사항(빌드 스크립트 수정, assets image, 패키지 매니저 등) |
| Init:     | 프로젝트 초기 생성                                                                 |
