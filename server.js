const express = require('express');

const app = express();

const httpRequest = require('request');

const fs = require('fs');

require('dotenv').config();

const multer = require('multer');

const { default: axios } = require('axios');

const FormData = require('form-data');

const upload = multer({ dest: 'uploads/' });

const path = require('path');
const { error } = require('console');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (request, response) => {
  response.sendFile('index.html');
});

// 1. 네이버 Clova Face Recognition API 연결
app.post('/celebrity', upload.single('image'), (request, response) => {
  const form = new FormData();
  form.append(
    'image',
    fs.createReadStream(path.join(`${__dirname}/${request.file.path}`)),
  );

  const url = 'https://openapi.naver.com/v1/vision/celebrity';

  axios.post(url, form, {
    headers: {
      ...form.getHeaders(),
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret,
    },
  })
    .then(async (res) => {
      if (response.statusCode === 200) {
        return response.json({
          value: res.data.faces[0].celebrity.value,
          confidence: res.data.faces[0].celebrity.confidence,
        });
      }
      throw error;
    })
    .catch((error) => {
      console.log('########### in error');
      console.log(error);
    });
});

app.post('/image', (request, response) => {
  const value = JSON.stringify(request.body.body.query);
  const url = `https://openapi.naver.com/v1/search/image?query=${encodeURI(value)}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret,
    },
    params: {
      display: 1,
      sort: 'sim',
    },
  };

  axios.get(url, config)
    .then(async (res) => {
      if (res.status === 200) {
        console.log('######## in if');
        console.log(res.data.items[0].link);
        return response.json({
          value: res.data.items[0].link,
        });
      }
    })
    .catch((error) => {
      console.log('########### in error');
      console.log(error);
    });
});

const port = 3000;
app.listen(port, () => console.log(`http://127.0.0.1:3000/ app listening on port ${port}`));

// 반환 메시지 중 confidence 속성 값이 가장 높은 value 추출
