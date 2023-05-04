const previewImg = document.querySelector('#previewImg');
const uploadImg = document.querySelector('#uploadImg');
const submitBtn = document.querySelector('#submitBtn');
const uploadImgForm = document.querySelector('#uploadImgForm');
const celebrityImg = document.querySelector('.celebrityImg');
const myImg = document.querySelector('.myImg');
const [celebrityName, celebrityName2] = document.getElementsByClassName('celebrityName');
const percent = document.querySelector('.percent');
const axios = require('axios');

let uploadFile; // 사용자가 입력한 사진 파일
let celebrity; // 유명인 정보 { 이름, 유사도 }
let inputFile;

/**
 * 서버에 사용자가 입력한 이미지 파일을 넘겨주고, 닮은 유명인 정보를 요청하는 함수
 * @param {*} e 이벤트 파라미터
 */
const requestCelebrity = async (e) => {
  const { uploadImg } = e.target;
  inputFile = uploadImg.files[0];

  // 사진을 선택하지 않고 닮은 꼴 찾기 버튼을 누른 경우 초기 페이지로 이동
  if (inputFile === undefined) {
    alert('사진을 선택해주세요.');
    location.href = '/';
  }
  const formData = new FormData();
  formData.append('image', uploadImg.files[0]);

  await axios.post('/celebrity', formData)
    .then((response) => {
      console.log('######## 로그 확인');
      console.log(response.data);
      // 닮은 사람이 없는 경우
      if (response.data.status === false) {
        alert('닮은 사람이 없습니다.\n시작 페이지로 이동합니다.');
        location.href = '/';
      } else { // 닮은 사람이 있는 경우
        console.log('########### in else');
        console.log(response.data);
        celebrity = response.data;
      }
    })
    .catch((err) => console.log(err));
};

/**
 * 서버에 유명인 이름을 넘겨주고, 유명인의 이미지 url을 요청하는 함수
 */
const requestImage = async () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: { query: celebrity.value },
  };

  await axios.post('/image', options)
    .then((response) => {
      const { value } = response.data;

      // 기존 이미지를 서버로부터 받아온 유명인 이미지로 교체
      myImg.src = URL.createObjectURL(inputFile);
      celebrityImg.src = value;

      // 유명인 이름을 표시
      celebrityName.textContent = celebrity.value;
      celebrityName2.textContent = celebrity.value;

      // 유명인과의 닮은 정도를 퍼센테이지로 표시
      percent.textContent = Math.round(Number(celebrity.confidence) * 100);
    })
    .catch((err) => console.log(err));
};

/**
 * 서버에 데이터를 요청하는 함수
 * @param {} e
 */
const submitImg = async (e) => {
  await requestCelebrity(e);

  await requestImage();
};

/**
 * 이미지 파일 미리보기 기능을 제공하는 함수
 * @param {event} e
 *
 */
const changeImgfile = async (e) => {
  uploadFile = await e.target.files[0];

  const reader = new FileReader();

  reader.onload = async (e) => {
    previewImg.src = e.target.result;
    previewImg.style.display = 'block';
  };

  reader.readAsDataURL(uploadFile);
};

uploadImg.addEventListener('change', (e) => changeImgfile(e));
uploadImgForm.addEventListener('submit', (e) => {
  e.preventDefault();
  submitImg(e);
});
