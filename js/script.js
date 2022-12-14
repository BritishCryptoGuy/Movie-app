var searchInput = document.querySelector(".search");
var cardWrapper = document.querySelector("main");

function noMatch() {
  cardWrapper.innerHTML = "<p class='no-search'>No results found. </p>";
}
function displayMatches(matches) {
  cardWrapper.innerHTML = "";

  if (!matches.length) {
    noMatch();
  }
  for (let matchObj of matches) {
    console.log(matchObj);
    cardWrapper.insertAdjacentHTML(
      "beforeend",
      `<div class='movie-card' style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${matchObj.movie_image});"><h3>${matchObj.title}</h3><p>${matchObj.description}</p> <a href='${matchObj.imdb_link}' target="_blank">View More Info Here</a></div>`
    );
  }
}

function fetchMovies(event) {
  var keyCode = event.keyCode;
  var searchText = searchInput.value.toLowerCase().trim();
  let matches = [];
  if (keyCode === 13 && searchText) {
    for (let movieObj of movieData) {
      if (movieObj.title.toLowerCase().includes(searchText)) {
        console.log(movieObj.title);
        matches.push(movieObj);
      }
    }
    console.log(matches);
    searchInput.value = "";
    displayMatches(matches);

    fetch("https://www.omdbapi.com/?apikey=257d3522&t=jurassic%20park").then(
      function (responseObj) {
        let dataPromise = responseObj.json();
        dataPromise.then(function (data) {
          console.log(data);
          console.log(data.Actors);
        });
      }
    );
  }
}

function init() {
  searchInput.addEventListener("keydown", fetchMovies);
}

init();

{
  /* <div class='movie-card'>
  <h3>Movie Title</h3>
  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
  <a href='#'>View More Info Here</a>
</div>  */
}
