const express = require('express');

const app = express();

const httpRequest = require('request');

const fs = require('fs');

require('dotenv').config();

// 잠깐
const multer = require('multer');
const upload = multer({dest: "uploads/"});
const FormData = require("form-data");
const { default: axios } = require('axios');
const path = require("path");

/*
app.use(express.static(path.join(__dirname, "public")));
app.use("/image", express.static(path.join(__dirname, "uploads"))); // 이 한 줄이 갖는 코드의 의미가 크다.
app.use(bodyParser.urlencoded({ urlencoded: true }));
app.use(express.json());
*/

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (request, response) => {
  response.sendFile('index.html');
});

// 1. 네이버 Clova Face Recognition API 연결
app.post('/celebrity', upload.single("image") , (request, response) => {
  
  const filePath = request.file.path;
  console.log("filePathfilePathfilePath!!!");
  console.log(filePath);

  const form = new FormData();
  form.append(
    "image",
    fs.createReadStream(path.join(`${__dirname}/` + filePath))
  );

  const url = 'https://openapi.naver.com/v1/vision/celebrity';

  console.log('test ###############');

  axios.post(url, form, {
    headers: {
      ...form.getHeaders(),
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret,
    },
  })
  .then((response) => {
    console.log("!!!");
    console.log(response.data.faces[0].celebrity.value);
    console.log(response.data.faces[0].celebrity.confidence);
    return response.data;
  })
  .catch((error) => console.log(error));

  // const formData = {
  //   // image: fs.createReadStream(`${__dirname}\\test.png`),
  //   image: request.body.image,
  // };

  // const options = {
  //   url,
  //   formData,
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //     'X-Naver-Client-Id': clientId,
  //     'X-Naver-Client-Secret': clientSecret,
  //   },
  // };

  // httpRequest.post(options, (error, httpResponse, body) => {
  //   if (!error && response.statusCode === 200) {
  //     const body2 = JSON.parse(body);
  //     console.log(body2);
  //     // console.log(body2.faces[0].celebrity.value, body2.faces[0].celebrity.confidence);
  //   } else {
  //     console.log(error);
  //   }
  // });
});

const port = 3000;
app.listen(port, () => console.log(`http://127.0.0.1:3000/ app listening on port ${port}`));

// 2. 임의의 이미지로 기능 테스트

// 3. 반환 메시지 중 confidence 속성 값이 가장 높은 value 추출