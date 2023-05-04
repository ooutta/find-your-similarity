# 팀명
<div align="center">
<br />
<img width="80%" src="https://user-images.githubusercontent.com/81960250/236080184-e22c866a-eb27-4d06-9de9-1c4cea7319f4.png"/>

<br /><br />

## 👀 당신의 닮은 꼴 알고 싶지 않으세요 ? 👀

**팀명**은 사진을 업로드하면, 닮은 유명인을 알려주는 서비스입니다!

<br /><br /><br />


## 👀 서비스 소개
![ezgif com-video-to-gif](https://user-images.githubusercontent.com/93786956/236115804-a09e693b-18c4-4fc6-9a60-3a0c8e1edd7b.gif)

`홈`, `업로드`, `결과` 총 3개의 section으로 구성되어 있으며<br />
사진을 업로드하면, NAVER CFR API(유명인 얼굴 인식 API)로 닮은 유명인을 알려주고,<br />
해당 유명인을 NAVER 검색 API 이미지 검색을 통해 유명인 사진을 보여주는 서비스 입니다.<br />

<br /><br />

## 📝 구상
<table>
  <tr>
    <td align="center">
      <img src="https://user-images.githubusercontent.com/81960250/236083115-db06fdfe-ec54-4b6a-8ccd-d0735f40d6ea.jpg" width="300">
    </td>
    <td align="center">
      <img src="https://user-images.githubusercontent.com/81960250/236082927-23ac5996-85ac-4b48-81b0-63ded578415b.jpg" width="300">
    </td>
    <td align="center">
      <img src="https://user-images.githubusercontent.com/81960250/236082920-df117669-42ac-4a8e-9585-c54e2b63d824.jpg" width="300">
    </td>
  </tr>
  <tr>
    <td align="center">
      <p>시작 페이지</p>
    </td>
    <td align="center">
      <p>업로드 페이지</p>
    </td>
    <td align="center">
      <p>결과 페이지</p>
    </td>
  </tr>
</table>
<br /><br />

# 🛠 개발 환경
### FIGMA
### Node.js

<br /><br />

## ✉️ 프로젝트 폴더 구조
### 
<div align=left>
  <pre><code>
  find-your-similarity
  ├─ .github
  ├─ .eslintrc.json
  ├─ .gitignore
  ├─ .README.md
  ├─ function.js
  ├─ index.html
  ├─ public
  │  └─ src
  │     ├─ images
  │     │  ├─ bono.jpeg
  │     │  ├─ bonobono.jpeg
  │     │  └─ bonobonoHouse.jpeg
  │     ├─ condition.js
  │     ├─ index.css
  │     └─ index.js
  └─ server.js
  </code></pre>
</div>

<br /><br />

## ⚙️ Dependencies

<div align=left>
  <pre><code>
  "dependencies": {
    "axios": "^1.4.0",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "fs": "^0.0.1-security",
    "multer": "^1.4.5-lts.1",
    "path": "^0.12.7",
    "request": "^2.88.2"
  },
  
  "devDependencies": {
    "eslint": "^8.39.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-plugin-import": "^2.27.5"
  }
  </code></pre>
</div>


<br /><br />

<div align="left">

<br />

## 📧API 명세서
### Clover Face Recongition(CFR)
___
  CFR API는 이미지 데이터를 입력 받아 얼굴 인식 결과를 JSON 형태로 반환하는 HTTP 기반의 REST API이며, 사용자 인증이 필요하지 않은 비로그인 Open API입니다.  
  얼굴 분석 정보를 제공하는 얼굴 감지 API와 닮은 연예인을 알려주는 유명인 얼굴 인식 API를 제공합니다.  
  저희 프로젝트에는 유명인 얼굴 인식 API를 이용하였습니다.
  


### 유명인 얼굴 인식 API
입력받은 이미지로부터 얼굴을 감지하고 감지한 얼굴을 어떤 유명인과 닮았는지 분석하여 그 결과를 반환하는 REST API 입니다.

<br />

**Request**
<br /> <br /> 
<img width="80%" src="https://user-images.githubusercontent.com/59864345/236082090-ba17f421-3d95-485d-bdae-1d72dbdf9b8b.png"/>

<br />

**Response**
<br /> 
* Response Elements
<img width="80%" src="https://user-images.githubusercontent.com/59864345/236082802-8a4b77ea-83b5-4fb7-b198-605e92358d31.png"/>

<br />

* Response Syntax  
<img width="50%" src="https://user-images.githubusercontent.com/59864345/236083007-64b8c330-baa9-4c1b-b16e-57bb0f6c84cd.png"/>

<br /><br />

### 이미지 검색 API
___
이미지 검색은 검색 API를 사용해 네이버 검색의 이미지 검색 결과를 XML또는 JSON 형식으로 반환하는 RESTful API입니다.  
API를 호출할 때는 검색어와 검색 조건을 Query String  형식의 데이터로 전달합니다.  
  
**Request**
<br /> 
* HTTP Method : GET
* Request URL : https://openapi.naver.com/v1/search/image
* Parameter
<img width="80%" src="https://user-images.githubusercontent.com/59864345/236090974-09d0fed6-f3f8-4463-8176-b22bc0d32c6e.png"/>

<br /><br /> 

**Response**
<br /> <br /> 
<img width="80%" src="https://user-images.githubusercontent.com/59864345/236092290-06048c1e-358e-496a-9635-86bb77e5c91a.png"/>

<br /><br />

# ✉️ Commit Messge Rules
### [수행한 작업의 카테고리(대문자로)] + 상세 내용  
#### ([]부분은 하단의 commit convention에 따릅니다)

### 📌 Commit Convention
* FEAT : 새로운 기능 추가
* FIX : 버그 수정
* CHORE : 짜잘한 수정
* INIT : 초기 설정
* REFACTOR : 코드 리펙토링
* DOCS : 문서 수정

### **커밋 타입**

<br /><br />

## ✍🏻 Code Convention

[에어비앤비 코드 컨벤션](https://github.com/airbnb/javascript)

<br /><br />

## 📍 Gitflow 규칙

- issue 생성 ⇒ 브랜치 생성
- 해당 브랜치로 이동 후 작업 & 기능별로 커밋
- 커밋 메세지는 컨벤션에 따라
- 기능 생성 및 오류 수정 완료 시, PR 보내기 
⇒ 코드 리뷰 및 리팩토링
- 테스트 및 merge ⇒ 오류 X, 검증 완료 시 main브랜치에 merge

<br /><br />


## ❗️ branch naming convention

- develop
- feature/issue_number or Short Description
- release/version_number
- hotfix/issue_number or Short Description

<br /><br />

## 📋 Code Review Convention

- P1: 꼭 반영해주세요 (Request changes)
- P2: 적극적으로 고려해주세요 (Request changes)
- P3: 웬만하면 반영해 주세요 (Comment)
- P4: 반영해도 좋고 넘어가도 좋습니다 (Approve)
- P5: 그냥 사소한 의견입니다 (Approve)

- D-0 (ASAP)

긴급한 수정사항으로 바로 리뷰해 주세요. 앱의 오류로 인해 장애가 발생하거나, 빌드가 되지 않는 등 긴급 이슈가 발생할 때 사용합니다.

- D-N (Within N days)

“Working Day 기준으로 N일 이내에 리뷰해 주세요”

<br /><br />

### 🙋🏻‍♀️ 담당
* front
- 시작, 업로드, 결과 페이지 구성
- 전체 페이지 CSS 디자인
- 페이지 버튼 클릭 시, 각 section 보여주기
- 이미지 업로드 

* back
  - CFR API
  
  
  - 이미지 검색
  

<br /><br />

</div>


## 👾 구현 화면

- gif 사진 올리기

<br /><br />

## 😎 팀 소개
<table>
  <tr>
    <td align="center">
      <img src="https://github.com/ooutta.png" width="80">
    </td>
    <td align="center">
      <img src="https://github.com/alsth712.png" width="80">
    </td>
    <td align="center">
      <img src="https://github.com/yybeen.png" width="80">
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/ooutta">김수현</a>
    </td>
    <td align="center">
      <a href="https://github.com/alsth712">이소민</a>
    </td>
    <td align="center">
      <a href="https://github.com/yybeen">복영빈</a>
    </td>
  </tr>
</table>
</div>
