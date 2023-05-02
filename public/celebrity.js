const previewImg = document.querySelector('#previewImg');
const uploadImg = document.querySelector('#uploadImg');
const submitBtn = document.querySelector('#submitBtn');
const uploadImgForm = document.querySelector('#uploadImgForm');

let uploadFile;

const submitImage = (imageFile, event) => {
    event.preventDefault();

    console.log(imageFile);

    const formData = new FormData();
    formData.append('image', imageFile);

    fetch('/celebrity', {
        method: 'POST',
        body: formData,
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }).then((data) => {
        console.log(data); // 받은 데이터 처리
    }).catch((error) => {
        console.log(error);
    });
};


/**
 * 
 * 이미지 파일 미리보기 기능
 * @param {event} e 
 * 
 */
const changeImgfile = (e) => {
    console.log(e);
    uploadFile = e.target.files[0];

    const reader = new FileReader();

    reader.onload = (e) => {
        previewImg.src = e.target.result;
        previewImg.style.display = 'block';
    };

    reader.readAsDataURL(uploadFile);
};

uploadImg.addEventListener('change', (e) => changeImgfile(e));
uploadImgForm.addEventListener('submit', (e) => submitImage(uploadFile, e));