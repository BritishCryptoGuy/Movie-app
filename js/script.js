var searchInput = $(".search");
var cardWrapper = $("main");

function noMatch() {
  cardWrapper.html("<p class='no-search'>No results found. </p>");
}

function displayMatches(matches) {
  cardWrapper.html("");
  if (!matches) {
    noMatch();
  }
  for (let matchObj of matches) {
    let imdb = matchObj.imdbID;
    $.get(`https://www.omdbapi.com/?apikey=257d3522&i=${imdb}`).then(function (
      data
    ) {
      let plot = data.Plot;
      cardWrapper.append(
        `<div class='movie-card' style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${matchObj.Poster});"><h3>${matchObj.Title}</h3><p>${plot}</p> <a href='https://imdb.com/title/${matchObj.imdbID}' target="_blank">View More Info Here</a></div>`
      );
    });
  }
}

function fetchMovies(event) {
  var keyCode = event.keyCode;
  var searchText = searchInput.val().trim();

  if (keyCode === 13 && searchText) {
    console.log(searchText);
    $.get(`https://www.omdbapi.com/?apikey=257d3522&s=${searchText}`).then(
      function (data) {
        displayMatches(data.Search);
        searchInput.val("");
      }
    );
  }
}

function init() {
  searchInput.keydown(fetchMovies);
}

init();

{
  /* <div class='movie-card'>
  <h3>Movie Title</h3>
  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
  <a href='#'>View More Info Here</a>
</div>  */
}
