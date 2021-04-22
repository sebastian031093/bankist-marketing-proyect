'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//Old schol
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////////////
//scrolling buttons move div

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (event) {
  const s1coods = section1.getBoundingClientRect();
  console.log(s1coods);

  console.log(event.target.getBoundingClientRect()); //las medidas son relativas al veuport visible.

  //Estas son las cordenadas desde la parte superior hasta el punto donde se hace scroll en el viewport
  console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //Scrolling

  //Old schol: Se teia que tener nocion de las distancias entre los objetos, para ajustar las cordenadas de determiando elemento para ir a ese punto.

  // window.scroll(
  //   s1coods.left + window.pageXOffset,
  //   s1coods.top + window.pageYOffset
  // )

  // window.scrollTo({
  //   left: s1coods.left + window.pageXOffset,
  //   top: s1coods.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  //New blood

  section1.scrollIntoView({ behavior: 'smooth'});
})



//////////////////////////////////////////////////////////////
///////Page navogation.

//Esta es una solucion pero no es la mejor
// document.querySelectorAll('.nav__link').forEach(function (elements) {
//   elements.addEventListener('click', function(event) {
//     event.preventDefault();
//     // console.log('Link');
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior:'smooth'});
//   });
// });

//Event delegation power bubbling.

//1. add event listener to common parent element
//2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click',function (event) {
  event.preventDefault();
  
  //Matching strategy : ignora los demas clicks y solo esta prestando atencion al click sobre la condicion.
  if (event.target.classList.contains('nav__link')) {
    console.log('LINK');
    const id = event.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior:'smooth'})};
})




/////////////////////////////////////////////
////////////////////////////////////////////
//Learning SELECTING, CREATING AND DELETING ELEMENTS.
/*
//Selecting elments
console.log(document.documentElement); //Todo el html
console.log(document.head);
console.log(document.body);


const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section')
// console.log(allSection); //NodeList(4) array: no uedes eliminar elmentos.

document.getElementById('section--1');
const allButtons = document.getElementsByTagName( 'button' );
// console.log(allButtons); // TMLCollection array: puedes eliminar elementos desde el DOM 

console.log(document.getElementsByClassName('btn'));

//Creating and indertting elements

//.insertAdjancentHTML : la que mas le gusta a jonas.

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics.';

message.innerHTML = 'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Go it! </button> ';

header.prepend(message);
// header.append(message);
//crear una copia del mismo elemento y insetarlo
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

//Delate elements

document.querySelector('.btn--close-cookie').addEventListener('click',function () {
  message.remove();
})


//Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color); //No tenemos respuesta por que esta propiedad no ha sido definida.
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//manipular varibales css
document.documentElement.style.setProperty('--color-primary', 'tomato');

//Attributes (class, id, src, href, etc)
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
//Non-standar
console.log(logo.designer) // No se mostrata pues no es uno de los atributos que se esperaria estar en la etiqueta img.

logo.alt = 'Beautiful minimalist logo';

//se peude agregar
console.log(logo.getAttribute('desinger')); //Obtiene el valor del atributo buscado
logo.setAttribute('company', 'Bankist');

console.log(logo.src); //ruta absoluta
console.log(logo.getAttribute('src'));//Ruta relativa

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//Data attributes
console.log(logo.dataset.versionNumber);

*/

//////////////////////////////////////////////////////////
//////Types of Events and Event Handlers.
/*
const h1 = document.querySelector('h1');

h1.addEventListener('mouseenter', function (event) {
  alert('addEventListener: Gread! you are reading the heading :D');
})

//Old school for handler events
h1.onmouseenter = function (event) {
  alert('addEventListener: Gread! you are reading the heading :D');
}
*/

/////////////////////////////////////////////////////////////
//////Event Propagation in Practice
/*
//Color aleatorio
//rgb(0-255, 0-255, 0-255)
const randomInt = (min, max) => Math.floor( Math.random() * (max - min + 1) + min );


const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// console.log(randomColor(0, 255));
document.querySelector('.nav__link').addEventListener('click', function (event) {
  console.log('LINK', event.target, event.currentTarget); //Donde ocurre el click.
  console.log(event.currentTarget === this);
  this.style.backgroundColor = randomColor();

  //Stop propagation
  // event.stopPropagation();
})

document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    console.log('CONTAINER', event.target, event.currentTarget);
    console.log(event.currentTarget === this);
    this.style.backgroundColor = randomColor();
  });

  document
    .querySelector('.nav')
    .addEventListener('click', function (event) {
      console.log('NAV', event.target, event.currentTarget);
      console.log(event.currentTarget === this);
      this.style.backgroundColor = randomColor();
    });
*/

//////////////////////////////////////////////////////////
///////DOM Traversing

const h1 = document.querySelector('h1');

//Going downward: child
//no importa que tan profundo este el lo encontrara
console.log(h1.querySelectorAll('.highlight'));
























































