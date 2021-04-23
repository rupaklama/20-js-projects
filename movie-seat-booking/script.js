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

// to update ui
populateUI();

// HELPER FUNCTIONS

// save movie index & price in local storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// to update seats count
const updateSeatsCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  // console.log(selectedSeats);

  // copy selected seats into array & return Selected Seat's indexes
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  console.log(seatsIndex);

  // save seats indexes in local storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length; // seat counts

  // seat counts
  count.innerText = selectedSeatsCount;

  // update price total
  total.innerText = selectedSeatsCount * ticketPrice;
};

// An EVENT LISTENERS

// Get data from localStorage and populate ui
function populateUI() {
  // get the selected seats from the local storage
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  // console.log(selectedSeats);

  // seats
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      // -1 index is if an item is not in the array
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  // movies in local storage
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// movie select event
movieSelect.addEventListener('change', e => {
  // on input change value, update price
  ticketPrice = Number(e.target.value);

  // to save movie & price in local storage
  setMovieData(e.target.selectedIndex, e.target.value);

  // update the price count
  updateSeatsCount();
});

// to select a open seat
container.addEventListener('click', e => {
  // console.log(e.target); html element
  // classList - to check the class, contains - a method to look in the class of 'seat'
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    // console.log(e.target);
    // toggle to add or remove classList
    e.target.classList.toggle('selected');

    updateSeatsCount();
  }
});

// initial count and total set
updateSeatsCount();
