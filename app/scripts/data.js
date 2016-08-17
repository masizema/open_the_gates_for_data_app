/*
2MMPa, Masir Zemarai NMDADI, Academiejaar 2015-2016
Bachelor in de grafische en digitale media, Multimediaproductie
Arteveldehogeschool
*/

//global vars
var events;


//preload data
$( window ).load(function(){

    //load all data
    loadEvents();
    loadDays();
    loadWeather(); //weer volgend uur
    loadparkings();
    loadWeatherDays(); //de komende 5dagen weerverwachting


    //get my geolocation
    getMyLoc();




    $("#preloader").delay(400).fadeOut(2000,function() {
        // Animation complete.
        $("#wrapper_loader").fadeIn(1000);
        $("#wrapper_loader").css('visibility', 'visible');
        $("#bodywrap").css('background-color', 'white');
    });

});





function loadEvents() {

    //alle events van de gentse feesten
    $.ajax({
        type: "get",
        url: 'http://datatank.stad.gent/4/toerisme/gentsefeestenevents.json',
        dataType: 'json',
        success: function (data) {
            getClosestevent(data)
            sortevent(data);

            data.forEach(function(entry) {
                addMarker(entry);

            });

        },
        error: function (data) {

        }
    });
}
function loadDays() {

    //dagen van de gentse feesten
    $.ajax({
        type: "get",
        url: 'http://datatank.stad.gent/4/cultuursportvrijetijd/gentsefeestendata.json',
        dataType: 'json',
        success: function (data) {

            data.forEach(function(entry) {
                addDays(entry);
            });

        },
        error: function (data) {


        }
    });
}

function loadWeather() {

   //get weather
    $.ajax({
        type: "get",
        url: 'http://datatank.stad.gent/4/milieuennatuur/weersverwachting1u.json',
        dataType: 'json',
        success: function (data) {
       
            forecastOnehour(data);

        },
        error: function (data) {


        }
    });

}

function loadWeatherDays() {

   //get weather  2797656
    $.ajax({
        type: "get",
        url: 'http://api.openweathermap.org/data/2.5/forecast?id=2797656&appid=1b6a7c42b91c919a501bb8c7e8339634',
        dataType: 'json',
        success: function (data) {

            placeweather(data);

        },
        error: function (data) {


        }
    });

}
function loadparkings() {

    //get parkings
    $.ajax({
        type: "get",
        url: 'http://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json',
        dataType: 'json',
        success: function (data) {
            placeParkingOnMap(data);

        },
        error: function (data) {


        }
    });

}
