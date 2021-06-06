const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// Search by song or artist
async function searchSongs(term) {
  try {
    const response = await fetch(`${apiURL}/suggest/${term}`);
    const data = await response.json();

    // to display data
    showData(data);
  } catch (err) {
    console.error(err.message);
  }
}

// Display data
function showData(data) {
  // let output = '';

  // data.data.forEach(song => {
  //   output += `
  //     <li>
  //       <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  //       <button class="btn" data-artist='${song.artist.name}' data-song-title='${song.title}'>Get Lyrics</button>
  //     </li>
  //   `;
  // });

  // // to display
  // result.innerHTML = `
  //   <ul class='songs'>
  //     ${output}
  //   </ul>
  // `;

  // same thing as above with map
  result.innerHTML = `
  <ul class='songs'>
      ${data.data
        .map(
          song => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist='${song.artist.name}' data-song-title='${song.title}'>Get Lyrics</button>
    </li>`
        )
        .join(' ')}
    </ul>
  `;

  // display pagination
  if (data.prev || data.next) {
    more.innerHTML = `
      ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
      ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
    `;
  } else {
    more.innerHTML = '';
  }
}

// display pagination results
async function getMoreSongs(url) {
  try {
    // to solve cors error issue
    // All we have to do is prefix the URL with the API URL for CORS Anywhere,
    // and the proxy will handle the request on your behalf with appropriate CORS
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await response.json();
    console.log(data);

    // to display data
    showData(data);
  } catch (err) {
    console.error(err.message);
  }
}

// func to get lyrics
async function getLyrics(artist, songTitle) {
  try {
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await response.json();
    console.log(data);

    // if new lines in lyrics, replace with html line break
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    // const lyrics = data.lyrics;

    // display lyrics
    result.innerHTML = `
      <h2><strong>${artist}</strong> - ${songTitle}</h2>
      <span>${lyrics}</span>
    `;

    // clear 'more' div
    more.innerHTML = '';
  } catch (err) {
    console.error(err.message);
  }
}

// Event listeners
form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert('Please type in a search term');
  } else {
    // search song
    searchSongs(searchTerm);
  }
});

// Get lyrics button click
result.addEventListener('click', e => {
  const clickedEl = e.target;

  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-song-title');

    // func to get lyrics
    getLyrics(artist, songTitle);
  }
});
