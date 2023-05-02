const express = require('express');

const app = express();

const httpRequest = require('request');

const fs = require('fs');

require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

app.use(express.static('public'));
app.use(express.json());

// 1. 네이버 Clova Face Recognition API 연결
app.get('/celebrity', (request, response) => {
  const url = 'https://openapi.naver.com/v1/vision/celebrity';

  const formData = {
    // image: fs.createReadStream(`${__dirname}\\test.png`),
    image: request.body.image,
  };

  const options = {
    url,
    formData,
    headers: {
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret,
    },
  };

  httpRequest.post(options, (error, httpResponse, body) => {
    if (!error && response.statusCode === 200) {
      const body2 = JSON.parse(body);
      console.log(body2.faces[0].celebrity.value, body2.faces[0].celebrity.confidence);
    } else {
      console.log(error);
    }
  });
});

const port = 3000;
app.listen(port, () => console.log(`http://127.0.0.1:3000/celebrity app listening on port ${port}`));

// 2. 임의의 이미지로 기능 테스트

// 3. 반환 메시지 중 confidence 속성 값이 가장 높은 value 추출
