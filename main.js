// Joseph's Key : fa5cd8e939c304ba5377d606a6972ee9
// Lara's Key : 96c1916f7c7082ce15319bb2265ead09
// Benjamin's Key : ceefccfbaf440cbb8475bec175f6c159
// Tom's Key : 6205dc4d00a179abf0524302289c5b80

//https://www.food2fork.com/api/search?key=96c1916f7c7082ce15319bb2265ead09&q=chicken%20breast&page=10

//Globals
let url = "https://www.food2fork.com/api/search";
const key = "6205dc4d00a179abf0524302289c5b80";
const keyedUrl = `${url}?key=${key}`;
let keyUrlSearch = "";
let pageCounter = 1;
let figureCounter = 0;
let moreBtn;
let objectLength = 0;
let objectLengthSave = 0;
let oneTime = true;

//Get DOM elements
const input = document.querySelector('input[type="text"]');
const search = document.querySelector("button");
const figure = document.querySelector("figure");
const section = document.querySelector("section");
const zutaten = document.querySelector(".zutaten");
const form = document.querySelector(".form");
input.focus();

const fetchData = key => {
  fetch(key)
    .then(checkStatus)
    .then(parseJSON)
    .then(res =>
      res.recipes.map(recipe => placeData(recipe, res.recipes.length))
    )
    .catch(error => console.log(error));
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

const placeData = (recipe, recipes) => {
  if (oneTime) {
    objectLengthSave = recipes;
    oneTime = false;
  }
  objectLength = recipes;
  figureCounter++;
  let figure = document.createElement("figure");
  let imagePlaceholder = document.createElement("img");
  let figcaption = document.createElement("figcaption");
  imagePlaceholder.src = recipe.image_url;
  if (recipe.title.length > 50) {
    let newTitle = recipe.title.substring(0, 30);
    figcaption.innerHTML = newTitle;
  } else {
    figcaption.innerHTML = recipe.title;
  }

  figure.appendChild(imagePlaceholder);
  figure.appendChild(figcaption);
  section.appendChild(figure);

  if (figureCounter === objectLengthSave) {
    objectLengthSave += objectLength;
    moreBtn = document.createElement("div");
    moreBtn.innerHTML = "more";
    moreBtn.classList.add("more");

    form.appendChild(moreBtn);

    moreBtn.addEventListener("click", () => {
      pageCounter++;
      let keyUrlMore = `${keyUrlSearch}&page=${pageCounter}`;
      deleteMore();
      input.focus();
      fetchData(keyUrlMore);
    });
  }
};

search.addEventListener("click", e => {
  e.preventDefault();

  // pageCounter = 1;
  keyUrlSearch = `${keyedUrl}&q=${input.value}`;
  input.value = "";
  input.focus();
  // console.log(keyUrlSearch);
  deleteMore();
  deleteList();
  fetchData(keyUrlSearch);
});

const deleteList = () => {
  const [...figureList] = document.querySelectorAll("section figure");

  if (figureList.length > 1) {
    figureList.map(figure => section.removeChild(figure));
  }
};

const deleteMore = () => {
  const deleteMore = document.querySelector(".more");
  console.dir(deleteMore);
  if (deleteMore != null) {
    form.removeChild(deleteMore);
  }
};
