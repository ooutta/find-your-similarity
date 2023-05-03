const express = require('express');

const app = express();

const httpRequest = require('request');

const fs = require('fs');

require('dotenv').config();

const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const FormData = require('form-data');
const { default: axios } = require('axios');
const path = require('path');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (request, response) => {
  response.sendFile('index.html');
});

// 1. 네이버 Clova Face Recognition API 연결
app.post('/celebrity', upload.single('image'), (request, response) => {
  const filePath = request.file.path;

  const form = new FormData();
  form.append(
    'image',
    fs.createReadStream(path.join(`${__dirname}/${filePath}`)),
  );

  const url = 'https://openapi.naver.com/v1/vision/celebrity';

  axios.post(url, form, {
    headers: {
      ...form.getHeaders(),
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret,
    },
  })
    .then((res) => {
      console.log(res.data.faces[0].celebrity.value);
      console.log(res.data.faces[0].celebrity.confidence);

      return response.json({
        value: res.data.faces[0].celebrity.value,
        confidence: res.data.faces[0].celebrity.confidence,
      });
    })
    .catch((error) => console.log(error));
});

const port = 3000;
app.listen(port, () => console.log(`http://127.0.0.1:3000/ app listening on port ${port}`));

// 반환 메시지 중 confidence 속성 값이 가장 높은 value 추출
