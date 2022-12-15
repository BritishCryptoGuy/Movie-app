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
    let imdb = matchObj.imdbID;
    fetch(`https://www.omdbapi.com/?apikey=257d3522&i=${imdb}`)
      .then((data) => data.json())
      .then(function (data) {
        let plot = data.Plot;
        cardWrapper.insertAdjacentHTML(
          "beforeend",
          `<div class='movie-card' style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${matchObj.Poster});"><h3>${matchObj.Title}</h3><p>${plot}</p> <a href='https://imdb.com/title/${matchObj.imdbID}' target="_blank">View More Info Here</a></div>`
        );
      });
  }
}

function fetchMovies(event) {
  var keyCode = event.keyCode;
  var searchText = searchInput.value.toLowerCase().trim();

  if (keyCode === 13 && searchText) {
    let responsePromise = fetch(
      `https://www.omdbapi.com/?apikey=257d3522&s=${searchText}`
    );

    function handleResponse(responseObj) {
      return responseObj.json();
    }

    responsePromise.then(handleResponse).then(function (data) {
      let dataArray = data.Search;
      displayMatches(dataArray);
      searchInput.value = "";
    });

    console.log("test");
    // responsePromise.then(function (responseObj) {
    //   let dataPromise = responseObj.json();
    //   console.log(dataPromise);
    //   dataPromise.then(function (data) {
    //     console.log(data);
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
