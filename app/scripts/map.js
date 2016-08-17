//global vars
var map;
var geocoder;
var city;

var eventMarker = [];
var locationMarker = [];
var parkingMarkers = [];



function initMap() {
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.0473761, lng: 3.7301493},
        scrollwheel: false,
        zoom: 15

    });
    geocoder = new google.maps.Geocoder();

}


//get mylocatiuon via google developers
function getMyLoc() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {

        var infoWindow = new google.maps.InfoWindow();
        infoWindow.setContent('<p>Hi, I am here!</p>');

        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);


            codeLatLng(pos);

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

}

//when locations fails do
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

//get city
//code from https://developers.google.com/maps/documentation/javascript/tutorials/geolocation
// http://stackoverflow.com/questions/2472957/how-can-i-change-the-color-of-a-google-maps-marker
function codeLatLng(pos) {

    var latlng = new google.maps.LatLng(pos.lat, pos.lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {


            if (results[1]) {
                //formatted address

                //find country name
                for (var i=0; i<results[0].address_components.length; i++) {
                    for (var b=0;b<results[0].address_components[i].types.length;b++) {

                        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                            //this is the object you are looking for
                            city= results[0].address_components[i];
                            break;
                        }
                    }
                }
                //city data



                $( "#mylocation" ).text('My location: ' + results[1].formatted_address);

                //marker kleur
                var pinColor = "ffc600";
                var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                    new google.maps.Size(21, 34),
                    new google.maps.Point(0,0),
                    new google.maps.Point(10, 34));
                var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                    new google.maps.Size(40, 37),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(12, 35));

                //info window van de marker
                var infoWindow = new google.maps.InfoWindow();
                infoWindow.setPosition(pos);
                infoWindow.setContent('<p style="color:#000!important;"> '+results[1].formatted_address + '</p>');


                map.setCenter(pos);
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(pos.lat , pos.lng),
                    map: map,
                    icon: pinImage,
                    shadow: pinShadow
                });

                marker.addListener('click', function() {
                    infoWindow.open(map, marker);
                });
                locationMarker.push(marker);





            } else {
                alert("No results found");
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }
    });
}
function hideMyLocation() {

    locationMarker.forEach(function(entry) {
        entry.setMap(null);
    });



}

function setlocationTomap() {

    locationMarker.forEach(function(entry) {
        entry.setMap(this.map);
    });

}

//addevent marker
function addMarker(data) {

    //dit is omdat je anders de geolocation marker niet ziet omdat een event marker er boven zit
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(data.latitude , data.longitude),
            map: map,
        });

        var infowindow = new google.maps.InfoWindow({
            content: '<h1>'+data.titel +'</h1>' + '<p style="color: #1c242f!important;">'+ data.omschrijving + '</p> '
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
        eventMarker.push(marker);
}

function hideEventMarkers() {


    eventMarker.forEach(function(entry) {
        entry.setMap(null);
    });


}
function setEventsToMap() {
    eventMarker.forEach(function(entry) {
        entry.setMap(this.map);
    });

}
//place parkings on map
function placeParkingOnMap(data) {


    //marker maken met specifiek kleur
    //van internet
    var pinColor = "00779E";
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));


    data.forEach(function(entry) {

        //nieuwe marker maken
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(entry.latitude , entry.longitude),
            map: map,
            icon: pinImage,
            shadow: pinShadow
        });


        //nieuwe infowindow voor de marker
        var infowindow = new google.maps.InfoWindow({
            content: '<p style="color: black!important;' +
            '">Parking: ' + entry.name + ' address: ' + entry.address +'<br>' +'Free parking spaces: ' + entry.parkingStatus.availableCapacity +'/'+  entry.parkingStatus.totalCapacity + '</p>'
        });

        //klik event op de marker zetten zodat info window open gaat
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

        //marker toevoegen aan de parkingmarker array
        parkingMarkers.push(marker);


    });
    

    
}

function hideparkingMarkers() {

    //alle parking markers weg van de map plaatsen door de optie van de marker "map" op null te setten
    parkingMarkers.forEach(function(entry) {
        entry.setMap(null);
    });


}
function setParkingMarkers() {
    //alle parking markers op de map terug te zetten door hun optie "map" terug naar de juiste map te zetten
    parkingMarkers.forEach(function(entry) {
        entry.setMap(this.map);
    });

}

