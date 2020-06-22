const clampBtn = document.querySelector('.detail .detail_moreBtn');
const detailTitle = document.querySelector('.detail .detail_Title');

clampBtn.addEventListener('click', () => {
  clampBtn.classList.toggle('clicked');
  detailTitle.classList.toggle('clampedTitle');
});
