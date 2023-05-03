const previewImg = document.querySelector('#previewImg');
const uploadImg = document.querySelector('#uploadImg');
const submitBtn = document.querySelector('#submitBtn');
const uploadImgForm = document.querySelector('#uploadImgForm');

let uploadFile;

const submitImage = async (imageFile, event) => {
  event.preventDefault();

  console.log('################ 1');
  console.log(imageFile);

  const formData = new FormData();
  formData.append('image', imageFile);

  const body = {
    method: 'POST',
    headers: {
      'Content-Type': 'image/png',
    },
    body: formData,
  };

  console.log('######### fetch 전');
  // console.log(body.body);

  await fetch('/celebrity', body)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      console.log('######### 성공');
    })
    .catch((error) => {
      console.log('######### 실패');
      console.error(error);
    });
};

/**
 *
 * 이미지 파일 미리보기 기능
 * @param {event} e
 *
 */
const changeImgfile = async (e) => {
  console.log(e);
  uploadFile = await e.target.files[0];

  const reader = new FileReader();

  reader.onload = async (e) => {
    previewImg.src = e.target.result;
    previewImg.style.display = 'block';
  };

  reader.readAsDataURL(uploadFile);
};

uploadImg.addEventListener('change', (e) => changeImgfile(e));
// uploadImgForm.addEventListener('submit', (e) => submitImage(uploadFile, e));
submitBtn.addEventListener('click', (e) => submitImage(uploadFile, e));

// const express = require('express');

// const app = express();

// const httpRequest = require('request');

// const fs = require('fs');

// require('dotenv').config();

// const clientId = process.env.CLIENT_ID;
// const clientSecret = process.env.CLIENT_SECRET;

// app.use(express.static('public'));
// app.use(express.json());

// app.get('/', (request, response) => {
//   response.sendFile('index.html');
// });

// // 1. 네이버 Clova Face Recognition API 연결
// app.post('/celebrity', (request, response) => {
//   const url = 'https://openapi.naver.com/v1/vision/celebrity';

//   console.log('test ###############');

//   const formData = {
//     // image: fs.createReadStream(`${__dirname}\\test.png`),
//     image: 'image',
//     // image: request.body.image,
//     image: fs.createReadStream(request.body.image),
//   };

//   const options = {
//     url,
//     formData,
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       'X-Naver-Client-Id': clientId,
//       'X-Naver-Client-Secret': clientSecret,
//     },
//   };

//   httpRequest.post(options, (error, httpResponse, body) => {
//     if (!error && response.statusCode === 200) {
//       const body2 = JSON.parse(body);
//       console.log(body2);
//       // console.log(body2.faces[0].celebrity.value, body2.faces[0].celebrity.confidence);
//     } else {
//       console.log(error);
//     }
//   });
// });

// const port = 3000;
// app.listen(port, () => console.log(`http://127.0.0.1:3000/ app listening on port ${port}`));

// 2. 임의의 이미지로 기능 테스트

// 3. 반환 메시지 중 confidence 속성 값이 가장 높은 value 추출
