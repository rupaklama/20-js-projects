'use strict';

const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMealEl = document.getElementById('single-meal');

// Callback handlers

// search meal & fetch from API
function searchMeal(e) {
  e.preventDefault();

  // clear single meal
  singleMealEl.innerHTML = '';

  // get search term
  const term = search.value;
  console.log(term);

  // check for empty
  // if we have a term - trim white spaces
  if (term.trim()) {
    try {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

          // when search not found, returns null
          if (data.meals === null) {
            resultHeading.innerHTML = `<p>There are no related search results. Try again!</p>`;
          } else {
            mealsEl.innerHTML = data['meals']
              .map(
                meal => `
              <div class='meal'>
                <img src=${meal.strMealThumb} alt=${meal.strMeal} />
                <div class="meal-info" data-mealID='${meal.idMeal}'>
                  <h3>${meal.strMeal}</h3>
                </div>
              </div>
            `
              ) // Since MAP returns an Array, need to display as a string
              .join('');
          }
        });

      // clear search text
      search.value = '';
    } catch (err) {
      console.error(err);
    }
  } else {
    // alert('Please enter a search value');
    resultHeading.innerHTML = `<p>Please enter a search value</p>`;
  }
}

// add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    // if we have ingredient
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }

  singleMealEl.innerHTML = `
    <div class='single-meal'>
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>

      <div class="main">
        <p>${meal.strInstructions}</p>

        <h2>Ingredients</h2>

        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div> 
  `;
}

// fetch meal by ID
function getMealById(mealID) {
  try {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
      .then(res => res.json())
      .then(data => {
        const meal = data.meals[0];

        addMealToDOM(meal);
      });
  } catch (err) {
    console.error(err);
  }
}

// fetch random meal
function getRandomMeal() {
  // clear meals & headings if exists
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  try {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(res => res.json())
      .then(data => {
        const meal = data.meals[0];

        addMealToDOM(meal);
      });
  } catch (err) {
    console.error(err);
  }
}

// Event listeners
submit.addEventListener('submit', searchMeal);

random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
  console.log(e.path);
  // e.path - returns an array of objects containing the elements in the event flow, in the correct execution order
  const mealInfo = e.path.find(item => {
    // check to see if there's a class
    if (item.classList) {
      // return div with class 'meal-info'
      return item.classList.contains('meal-info');
    } else {
      // nothing is going to happen
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    // passing it into a function
    getMealById(mealID);
  }
});
