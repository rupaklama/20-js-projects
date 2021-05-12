'use strict';

const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 },
// ];

// items in local storage
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

// if we have items in local storage, use that else it will be an empty array
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Event handlers

// submit to add transaction
function addTransaction(e) {
  e.preventDefault();

  // if input values are empty
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Pease add an entry and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: Number(amount.value),
    };

    transactions.push(transaction);

    // pass it in DOM
    addTransactionDOM(transaction);

    // update totals
    updateValues();

    // update local storage
    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

// generate random id
function generateID() {
  return Math.floor(Math.random() * 1000000000);
}

// add transactions to DOM list
function addTransactionDOM(transaction) {
  // get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  // creating list item
  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class='delete-btn' onclick='removeTransaction(${transaction.id})'>x</button>
  `;

  // adding item to the ul element
  list.appendChild(item);
}

// update the balance, income & expenses
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  console.log(amounts);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// delete transaction by id
function removeTransaction(id) {
  transactions = transactions.filter(item => item.id !== id);

  // update local storage
  updateLocalStorage();

  // update an app
  init();
}

// update local storage transactions
function updateLocalStorage() {
  // passing our array
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// init() function for initialization stuff
function init() {
  // clear items in list
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);

  updateValues();
}
init();

// Event listeners
form.addEventListener('submit', addTransaction);
