//grid-page
let buttonReadMore = document.querySelector('.grid__button');
let gridShow = document.querySelector('.grid-show');
let gridSecond = document.querySelector('.grid-show_second');
let buttonHide = document.querySelector('.grid__button_hide');

if(buttonReadMore) {
  buttonReadMore.addEventListener('click', function () {
    if(gridShow) {
      gridShow.classList.add('grid-show_second');
    }
    if(buttonReadMore) {
      buttonReadMore.classList.add('grid__button_hide');
    }
  });
}