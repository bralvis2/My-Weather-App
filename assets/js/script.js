// Varibales from HTML to save weather searches 
var searchInput = document.querySelector('.ba-input');
var searchForm = document.querySelector('.search-form');
var savedSearches = document.querySelector('.saved-searches');

// Empty array to save searches in
var searches = [];

// function to render items as buttons
function renderSearches(){

for (var i = 0; i < searches.length; i++) {
    var search = searches[i];

    var btn = document.createElement('button');
    btn.textContent = search;
    btn.setAttribute('class','ba-saved-search', i);

    savedSearches.appendChild(btn);
}
}

// The function will run when the page loads
function init() {
    // Get stored searches from local storage
    var storedSearches = JSON.parse(localStorage.getItem("searches"));
    
    if (storedSearches !== null){
        searches = storedSearches;
    }
     
renderSearches();
}

// stringify and set key in local storage to searches array
function storeSearches(){
    localStorage.setItem("searches", JSON.stringify(searches));
}

// add submit event to form
searchForm.addEventListener('submit', function(event) {

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
    renderSearches();
} );

// calls init function to retrieve data dn render it to the page on load.
init();