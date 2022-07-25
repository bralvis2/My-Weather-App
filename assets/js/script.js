// Varibales from HTML to save weather searches 
var searchInput = document.querySelector('.ba-input');
var searchForm = document.querySelector('.search-form');
var savedSearches = document.querySelector('.saved-searches');
var searchValue = document.querySelector('#search');
var title = document.querySelector('.ba-search-title')
var todaysWeather = document.querySelector('.ba-todays-forecast');
var fiveDayForecast = document.querySelector('.hide');

// Current Date and Five Day Forecast using Moment
var currentDate = moment().format('dddd, MMMM Do, h:mm a');
var day0 = moment().add(1, 'days').format('L'); 
var day1 = moment().add(2, 'days').format('L'); 
var day2 = moment().add(3, 'days').format('L'); 
var day3 = moment().add(4, 'days').format('L'); 
var day4 = moment().add(5, 'days').format('L'); 

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

//Function to search for weather from saved searches
// function savedSearchBtn (){
//     var savedBtn = document.querySelector('.ba-saved-search');
//     savedBtn.addEventListener = ('click', cityCoords(searchText));
// }

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
    renderSearches();
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
    todaysWeather.style.display = 'block';
    fiveDayForecast.style.display = 'block';

    title.innerHTML = `Weather in ${city} on ${currentDate}`;
}

function currentForecast(lat, lon) {
    console.log(lat, lon)
    var currentForeAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial&exclude=minutely,hourly`;
    fetch(currentForeAPI)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            renderForecast(data);
            renderFiveDayForecast(data);
            weatherEmoji(data)
        })

}

function renderForecast(data) {
    var temp = document.querySelector('.temp');
    var wind = document.querySelector('.wind');
    var humidity = document.querySelector('.humidity');
    var uvIndex = document.querySelector('.uvi');
    temp.innerHTML = `Temp: ${data.current.temp}`;
    wind.innerHTML = `Wind: ${data.current.wind_speed}`;
    humidity.innerHTML = `Humidity: ${data.current.humidity}`;
    uvIndex.innerHTML = `UV Index: ${data.current.uvi}`
}


function renderFiveDayForecast(data) {
    // Day index position 0
    var date0 = document.querySelector('#date0');
    var emoji0 = document.querySelector('#emoji0');
    var temp0 = document.querySelector('#temp0');
    var wind0 = document.querySelector('#wind0');
    var humidity0 = document.querySelector('#humidity0');
    date0.innerHTML = day0;
    temp0.innerHTML = `Temp: ${data.daily[0].temp.day}`;
    wind0.innerHTML = `Wind: ${data.daily[0].wind_speed}`;
    humidity0.innerHTML = `Humidity: ${data.daily[0].humidity}`;

    // Day index posiiton 1
    var date1 = document.querySelector('#date1');
    var temp1 = document.querySelector('#temp1');
    var wind1 = document.querySelector('#wind1');
    var humidity1 = document.querySelector('#humidity1');
    date1.innerHTML = day1;
    temp1.innerHTML = `Temp: ${data.daily[1].temp.day}`;
    wind1.innerHTML = `Wind: ${data.daily[1].wind_speed}`;
    humidity1.innerHTML = `Humidity: ${data.daily[1].humidity}`;

    // Day index posiiton 2
    var date2 = document.querySelector('#date2');
    var temp2 = document.querySelector('#temp2');
    var wind2 = document.querySelector('#wind2');
    var humidity2 = document.querySelector('#humidity2');
    date2.innerHTML = day2;
    temp2.innerHTML = `Temp: ${data.daily[2].temp.day}`;
    wind2.innerHTML = `Wind: ${data.daily[2].wind_speed}`;
    humidity2.innerHTML = `Humidity: ${data.daily[2].humidity}`;

    // Day index posiiton 3
    var date3 = document.querySelector('#date3');
    var temp3 = document.querySelector('#temp3');
    var wind3 = document.querySelector('#wind3');
    var humidity3 = document.querySelector('#humidity3');
    date3.innerHTML = day3;
    temp3.innerHTML = `Temp: ${data.daily[3].temp.day}`;
    wind3.innerHTML = `Wind: ${data.daily[3].wind_speed}`;
    humidity3.innerHTML = `Humidity: ${data.daily[3].humidity}`;

    // Day index posiiton 4
    var date4 = document.querySelector('#date4');
    var temp4 = document.querySelector('#temp4');
    var wind4 = document.querySelector('#wind4');
    var humidity4 = document.querySelector('#humidity4');
    date4.innerHTML = day4;
    temp4.innerHTML = `Temp: ${data.daily[4].temp.day}`;
    wind4.innerHTML = `Wind: ${data.daily[4].wind_speed}`;
    humidity4.innerHTML = `Humidity: ${data.daily[4].humidity}`;
}


// weather emojis
var sun = '\u2600\uFE0F';
var cloud = '☁️';

// function to add emoji
function weatherEmoji(data){
    var emoji0 = document.querySelector('#emoji0');
    if (data.daily[0].clouds < 20 ){
        emoji0.innerHTML = sun;
    } else (emoji0.innerHTML = cloud)

    var emoji1 = document.querySelector('#emoji1');
    if (data.daily[1].clouds < 20 ){
        emoji1.innerHTML = sun;
    } else (emoji1.innerHTML = cloud)

    var emoji2 = document.querySelector('#emoji2');
    if (data.daily[2].clouds < 20 ){
        emoji2.innerHTML = sun;
    } else (emoji2.innerHTML = cloud)

    var emoji3 = document.querySelector('#emoji3');
    if (data.daily[3].clouds < 20 ){
        emoji3.innerHTML = sun;
    } else (emoji3.innerHTML = cloud)

    var emoji4 = document.querySelector('#emoji4');
    if (data.daily[4].clouds < 20 ){
        emoji4.innerHTML = sun;
    } else (emoji4.innerHTML = cloud)

}
 



