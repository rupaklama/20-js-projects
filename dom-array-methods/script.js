'use strict';

const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// people data
let peopleData = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  try {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
  } catch (err) {
    console.error(err);
  }
}

// Double money
function doubleMoney() {
  peopleData = peopleData.map(user => {
    // console.log(user);
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// sort users by richest
function sortByRichest() {
  // descending order
  peopleData.sort((a, b) => b.money - a.money);

  updateDOM();
}

// filter millionaires
function showMillionaires() {
  peopleData = peopleData.filter(user => user.money >= 1000000);

  updateDOM();
}

// calculate total wealth
function calculateWealth() {
  const totalWealth = peopleData.reduce((acc, user) => (acc = acc + user.money), 0);
  // console.log(formatMoney(totalWealth));

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(totalWealth)}</strong> </h3>`;
  main.appendChild(wealthEl);
}

// Add new obj to data arr
function addData(obj) {
  peopleData.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = peopleData) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });

  console.log(peopleData);
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
