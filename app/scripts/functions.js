/*
2MMPa, Masir Zemarai NMDADI, Academiejaar 2015-2016
Bachelor in de grafische en digitale media, Multimediaproductie
Arteveldehogeschool
*/

var d = new Date();
var isactive = true;
var socialset = true;

var weekday = new Array(7);
weekday[0]=  "zondag";
weekday[1] = "maandag";
weekday[2] = "dinsdag";
weekday[3] = "woensdag";
weekday[4] = "donderdag";
weekday[5] = "vrijdag";
weekday[6] = "zaterdag";

var day15 = [];
var day16 = [];
var day17 = [];
var day18 = [];
var day19 = [];
var day20 = [];
var day21 = [];
var day22 = [];
var day23 = [];
var day24 = [];



function addDays(data) {
    var array = data.day.split(" ");



    var n = weekday[d.getDay()];
    if(n == array[0] && isactive != false){
        $("#day-tab").append('<li class="liclass" id="ul'+ array[1] +'" class="active" ><a data-count="' +array[1]+'" onclick="changetab(this)" href="#schedule-tab2">&nbsp;&nbsp;'+ array[0] +'</a></li>');
        isactive = false;
        var blok = "#tab"+array[1];
        $( blok ).css( "display", "block" );
        var ulset = "#ul"+array[1];;
        $( ulset ).addClass("active" );

    }else{
        $("#day-tab").append('<li class="liclass" id="ul'+ array[1] +'" ><a href="#schedule-tab2" data-count="' +array[1]+'" onclick="changetab(this)">&nbsp;&nbsp;'+ array[0] +'</a></li>');
    }


}

function forecastOnehour(data) {
    var temperatuur = data['properties'].attributes[0].value;
    var info = data['properties'].attributes[6].value;
    $( "#weather-info" ).text('Temperatuur: '+ temperatuur + 'C°, Air:' + info);

}

function placeweather(data) {

    for(var i = 0; i<32; i++){
        var d = new Date(data.list[i].dt_txt);
        var thisdate =  weekday[d.getDay()];
        var nextd = new Date(data.list[i+1].dt_txt);
        var thisdatenext =  weekday[nextd.getDay()];
        var first = thisdate;
        if(first != thisdatenext){
                var longhtml ='<div class="owl-item" style="width: 395px;"><div class="blog-item">'
                       + '<div class="blog-item-wrapper">'
                   +' <div class="blog-item-thumb">';

                    var weatherstring = data.list[i].weather[0].description;
                    var weather =   '';
                    if( weatherstring.indexOf('clear') >= 0 ){
                        weather = '    <a href="" class=""><i class="wi wi-day-sunny"></i></a>'
                    }
                    if( weatherstring.indexOf('rain') >= 0 ){
                        weather = '    <a href="l" class=""><i class="wi wi-night-rain-mix"></i></a>'
                    }
                    if( weatherstring.indexOf('clouds') >= 0 ){
                        weather = '    <a href="l" class=""><i class="wi wi-cloudy"></i></a>'
                    }

                        var htmlend = '</div>'
                  +  '<div class="blog-item-infos">'
                    +    '<div class="blog-item-title-wrapper">'
                     +   '<h2 class="blog-item-title title-border"><a href="single.html" class="">'+ thisdate +'</a></h2>'
                   + '</div>'
                   + '<div class="blog-item-description">'
                   +     '<p style="color: black!important;">'+  data.list[i].weather[0].description+ '</p>'
                   +     '<p style="color: black!important;">Wind:'+  data.list[i].wind.speed+ ' m/s direction:' +  data.list[i].wind.deg+' Degrees</p>'
                  + '</div>'
                  +  '</div>'
                  +  '</div>'
                  +  '</div>'
                 +   '</div>';


                    var result = longhtml + weather + htmlend;

            $('.weather_placement').append(result);
        }


    }

}

