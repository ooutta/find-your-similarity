// const { default: axios } = require("axios");

const previewImg = document.querySelector('#previewImg');
const uploadImg = document.querySelector('#uploadImg');
const submitBtn = document.querySelector('#submitBtn');
const uploadImgForm = document.querySelector('#uploadImgForm');

let uploadFile;

const submitImg = async (e) => {
    e.preventDefault();
    const { uploadImg } = e.target;
    // console.log(uploadImg.files[0]);
    const formData = new FormData();
    formData.append('image', uploadImg.files[0]);

    const test = axios.post('/celebrity', formData)
    .then(res => console.log(res))
    .catch(err => console.log(err));

    /*
      console.log(test);
      const getData = () => {
        test.then((appData) => {
          console.log(appData);
        });
      };

      getData();
    */
}


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
    submitImg(e)
});