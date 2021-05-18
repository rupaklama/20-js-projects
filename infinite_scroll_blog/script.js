const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

// posts limit to display
let limit = 5;
let page = 1;

// fetch posts from api
async function getPosts() {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

// display posts in dom
async function showPosts() {
  const posts = await getPosts();
  console.log(posts);

  posts.forEach(post => {
    // create div element
    const postEl = document.createElement('div');

    // add class & html markups in it
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
  `;

    // inserting inside of parent element - div
    postsContainer.appendChild(postEl);
  });
}

showPosts();

// filter posts by input
function filterPosts(e) {
  // search term to lowercase since string is case-sensitive
  const term = e.target.value.toLowerCase();

  // get all the loaded posts
  const posts = document.querySelectorAll('.post');

  // loop through all the posts
  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toLowerCase();
    const body = post.querySelector('.post-body').innerText.toLowerCase();

    // -1 is not found, if greater than -1 search term is found
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex'; // flex to display
    } else {
      post.style.display = 'none'; // none to remove
    }

    // clear input
    // filter.value = '';
  });
}

// show loader & fetch more posts
function showLoading() {
  loading.classList.add('show');

  // remove loader after some time
  setTimeout(() => {
    loading.classList.remove('show');

    // load more posts
    setTimeout(() => {
      // update pages count
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

// window object's 'scroll' method
window.addEventListener('scroll', () => {
  // document object's props
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // top position + element's height > total scroll height - 5px
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    // show loader
    showLoading();
  }
});

// to filter posts
filter.addEventListener('input', filterPosts);
