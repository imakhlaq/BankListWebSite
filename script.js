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

// btnScrollToSec1.addEventListener('click', e => {
//   section1.scrollIntoView({ behavior: 'smooth' });

//   // const s1coords = section1.getBoundingClientRect();
//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });
// });

// allAnchor.forEach(a => {
//   a.addEventListener('click', function (e) {
//     e.preventDefault();

//     document
//       .querySelector(this.getAttribute('href'))
//       .scrollIntoView({ behavior: 'smooth' }); //this is smooth scolll
//   });
// });

/*
// bubbling

const randomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomNum(0, 255)},${randomNum(0, 255)},${randomNum(0, 255)})`;

// link
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
//links parent
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
//parent nav
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
*/

// event deligation
const nav = document.querySelector('.nav__links');

nav.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//cpmponent
const parentOption = document.querySelector('.operations__tab-container');
const allOptions = document.querySelectorAll('.operations__tab');

parentOption.addEventListener('click', e => {
  //making sure that even i click on span elemnet it registers as ckick on parent element
  const clickedEl = e.target.closest('.operations__tab');

  //removing default hover
  allOptions.forEach(option =>
    option.classList.remove('operations__tab--active')
  );
  //adding hover to clicked element

  //making sure if clicked on the parent element nothing happend
  // if element is not clickedel then return
  if (!clickedEl) return;

  clickedEl.classList.add('operations__tab--active');
});
