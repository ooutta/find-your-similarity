const { setAuthority, createForm, responseData } = require('function.js');

const express = require('express');

const app = express();

const multer = require('multer');

const { default: axios } = require('axios');

const upload = multer({ dest: `${__dirname}/uploads/` });

app.use(express.static('public'));
app.use(express.json());

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/index.html`);
});

/**
 * 네이버 Clova Face Recognition API 연결
 */
app.post('/celebrity', upload.single('image'), (request, response) => {
  const form = createForm(request);

  const url = 'https://openapi.naver.com/v1/vision/celebrity';

  // 네이버 CFR에 이미지를 전송하여, 닮은꼴 연예인 이름과 유사도 요청
  axios.post(url, form, {
    headers: { // Content-Type, API 인증 정보
      ...form.getHeaders(),
      ...setAuthority,
    },
  })
    .then(async (res) => {
      if (response.statusCode === 200) {
        // return 유명인 객체 정보 { 객체 유무, 이름, 유사도 }
        return responseData(response, res);
      }
    })
    .catch((error) => {
      console.log('########### in error');
      console.log(error);
    });
});

/**
 * 네이버 이미지 검색 API 연결
 */
app.post('/image', (request, response) => {
  const value = `${JSON.stringify(request.body.body.query)}`;
  const url = `https://openapi.naver.com/v1/search/image?query=${encodeURI(value)}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...setAuthority,
    },
    params: {
      display: 1,
      sort: 'sim',
    },
  };

  // 네이버 이미지 검색 API에 유명인 이름 전송 후, 유명인 이미지 요청
  axios.get(url, config)
    .then(async (res) => {
      let value;
      try {
        if (res.status === 200) {
          value = res.data.items[0].link;
        }
      } catch (error) {
        console.log(error);
        value = false;
      }

      return response.json({ value });
    })
    .catch((error) => {
      console.log(error);
    });
});

const port = 3000;
app.listen(port, () => console.log(`http://127.0.0.1:3000/ app listening on port ${port}`));