function sortevent(data) {

    //datum startuur
    data.forEach(function(entry) {
        

        var d = new Date(entry.datum*1000);
        if(d.getDate() == 15){
            day15.push(entry);
            $("#day15").append('<li><p>'+ entry.titel +' '+ entry.startuur +'-'+ entry.einduur+'</p> <button class="addfav" data-startuur="'+ entry.startuur +'" data-locatie="'+ entry.locatie +'" data-titel="'+ entry.titel +'" data-id="'+ entry.id +'" >Add to favorites <i data-id="'+ entry.id +'" class="wi wi-day-sunny"></i></button> </li>');
        }
        if(d.getDate() == 16){
            day16.push(entry);
            $("#day16").append('<li><p>'+ entry.titel +' '+ entry.startuur +'-'+ entry.einduur+'</p><button class="addfav" data-startuur="'+ entry.startuur +'" data-locatie="'+ entry.locatie +'" data-titel="'+ entry.titel +'" data-id="'+ entry.id +'" >Add to favorites <i data-id="'+ entry.id +'" class="wi wi-day-sunny"></i></button></li>');

        }
        if(d.getDate() == 17){
            day17.push(entry);
            $("#day17").append('<li><p>'+ entry.titel +' '+ entry.startuur +'-'+ entry.einduur+'</p><button class="addfav" data-startuur="'+ entry.startuur +'" data-locatie="'+ entry.locatie +'" data-titel="'+ entry.titel +'" data-id="'+ entry.id +'" >Add to favorites <i data-id="'+ entry.id +'" class="wi wi-day-sunny"></i></button></li>');

        }
        if(d.getDate() == 18){
            day18.push(entry);
            $("#day18").append('<li><p>'+ entry.titel +' '+ entry.startuur +'-'+ entry.einduur+'</p><button class="addfav" data-startuur="'+ entry.startuur +'" data-locatie="'+ entry.locatie +'" data-titel="'+ entry.titel +'" data-id="'+ entry.id +'" >Add to favorites <i data-id="'+ entry.id +'" class="wi wi-day-sunny"></i></button></li>');

        }
        if(d.getDate() == 19){
            day19.push(entry);
            $("#day19").append('<li><p>'+ entry.titel +' '+ entry.startuur +'-'+ entry.einduur+'</p><button class="addfav" data-startuur="'+ entry.startuur +'" data-locatie="'+ entry.locatie +'" data-titel="'+ entry.titel +'" data-id="'+ entry.id +'" >Add to favorites <i data-id="'+ entry.id +'" class="wi wi-day-sunny"></i></button></li>');

        }
        if(d.getDate() == 20){
            day20.push(entry);
            $("#day20").append('<li><p>'+ entry.titel +' '+ entry.startuur +'-'+ entry.einduur+'</p><button class="addfav" data-startuur="'+ entry.startuur +'" data-locatie="'+ entry.locatie +'" data-titel="'+ entry.titel +'" data-id="'+ entry.id +'" >Add to favorites <i data-id="'+ entry.id +'" class="wi wi-day-sunny"></i></button></li>');

        }
        if(d.getDate() == 21){
            day21.push(entry);
            $("#day21").append('<li><p>'+ entry.titel +' '+ entry.startuur +'-'+ entry.einduur+'</p><button class="addfav" data-startuur="'+ entry.startuur +'" data-locatie="'+ entry.locatie +'" data-titel="'+ entry.titel +'" data-id="'+ entry.id +'" >Add to favorites <i data-id="'+ entry.id +'" class="wi wi-day-sunny"></i></button></li>');

        }
        if(d.getDate() == 22){
            day22.push(entry);
            $("#day22").append('<li><p>'+ entry.titel +' '+ entry.startuur +'-'+ entry.einduur+'</p><button class="addfav" data-startuur="'+ entry.startuur +'" data-locatie="'+ entry.locatie +'" data-titel="'+ entry.titel +'" data-id="'+ entry.id +'" >Add to favorites <i data-id="'+ entry.id +'" class="wi wi-day-sunny"></i></button></li>');

        }
        if(d.getDate() == 23){
            day23.push(entry);
            $("#day23").append('<li><p>'+ entry.titel +' '+ entry.startuur +'-'+ entry.einduur+'</p><button class="addfav" data-startuur="'+ entry.startuur +'" data-locatie="'+ entry.locatie +'" data-titel="'+ entry.titel +'" data-id="'+ entry.id +'" >Add to favorites <i data-id="'+ entry.id +'" class="wi wi-day-sunny"></i></button></li>');

        }
        if(d.getDate() == 24){
            day24.push(entry);
            $("#day24").append('<li><p>'+ entry.titel +' '+ entry.startuur +'-'+ entry.einduur+'</p><button class="addfav" data-startuur="'+ entry.startuur +'" data-locatie="'+ entry.locatie +'" data-titel="'+ entry.titel +'" data-id="'+ entry.id +'" >Add to favorites <i data-id="'+ entry.id +'" class="wi wi-day-sunny"></i></button></li>');

        }
        var favo =  getCookie("fav");
        // kijken of deze event onze opgeslagen enevt is zo ja word de favoriet weer gegeven
        if(entry.titel == favo){
            if(socialset){
                $("#favo_saved").text(entry.titel +' '+ entry.startuur +'-'+ entry.einduur+ ' ' + entry.locatie);
                var link = $("#facebookshare").attr('href');
                 link = link + document.URL;
                 $("#facebookshare").attr('href', link);

                 var link2 = $("#twittershare").attr('href');
                link2 = "https://twitter.com/home?status=" + entry.titel +'%20'+ entry.startuur +'-'+ entry.einduur+ '%20' + entry.locatie;
                 $("#twittershare").attr('href', link2);
                socialset = false;
            }




        }

    });


}

function changetab(item) {


    $( '.schedule-tabs' ).css( "display", "none" );
    var day = item.getAttribute('data-count')
    var blok = "#tab"+day;
    var ulset = "#ul"+day;
    $( blok ).css( "display", "block" );
    $( '.liclass' ).removeClass('active');
    $( ulset ).addClass("active" );


}




function getClosestevent(data){
    //vaste datum voor de gentse feesten kiezen bv 17
    data.forEach(function(entry) {
        var d = new Date(entry.datum*1000);
        if(d.getDate() == 18){
            var dn = new Date();
            if(entry.startuur == dn.getHours()+':00'){

                $( '#closesteventdata' ).text( entry.titel +" " + entry.startuur+"-"+entry.einduur + " " + entry.locatie );

            }

        }


    });
}


// van http://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}





$( window ).ready(function(){
    //button events


    $( "#mylocationButton" ).click(function() {
        hideEventMarkers();
        hideparkingMarkers();
        getMyLoc();

    });

    $( "#showeventsButton" ).click(function() {
        hideMyLocation();
        hideparkingMarkers();
        setEventsToMap();
    });

    $( "#showParkingsButton" ).click(function() {
        hideMyLocation();
        hideEventMarkers();
        setParkingMarkers();
    });


    $(document).on("click", ".addfav", function(item){

        var id = $(this).attr("data-titel");

        setCookie("fav", id, 365);
        var locatie = $(this).attr("data-locatie");
        var titel = $(this).attr("data-titel");
        var startuur = $(this).attr("data-startuur");

        $("#favo_saved").text(titel +' '+ startuur +' '+ locatie);


    });

    // van http://www.w3schools.com/js/js_cookies.asp
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    // van http://www.w3schools.com/js/js_cookies.asp
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
});
