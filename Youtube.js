const detailMoreBtn = document.querySelector('.detail .detail_moreBtn');
const detailTitle = document.querySelector('.detail .detail_Title');

detailMoreBtn.addEventListener('click', () => {
  detailTitle.classList.toggle('fullTitled');
  detailMoreBtn.classList.toggle('clicked');
});
