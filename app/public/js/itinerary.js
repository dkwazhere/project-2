var apiKey = "&apikey=cG8ZbSEqyCqrad10YByFeF68h07TuCiw";
var userOrigin = "";
var userDestination = "";
var userDeparture = "";
var userReturn = "";
var userAdults = "";
var userChildren =  "";
var hotelSearch = '';
var carSearch = '';
var startDate = '';
var endDate = '';
var pickUpTime = '';
var dropOffTime = '';
var searchOrigin = '';
var searchDeparture = '';
var searchDestination = '';
var searchReturn = '';
var searchAdults = '';
var searchChildren = '';

    $("#submitbutton").on("click",function(event) {
    event.preventDefault();
    userOrigin = $("#origin").val().trim();
    userDestination = $("#destination").val().trim();
    userDeparture = $("#departure").val().trim();
    userReturn = $("#return").val().trim();
    userAdults = $("#adults").val().trim();
    userChildren = $("#children").val().trim();

    var newItinerary = {
      searchOrigin: $(".origin").val().trim(),
      searchDestination: $(".destination").val().trim(),
      searchDeparture: $(".departure").val().trim(),
      searchReturn: $(".return").val().trim(),
      searchAdults: $(".adults").val().trim(),
      searchChildren: $(".children").val().trim()
    };
    console.log(newItinerary);

    $.post("/api/itinerary", newItinerary)
  // On success, run the following code
  .then(function() {

    var row = $("<div>");
    row.addClass("itinerary");

    row.append("<p>" + newItinerary.searchOrigin + "</p>");
    row.append("<p>" + newItinerary.searchDestination + "</p>");
    row.append("<p>" + newItinerary.searchDeparture + " </p>");
    row.append("<p>" + newItinerary.searchReturn + "</p>");
    row.append("<p>" + newItinerary.searchAdults + "</p>");
    row.append("<p>" + newItinerary.searchChildren + "</p>" + +"<br>" + "<hr>");
    $("#booyahbitches").prepend(row);

  });

    $("#origin").val('');
    $("#destination").val('');
    $("#departure").val('');
    $("#return").val('');
    $("#adults").val('');
    $("#children").val('');
    $("hotel-search").val('');

    // calling function after getting user input
    getAirline();
    getHotels();

    });

    $.get("/api/all", function(data) {

  if (data.length !== 0) {

    for (var i = 0; i < data.length; i++) {

      var row = $("<div>");
      row.addClass("listItinerary");

      row.append("<p>" + data[i].searchOrigin + "  </p>");
      row.append("<p>" + data[i].searchDestination + "</p>");
      row.append("<p>" + data[i].searchDeparture + "  </p>");
      row.append("<p>" + data[i].searchReturn + "</p>");
      row.append("<p>" + data[i].searchAdults + "  </p>");
      row.append("<p>" + data[i].searchChildren + "</p>");
      $("#booyahbitches").prepend(row);

    }

  }

});

