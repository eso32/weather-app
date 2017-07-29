//Budowa 7 predefiniowanych widgetów
$(document).ready(function(){
  var jqxhr,
      a = "",
      $fixedWidgets = $('.widget'),
      woeIDs = [2459115, 753692, 721943, 2487956, 638242, 523920, 615702];

  $.each($fixedWidgets, function(i, item) {
    //Pobranie danych z API
    jqxhr = $.getJSON( "proxy.php", {c: woeIDs[i]} ,function(response){
      var data = response.consolidated_weather;

      //Wypełnienie danych dot. aktualnego dnia(div.row.widget)
      a = '<div class="row">' +
            '<div class="col-md-12">' +
              '<h3>'+response.title+'</h3><span class="weather">'+data[0].weather_state_name+'</span><br/>' +
              '<span class="temp">'+Math.round(data[0].the_temp)+'&#176;C</span>' +
              '<img src="https://www.metaweather.com/static/img/weather/'+data[0].weather_state_abbr+'.svg" alt="Weather state">' +
            '</div>' +
          '</div>' +
          '<div class="row widget-bottom">';

      //Prognoza dla 4 kolejnych dni (div.row.widget-bottom)
      for(i=1; i<=4; i++){
        a +='<div class="col-xs-3">' +
              '<span class="date">'+getWeekday(i)+'</span>' +
              '<span class="temp-bottom">'+Math.round(data[i].the_temp)+'&#176;C<br/></span>'+
              '<img src="https://www.metaweather.com/static/img/weather/'+data[i].weather_state_abbr+'.svg" alt="">'+
            '</div>';
      }
      item.innerHTML = a + '</div>';
    });
  });
});

//Przypisanie dnia tygodnia do cyfry kolejnego dnia
function getWeekday(i){
  var d = new Date(),
      day = d.getDay()+i,
      weekday = ["Sunday", "Monday",
                "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday"];

  if(day>6){
    day=day - 6;
  }

  return weekday[day];
}

//Wyszukanie miasta na podstawie nazwy - metoda API
$('#search').on('click', function(){

  var city = $.trim($('#city').val()); //Pobranie wartości oraz usunięcie białych znaków na początku i końcu
  if(city != ''){
    var $result = $('#result');
    $result.html('<div class="loader"><div class="spinner"></div></div>');
    $('#photoModal').modal('show');
    $( this ).prop("disabled", true).css('opacity', 0.3);

    var city_encoded = encodeURI(city);
    var jqxhr = $.getJSON( "proxy.php", {city: city_encoded} ,function(response){
      if(response.length > 0){
        $result.html('');
        $.each(response, function(i, item){
          $result.append('<div class="item-found">' + item.title + '<p>' +
          item.woeid+ '</p></div>');
        });
      } else {
        $result.html('');
        $result.append("Nic nie znaleziono :(");
      }
    })
      .done(function() {
        $( '#search' ).prop("disabled", false).css('opacity', 1);
      })
      .fail(function() {
        console.log('Something went wrogn with searchin API: ' + jqxhr.responseText);
      });
  } else {
    $('.notification').toggleClass(' active');
    setTimeout(function(){ $('.notification').toggleClass(' active'); }, 3000);
  }
});

//Pobranie danych API po wyborze miasta w modal oraz dodanie widgetu (nowego miasta)
$('#result').on('click', 'div.item-found', function(){
  var woeid = $( this ).children('p').text(),
      $result = $('#result'),
      a = "";

  //Loader przed wczytaniem listy miast odpowiadających zapytaniu
  $result.html('<div class="loader"><div class="spinner"></div></div>');

  var jqxhr = $.getJSON( "proxy.php", {c: woeid} ,function(response){
        var data = response.consolidated_weather;

        //Wypełnienie danych dot. aktualnego dnia(div.row.widget)
        a =
        '<div class="col-md-4">' +
          '<div class="widget">' +
            '<div class="row">' +
              '<div class="col-md-12">' +
                '<h3>'+response.title+'</h3><span class="weather">'+data[0].weather_state_name+'</span><br/>'+
                '<span class="temp">'+Math.round(data[0].the_temp)+'&#176;C</span>'+
                '<img src="https://www.metaweather.com/static/img/weather/'+data[0].weather_state_abbr+'.svg" alt="Weather state">'+
              '</div>' +
            '</div>' +
            '<div class="row widget-bottom">';

        //Prognoza dla 4 kolejnych dni (div.row.widget-bottom)
        for(i=1; i<=4; i++){
          a +=
              '<div class="col-xs-3">'+
                '<span class="date">'+getWeekday(i)+'</span>'+
                '<span class="temp-bottom">'+Math.round(data[i].the_temp)+'&#176;C<br/></span>'+
                '<img src="https://www.metaweather.com/static/img/weather/'+data[i].weather_state_abbr+'.svg" alt="">'+
              '</div>';
        }
        $('#new').before(a + '</div></div></div>');
        $('#photoModal').modal('hide');
      })
      .fail(function() {
        console.log('Something went wrong: ' + jqxhr.status);
      });

  //Loader po wyborze miasta - pobieranie danych z API
  $result.html('<div class="loader"><div class="spinner"></div></div>');
});

//smoothscroll - CSSTricks
$('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
        }
      });
    }
  }
});

//Rozwinięcie/zwinięcie menu dla okna mniejszego od 900px
function menu() {
  $( ".hamburger" ).click(function() {
    $( ".menu" ).slideToggle( "slow", function() {
      $( ".hamburger" ).hide();
      $( ".cross" ).show();
    });
  });
  $( ".cross" ).click(function() {
    $( ".menu" ).slideToggle( "slow", function() {
      $( ".cross" ).hide();
      $( ".hamburger" ).show();
    });
  });
  refreshMenu();
}

//Odświeżenie menu po zmianie szerokości okna
function refreshMenu(){
  if(window.innerWidth<900){
    $( ".hamburger" ).show();
    $( ".cross" ).hide();
    $( ".menu" ).hide();
  }else {
    $( ".menu" ).show();
    $( ".hamburger" ).hide();
    $( ".cross" ).hide();
  }
}

$( window ).resize(refreshMenu);
$( document ).on('load', menu());
