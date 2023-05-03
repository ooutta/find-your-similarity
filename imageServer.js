const express = require('express');

const app = express();

const httpRequest = require('request');

require('dotenv').config();

const clientId = process.env.IMAGE_CLIENT_ID;
const clientSecret = process.env.IMAGE_CLIENT_SECRET;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (request, response) => {
    response.sendFile('index.html');
});


// 1. 네이버 이미지 검색 API 연결(정렬하여 받기)
app.get('/image', (request, response) => {

    const url = 'https://openapi.naver.com/v1/search/image?query=' + encodeURI(request.query.query);
    console.log(request.query);
    const options =  {
        url,
        qs: {
            display: 1,
            sort: "sim"
        },
        headers: {
            'Content-Type': 'application/json',
            'X-Naver-Client-Id': clientId,
            'X-Naver-Client-Secret': clientSecret,
        }
    }

    httpRequest.get(options, (error, httpResponse, body) => {
        if(!error && response.statusCode === 200){
            const body2=JSON.parse(body);
            const result = {
                image : body2.items[0].link,
                value : request.query.value,
            };
            console.log(result);
            response.send(result); // 서버가 클라이언트로 데이터를 응답
        }
    });
});

const port = 3000;
app.listen(port, () => console.log(`http://127.0.0.1:3000/image app listening on port ${port}`));
// 2. 임의의 value, confidence 값으로 테스트

// 3. 1번값 서버로 보내기