var airlineData;
var hotelData;
// Function to connect ajax and get response from amadeus
function getAirline() {
    var amadeusURL = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?origin="+ userOrigin + "&destination=" + userDestination + "&departure_date=" +userDeparture+ "&return_date=" + userReturn + "&adults=" + userAdults + "&children=" + userChildren + "&number_of_results=5" + apiKey;
    $.ajax({
        url: amadeusURL,
        method: "GET",
        dataType: "json"
    }).done(function(response) {
        airlineData = response.results;
        console.log(response.results);
        console.log(amadeusURL);
        // Outbound
        for (i=0; i<1; i++) {
            $('#itinerary_container').append("Airline: " + response.results[i].itineraries[0].outbound.flights[0].marketing_airline + "</div><br>");
            $('#itinerary_container').append( "Flight Number: " + response.results[i].itineraries[0].outbound.flights[0].flight_number + "<br>");
            $('#itinerary_container').append("Your Total Price: $" + response.results[i].fare.total_price + "<br>");
            $('#itinerary_container').append(" -price per adult: $" + response.results[i].fare.price_per_adult.total_fare + "+ Tax: $" + response.results[0].fare.price_per_adult.tax +"<br>");
            $('#itinerary_container').append(" -price per child: $" + response.results[i].fare.price_per_child.total_fare + "+ Tax: $" + response.results[0].fare.price_per_child.tax + "<br>");
            $('#itinerary_container').append("Departure Date/Time: " + response.results[i].itineraries[0].outbound.flights[0].departs_at + "<br>");
            $('#itinerary_container').append("Origin: " + response.results[i].itineraries[0].outbound.flights[0].origin.airport + " terminal: " + response.results[i].itineraries[0].outbound.flights[0].origin.terminal + "<br>");
            $('#itinerary_container').append("Destination: " + response.results[i].itineraries[0].outbound.flights[0].destination.airport + " terminal: " + response.results[i].itineraries[0].outbound.flights[0].destination.terminal + "<br>");
            $('#itinerary_container').append("Seats remaining: " + response.results[i].itineraries[0].outbound.flights[0].booking_info.seats_remaining + "<br>");
            $('#itinerary_container').append( "Booking Class: " + response.results[0].itineraries[0].outbound.flights[0].booking_info.travel_class + "<br>" +"<div>" + createRadioButtons('outbound', i) +"</div>");


            // Inbound
            $("#itinerary_returning").append( "Airline: " + response.results[i].itineraries[0].inbound.flights[0].marketing_airline + "<br>");
            $("#itinerary_returning").append( "Flight Number: " + response.results[i].itineraries[0].inbound.flights[0].flight_number + "<br>");
            $("#itinerary_returning").append("Your Total Price: $" + response.results[i].fare.total_price + "<br>");
            $("#itinerary_returning").append(" -price per adult: $" + response.results[i].fare.price_per_adult.total_fare + "+ Tax: $" + response.results[0].fare.price_per_adult.tax +"<br>");
            $("#itinerary_returning").append(" -price per child: $" + response.results[i].fare.price_per_child.total_fare + "+ Tax: $" + response.results[0].fare.price_per_child.tax + "<br>");
            $("#itinerary_returning").append("Departure Date/Time: " + response.results[i].itineraries[0].inbound.flights[0].departs_at + "<br>");
            $("#itinerary_returning").append("Origin: " + response.results[i].itineraries[0].inbound.flights[0].origin.airport + " terminal: " + response.results[i].itineraries[0].outbound.flights[0].origin.terminal + "<br>");
            $("#itinerary_returning").append("Destination: " + response.results[i].itineraries[0].inbound.flights[0].destination.airport + " terminal: " + response.results[i].itineraries[0].outbound.flights[0].destination.terminal + "<br>");
            $("#itinerary_returning").append("Seats remaining: " + response.results[i].itineraries[0].inbound.flights[0].booking_info.seats_remaining + "<br>");
            $("#itinerary_returning").append( "Booking Class: " + response.results[0].itineraries[0].inbound.flights[0].booking_info.travel_class + "<br>" +"<div>" + createRadioButtons('inbound', i) + "</div>");
        }
    });
};

function getHotels() {
    var hotelURL = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?" + "apikey=cG8ZbSEqyCqrad10YByFeF68h07TuCiw" + "&location=" + userDestination + "&check_in=" + userDeparture + "&check_out=" + userReturn + "&number_of_results=3";
    $.ajax({
        url: hotelURL,
        method:"GET",
        dataType: "json"
    }).done(function(response) {
        hotelData = response.results;
        console.log(response);
        console.log(hotelURL);

        for (var j = 0; j < 1 ; j++) {
            $("#hotel-data").append("City: " + response.results[j].address.line1);
            $("#hotel-data").append("City: " + response.results[j].address.city);
            $("#hotel-data").append("City: " + response.results[j].address.region);
            $("#hotel-data").append("City: " + response.results[j].address.postal_code);
            $("#hotel-data").append("City: " + response.results[j].address.country);
            $("#hotel-data").append("City: " + response.results[j].contacts[0].detail + "<br>" +"<div>" + createRadioButtons('hotels', j) + "</div>");


        }
});
};

function createRadioButtons(typeName, idx){
    var radioButton = document.createElement('input');
    radioButton.setAttribute('type', 'radio');
    radioButton.setAttribute('name', typeName);
    radioButton.setAttribute('value', idx);
    return radioButton.outerHTML;
}
