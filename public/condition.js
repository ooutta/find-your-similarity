const helloBox = document.querySelector('.helloBox');
const findBox = document.querySelector('.findBox');
const resultBox = document.querySelector('.resultBox');

const goFindBtn = document.querySelector('#goFindBtn');
const goResultBtn = document.querySelector('.goResultBtn');
const replayBtn = document.querySelector('#replayBtn');

const helloSection = document.querySelector('.helloSection');
const findSection = document.querySelector('.findSection');
const resultSection = document.querySelector('.resultSection');

let toggleGoFind = false;

const changeToggle = (curSection, nextSection) => {
  toggleGoFind = !toggleGoFind;
  curSection.classList.toggle('hide');

  if (curSection.classList.contains('hide')) {
    curSection.style.display = 'none';
    nextSection.style.display = 'flex';
  } else if (!curSection.classList.contains('hide')) {
    curSection.style.display = 'none';
    nextSection.style.display = 'flex';
  }
};

// helloBox classList에 showBox 가 있다면
goFindBtn.addEventListener('click', () => changeToggle(helloSection, findSection));
goResultBtn.addEventListener('click', () => changeToggle(findSection, resultSection));
replayBtn.addEventListener('click', () => changeToggle(resultSection, helloSection));
