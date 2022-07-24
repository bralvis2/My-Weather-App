// Varibales from HTML to save weather searches 
var searchInput = document.querySelector('.ba-input');
var searchForm = document.querySelector('.search-form');
var savedSearches = document.querySelector('.saved-searches');
var searchValue = document.querySelector('#search');

// Empty array to save searches in
var searches = [];

// function to render items as buttons
function renderSearches() {

    for (var i = 0; i < searches.length; i++) {
        var search = searches[i];

        var btn = document.createElement('button');
        btn.textContent = search;
        btn.setAttribute('class', 'ba-saved-search', i);

        savedSearches.appendChild(btn);
    }
}

// The function will run when the page loads
function init() {
    // Get stored searches from local storage
    var storedSearches = JSON.parse(localStorage.getItem("searches"));

    if (storedSearches !== null) {
        searches = storedSearches;
    }

    renderSearches();
}

// stringify and set key in local storage to searches array
function storeSearches() {
    localStorage.setItem("searches", JSON.stringify(searches));
}

// add submit event to form
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var searchText = searchInput.value.trim();

    // console log if no text was entered 
    if (searchText === "") {
        console.log('No city name was enetred.');
        return;
    }

    searches.push(searchText);
    searchInput.value = "";

    // store updated seaches in local storage, re-render the buttons
    storeSearches();
    cityCoords(searchText);
    // renderSearches();
});

// calls init function to retrieve data dn render it to the page on load.
init();

// Weather API Calls
var apiKey = '7344374ea3fe4498fa47c9c1163936a6';
function cityCoords(city) {
    console.log(city);
    var weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}+&appid=${apiKey}&units=imperial`;
    fetch(weatherAPIUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            // console.log(data.coord)
            currentForecast(data.coord.lat, data.coord.lon);
        })
}

function currentForecast(lat, lon) {
    console.log(lat,lon)
    var currentForeAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial&exclude=minutely,hourly`;
    fetch(currentForeAPI)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            renderForecast(data);
        })
}

function renderForecast (data){
    var temp = document.querySelector('.temp');
    console.log(data)
    temp.innerHTML = `temp: ${data.current.temp}`
}


