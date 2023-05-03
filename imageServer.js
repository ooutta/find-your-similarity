app.get('/image', (request, response) => {
  const url = `https://openapi.naver.com/v1/search/image?query=${encodeURI(request.query.query)}`;
  console.log(request.query);
  const options = {
    url,
    qs: {
      display: 1,
      sort: 'sim',
    },
    headers: {
      'Content-Type': 'application/json',
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret,
    },
  };

  httpRequest.get(options, (error, httpResponse, body) => {
    if (!error && response.statusCode === 200) {
      const body2 = JSON.parse(body);
      const result = {
        image: body2.items[0].link,
        value: request.query.value,
      };
      console.log(result);
      response.send(result); // 서버가 클라이언트로 데이터를 응답
    }
  });
});
