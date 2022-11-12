'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollToSec1 = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const allAnchor = Array.from(document.getElementsByTagName('a'));

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(el => el.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollToSec1.addEventListener('click', e => {
  section1.scrollIntoView({ behavior: 'smooth' });

  // const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
});

allAnchor.forEach(a => {
  a.addEventListener('click', function (e) {
    e.preventDefault();

    document
      .querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });//this is smooth scolll
  });
});
