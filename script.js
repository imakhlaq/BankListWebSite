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

//component
const parentOption = document.querySelector('.operations__tab-container');
const allOptions = document.querySelectorAll('.operations__tab');
const info = document.querySelectorAll('.operations__content');

parentOption.addEventListener('click', e => {
  //making sure that even i click on span elemnet it registers as ckick on parent element
  const clickedEl = e.target.closest('.operations__tab');

  //making sure if clicked on the parent element nothing happend
  // if element is not clickedel then return
  if (!clickedEl) return;

  //removing default hover
  allOptions.forEach(option =>
    option.classList.remove('operations__tab--active')
  );
  //adding hover to clicked element

  clickedEl.classList.add('operations__tab--active');

  //only showing clicked one
  info.forEach(hide => hide.classList.remove('operations__content--active'));

  //Activating content area
  const dataToShow = document.querySelector(
    `.operations__content--${clickedEl.dataset.tab}`
  );
  dataToShow.classList.add('operations__content--active');
});

//fade effect
const navCon = document.querySelector('.nav');

const fadeAni = function (e) {
  //current clicked element
  const clicked = e.target;
  const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
  if (e.target != navCon) {
    siblings.forEach(link => {
      if (link !== clicked) link.style.opacity = this;
    });
    const logo = document.querySelector('.nav__logo');
    logo.style.opacity = this;
  }
};
navCon.addEventListener('mouseover', fadeAni.bind(0.5));
navCon.addEventListener('mouseout', fadeAni.bind(1));

//sticky nave bar
const header = document.querySelector('.header');
const sticky = function (entries, object) {
  const [entrie] = entries;
  if (!entrie.isIntersecting) {
    navCon.classList.add('sticky');
  } else {
    navCon.classList.remove('sticky');
  }
};
const options = {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
};
const navObserver = new IntersectionObserver(sticky, options);
navObserver.observe(header);

//scroll effect
//selecting all the section and appling the effect
const sections = document.querySelectorAll('.section');

const reveling = function (entries, object) {
  const [entrie] = entries;

  if (!entrie.isIntersecting) return;
  entrie.target.classList.remove('section--hidden');
  // observe.unobserve(entrie.target);
};

const options2 = {
  root: null,
  threshold: 0.3,
};

//creating a observer
const revilOnScroll = new IntersectionObserver(reveling, options2);

sections.forEach(section => {
  //section.classList.add('section--hidden');
  revilOnScroll.observe(section);
});

// lazy loding the img

const allimgwithlazyload = document.querySelectorAll('.lazy-img');

const imgload = function (entries, object) {
  const [entrie] = entries;

  if (!entrie.isIntersecting) return;
  entrie.target.src = entrie.target.dataset.src;

  entrie.target.addEventListener('load', () => {
    entrie.target.classList.remove('lazy-img');
  });

  imglazy.unobserve(entrie.target);
};

const options3 = {
  root: null,
  threshold: 0,
  rootMargin: '200px',
};
const imglazy = new IntersectionObserver(imgload, options3);

allimgwithlazyload.forEach(img => imglazy.observe(img));

//implimenting slider
const sliders = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
//record of current slide
let currentSlide = 0;

//slide positioningon start
sliders.forEach((slide, i) => {
  slide.style.transform = `translateX(${100 * i}%)`;
});

const nextSlide = function () {
  if (sliders.length - 1 <= currentSlide) {
    currentSlide = 0;
  }
  //btn clicked so we have to update slide
  else {
    currentSlide++;
  }

  //making the next element that we have to display translateX to 0 and previous one -100
  sliders.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  });
};

const previousSlide = function () {
  if (!currentSlide) {
    currentSlide = sliders.length - 1;
  } else {
    currentSlide--;
  }
  //making the next element that we have to display translateX to 0 and previous one -100
  sliders.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  });
};

//event listner on start
btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', previousSlide);

//active slide have to be 0 % and next slide 100% and previous has to be -100%

//on arroe keys
document.addEventListener('keydown', e => {
  if (e.key == 'ArrowLeft') previousSlide();
  if (e.key == 'ArrowRight') nextSlide();
});

