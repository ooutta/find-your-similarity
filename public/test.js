const previewImg = document.querySelector('#previewImg');
const uploadImg = document.querySelector('#uploadImg');
const submitBtn = document.querySelector('#submitBtn');
const uploadImgForm = document.querySelector('#uploadImgForm');
const celebrityImg = document.querySelector('.celebrityImg');
const myImg = document.querySelector('.myImg');

let uploadFile;
let value;

const submitImg = async (e) => {
  const { uploadImg } = e.target;
  // console.log(uploadImg.files[0]);
  const inputFile = uploadImg.files[0]; //
  const formData = new FormData();
  formData.append('image', uploadImg.files[0]);

  await axios.post('/celebrity', formData)
    .then((response) => {
      celebrity = response.data;
      console.log(celebrity.value);
      console.log(celebrity.confidence);
    })
    .catch((err) => console.log(err));

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: { query: celebrity.value },
  };

  await axios.post('/image', options)
    .then((response) => {
      value = response.data.value;
      console.log(value);
      celebrityImg.src = value;
      myImg.src = URL.createObjectURL(inputFile);
    })
    .catch((err) => console.log(err));
};

/**
 *
 * 이미지 파일 미리보기 기능
 * @param {event} e
 *
 */
const changeImgfile = async (e) => {
  // console.log(e);
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
