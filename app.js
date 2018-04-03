'use strict'

$(document).ready(function(){

    var options = {hover: true};
    var elem = document.querySelector('.dropdown-trigger');
    var instance = M.Dropdown.init(elem, options);  

  // Global Variables
  const apiKey = "IB4MtYCaYXdQIdqm4K7847xEzhASkSEll2GFdl2tKVcElY8dSP3w-LCa03qSscEkwKVncUnsR5AizTA7EdD7FHmM1Qsr781Rsc3EqeKCIDw7jd8PFMRNaK1OwXS6WnYx"
  let fetchUrl;
  let userLatitude;
  let userLongitude;

  // General Use Function
  function milesToMeters (miles){
    meterConversion = miles * 1609.34;
    return meterConversion;
  };

  // Parallax Function
  $('.parallax').parallax();

//use radius location to search

$("#li1, #li2, #li3, #li4").on('click', function(){
  let userRadius = $(this).data("value");

  console.log(userRadius);

});




  // On Click function for Specified Location
  $("#searchButton").on("click", function(e) {
    event.preventDefault();

    //catches information from search field. 
    let searchTitle = $("#searchField").val();
    let codedSearchTitle = encodeURIComponent(searchTitle);
    

    //attaches User search result to the https address required by googlemaps api
    let userPreLimSearch = "https://maps.googleapis.com/maps/api/geocode/json?address="+ codedSearchTitle +"&key=AIzaSyBSnJtTqZp2Nzg7w1o1rF19y2Eic3IuhCQ"
    let googleGeocoding;

  
    $.ajax({
      url: userPreLimSearch,
      method: "Get",
    })
    .then(function(response){
      //gains access to the geocoded latitude and longitude from googlemaps object
      userLatitude = response.results[0].geometry.location.lat;
      userLongitude = response.results[0].geometry.location.lng;

      // Start of Geolocation fucntioN
      let fetchUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=breweries&latitude=${userLatitude}&longitude=${userLongitude}&limit=10`

      let myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + apiKey);

      fetch(fetchUrl, {
        headers: myHeaders 
      }).then((res) => {
        return res.json();
      }).then((json) => {

        let listOfBusinesses = json.businesses
        let newBrewDiv;
        let newBrewSpan;

        // Iterates through the list of businesses and creats divs
        for (let i = 0; i < listOfBusinesses.length; i++) {

          let currentBiz = listOfBusinesses[i]

          newBrewDiv = $("<div>")
          newBrewSpan = $("<span>")
          newBrewDiv.attr("class", "brewery-div row")
          newBrewDiv.attr("id", currentBiz.id)

          let colLeft = $("<div>").attr("class", "col s12 m4")
          let colCenter = $("<div>").attr("class", "col s12 m4")
          let colRight = $("<div>").attr("class", "col s12 m4")

          // Left Column Elements
          let breweryName = $("<h4>")
          breweryName.text(currentBiz.name)

          let breweryImg = $("<img>").attr("src", currentBiz.image_url)
          breweryImg.attr("class", "responsive-img brewery-img")

          newBrewSpan.append(breweryName)
          colLeft.append(breweryImg)


          // Center Column Elements
          let rating = $("<p>").attr("id", 'rating')
          let cost = $("<p>").attr("id", 'cost')
          let status = $("<p>").attr("id", 'status')

          rating.text(currentBiz.rating)
          cost.text(currentBiz.price)

          if(currentBiz.is_closed) {
            status.text("Currently Closed")
          } else {
            status.text("Currently Open")
          }

          colCenter.append(rating, cost, status)

          // Right Column Elements
          let distance = $("<p>").attr("id", "distance")
          let address  = $("<p>").attr("id", "address")
          let phone = $("<p>").attr("id", "phone")
          let yelpPage = $("<a>").attr("id", "yelp-page")

          address.html(currentBiz.location.display_address[0] + "<br>" + currentBiz.location.display_address[1])
          phone.text(currentBiz.phone)
          yelpPage.text("View on Yelp")
          yelpPage.attr("href", currentBiz.url)

          colRight.append(address, phone, yelpPage)

          // Adding Elements to the page
          newBrewDiv.append(newBrewSpan, colLeft, colCenter, colRight)
          $("#breweryElement").append(newBrewDiv)
        
        }

      });

    })

  });

  // On Click Function for Current Location
  $("#current-location").on("click", function () {

    // Start of Geolocation fucntion
    navigator.geolocation.getCurrentPosition(function(position) {

      // variables for holding current latitdue and longitude
      let currentLat = position.coords.latitude
      let currentLng = position.coords.longitude

      // Changes the fetch URL
      fetchUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=breweries&latitude=${currentLat}&longitude=${currentLng}&limit=10`

      // Creates the headers class object that holds the API key
      let myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + apiKey);

      // Fetch Function
      fetch(fetchUrl, {
        headers: myHeaders 
      }).then((res) => {
        return res.json();
      }).then((json) => {

        let listOfBusinesses = json.businesses
        let newBrewDiv;
        let newBrewSpan;
        

        // Iterates through the list of businesses and creats divs
        for (let i = 0; i < listOfBusinesses.length; i++) {

          let currentBiz = listOfBusinesses[i]
          newBrewSpan = $("<span>")
          newBrewDiv = $("<div>")
          newBrewDiv.attr("class", "brewery-div row")
          newBrewDiv.attr("id", currentBiz.id)

          let colLeft = $("<div>").attr("class", "col s12 m4")
          let colCenter = $("<div>").attr("class", "col s12 m4")
          let colRight = $("<div>").attr("class", "col s12 m4")

          // Left Column Elements
          let breweryName = $("<h4>")
          breweryName.text(currentBiz.name)

          let breweryImg = $("<img>").attr("src", currentBiz.image_url)
          breweryImg.attr("class", "responsive-img brewery-img")

          newBrewSpan.append(breweryName)
          colLeft.append(breweryImg)


          // Center Column Elements
          let rating = $("<p>").attr("id", 'rating')
          let cost = $("<p>").attr("id", 'cost')
          let status = $("<p>").attr("id", 'status')

          rating.text(currentBiz.rating)
          cost.text(currentBiz.price)

          if(currentBiz.is_closed) {
            status.text("Currently Closed")
          } else {
            status.text("Currently Open")
          }

          colCenter.append(rating, cost, status)

          // Right Column Elements
          let distance = $("<p>").attr("id", "distance")
          let address  = $("<p>").attr("id", "address")
          let phone = $("<p>").attr("id", "phone")
          let yelpPage = $("<a>").attr("id", "yelp-page")

          address.html(currentBiz.location.display_address[0] + "<br>" + currentBiz.location.display_address[1])
          phone.text(currentBiz.phone)
          yelpPage.text("View on Yelp")
          yelpPage.attr("href", currentBiz.url)

          colRight.append(address, phone, yelpPage)

          // Adding Elements to the page
          newBrewDiv.append(newBrewSpan, colLeft, colCenter, colRight)
          $("#breweryElement").append(newBrewDiv)

        }   

      });

    });

  });

});