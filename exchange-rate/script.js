const currencyElementOne = document.getElementById('currency-one');
const currencyElementTwo = document.getElementById('currency-two');
const amountElementOne = document.getElementById('amount-one');
const amountElementTwo = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// fetch exchange rates & updated the DOM
const calculate = async () => {
  try {
    const currencyOne = currencyElementOne.value;
    const currencyTwo = currencyElementTwo.value;

    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/b26a8221b47d1c0ae060fc2b/latest/${currencyOne}`
    );
    const data = await response.json();
    console.log(data);

    const rate = data.conversion_rates[currencyTwo];
    rateElement.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

    amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
  } catch (err) {
    console.error(err);
  }
};

// Event listeners
currencyElementOne.addEventListener('change', calculate);
amountElementOne.addEventListener('input', calculate);

currencyElementTwo.addEventListener('change', calculate);
amountElementTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  // swapping values
  const temp = currencyElementOne.value;
  currencyElementOne.value = currencyElementTwo.value;
  currencyElementTwo.value = temp;
  calculate();
});

// fetch api
calculate();
