// Joseph's Key : fa5cd8e939c304ba5377d606a6972ee9
// Joseph's key2 : ca01bbdccb3388aa0ae14f1c5c2d86eb
// Lara's Key : 96c1916f7c7082ce15319bb2265ead09
// Benjamin's Key : ceefccfbaf440cbb8475bec175f6c159
// Tom's Key : 6205dc4d00a179abf0524302289c5b80

window.onload = () => fetchData(keyedUrl);

//Globals
let url = 'https://www.food2fork.com/api/search';
const key = 'fa5cd8e939c304ba5377d606a6972ee9';
const keyedUrl = `${url}?key=${key}`;
let keyUrlSearch = '';
let pageCounter = 1;
let searchEnabled = false;

//Get DOM elements
const input = document.querySelector('input[type="text"]');
const search = document.querySelector('button');
const figure = document.querySelector('figure');
const section = document.querySelector('section');
const form = document.querySelector('form');
const footer = document.querySelector('footer');

input.focus();

const fetchData = key => {
  fetch(key)
    .then(checkStatus)
    .then(parseJSON)
    .then(res => res.recipes.map(recipe => placeData(recipe)))
    .catch(error => errorHandler(error));
};

const checkStatus = response => {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
};

const parseJSON = response => {
  return response.json();
};

const placeData = recipe => {
  let figure = document.createElement('figure');
  let href = document.createElement('a');
  let imagePlaceholder = document.createElement('img');
  let figcaption = document.createElement('figcaption');
  href.href = `${recipe.f2f_url}`;
  href.setAttribute('target', 'blank');
  imagePlaceholder.src = recipe.image_url;
  if (recipe.title.length > 50) {
    let newTitle = recipe.title.substring(0, 30);
    figcaption.innerHTML = newTitle;
  } else {
    figcaption.innerHTML = recipe.title;
  }
  href.appendChild(imagePlaceholder);
  figure.appendChild(href);
  figure.appendChild(figcaption);
  section.appendChild(figure);
};

const deleteList = () => {
  const [...figureList] = document.querySelectorAll('section figure');

  if (figureList.length > 1) {
    figureList.map(figure => section.removeChild(figure));
  }
};

const infinite = () => {
  if (searchEnabled) {
    pageCounter++;
    let keyUrlMore = `${keyUrlSearch}&page=${pageCounter}`;
    input.focus();
    fetchData(keyUrlMore);
  }
};

const errorHandler = error => {
  const errContainer = document.createElement('div');
  errContainer.classList.add = 'errorClass';
  const errorText = document.createElement('h1');
  errorText.innerHTML = `There seems to be a problem <br> ${error}`;
  errContainer.appendChild(errorText);
  section.style = 'display:flex; justify-content: center; align-items: center;';
  section.appendChild(errContainer);
};

//Listeners
search.addEventListener('click', e => {
  e.preventDefault();
  searchEnabled = true;
  keyUrlSearch = `${keyedUrl}&q=${input.value}`;
  input.value = '';
  input.focus();
  pageCounter = 1;
  deleteList();
  fetchData(keyUrlSearch);
});

//Very neat code to handle infinite scrolling
document.addEventListener('DOMContentLoaded', () => {
  let options = {
    root: null,
    rootMargins: '0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver(infinite, options);
  observer.observe(footer);
});
