window.onload = () => fetchData(keyedUrl);

//https://www.food2fork.com/api/search?key=fa5cd8e939c304ba5377d606a6972ee9&q=chicken%20breast&page=10

//Globals
let url = 'https://www.food2fork.com/api/search';
const key = 'fa5cd8e939c304ba5377d606a6972ee9';
const keyedUrl = `${url}?key=${key}`;

//Get DOM elements
const input = document.querySelector('input[type="text"]');
const search = document.querySelector('button');
const image = document.querySelector('img');
const title = document.querySelector('figcaption');
const more = document.querySelector('.button');

const fetchData = key => {
  fetch(key)
    .then(checkStatus)
    .then(parseJSON)
    //.then(res => res.recipes.map(pub => console.log(pub)))
    .then(res => res.recipes.map(recipe => placeData(recipe)))
    .catch(error => console.log(error));
};

const checkStatus = response => {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
};

const parseJSON = response => response.json;

const placeData = recipe => {
  title.innerHTML = recipe.title;
};
