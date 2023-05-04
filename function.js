const path = require('path');

const fs = require('fs');
const FormData = require('form-data');

require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

/**
 * 네이버 API 접근 권한 부여
 */
const setAuthority = {
  'X-Naver-Client-Id': clientId,
  'X-Naver-Client-Secret': clientSecret,
};

/**
 * 네이버 CFR API의 요청 폼 생성
 *
 * @param {*} request
 * @returns
 */
const createForm = (request) => {
  const form = new FormData();
  form.append(
    'image',
    fs.createReadStream(path.join(`${__dirname}/${request.file.path}`)),
  );
  return form;
};

/**
 * 닮은 유명인 수에 따라 리턴할 json 결정
 * @param {*} response front-end 응답
 * @param {*} res 네이버 CFR API 응답
 * @returns front-end에 {데이터 상태(true:있음/false:없음), 유명인 이름, 닮은 정도} 전송
 */
const responseData = (response, res) => {
  // 닮은 유명인이 1명 이상인 경우
  if (Number(res.data.info.faceCount) >= 1) {
    // 닮은 유명인이 2명 이상인 경우 유사도가 가장 높은 유명인 데이터를 리턴
    if (Number(res.data.info.faceCount) > 1) {
      const faceList = res.data.faces;
      let max = faceList[0].confidence;
      for (let i = 1; i < faceList.length; i++) {
        if (max < faceList[i].confidence) {
          max = faceList[i].confidence;
        }
      }
    }
    return response.json({
      status: true,
      value: res.data.faces[0].celebrity.value,
      confidence: res.data.faces[0].celebrity.confidence,
    });
  }

  // 닮은 유명인이 없는 경우
  if (Number(res.data.info.faceCount) === 0) {
    return response.json({
      status: false,
    });
  }
};

module.exports = {
  setAuthority,
  createForm,
  responseData,
};
