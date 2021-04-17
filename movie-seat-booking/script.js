// Container for Movie Screen & Rows of Seats
const container = document.querySelector('.container');

// Seats in the Class-'row', ones which are not Occupied
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

// Seat counts
const count = document.getElementById('count');

// price total
const total = document.getElementById('total');

// to select movie
const movieSelect = document.getElementById('movie');
let ticketPrice = Number(movieSelect.value);
// console.log(typeof ticketPrice);

// HELPER FUNCTIONS

// to update seats count
const updateSeatsCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  // console.log(selectedSeats);
  const selectedSeatsCount = selectedSeats.length; // seat counts

  // seat counts
  count.innerText = selectedSeatsCount;

  // update price total
  total.innerText = selectedSeatsCount * ticketPrice;
};

// An EVENT LISTENERS

// movie select event
movieSelect.addEventListener('change', e => {
  // on input change value, update price
  ticketPrice = Number(e.target.value);

  // update the price count
  updateSeatsCount();
});

// to select a open seat
container.addEventListener('click', e => {
  // console.log(e.target); html element
  // classList - to check the class, contains - a method to look in the class list
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    // console.log(e.target);
    // toggle to add or remove classList
    e.target.classList.toggle('selected');

    updateSeatsCount();
  }
});
