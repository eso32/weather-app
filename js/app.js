$(document).ready(function(){
  var jqxhr, a
      url = "proxy.php",
      $fixedWidgets = $('.widget'),
      woeIDs = [2488853, 2488042, 2455920, 2487956, 23511744, 523920, 615702];

  $.each($fixedWidgets, function(i, item) {
    jqxhr = $.getJSON( url, {c: woeIDs[i]} ,function(response){
      var data = response.consolidated_weather;
      a =
                '<div class="row"><div class="col-md-12">'+
                  '<h3>'+response.title+'</h3><span class="weather">'+data[0].weather_state_name+'</span><br/>'+
                  '<span class="temp">'+Math.round(data[0].the_temp)+'&#176;C</span>'+
                  '<img src="https://www.metaweather.com/static/img/weather/'+data[0].weather_state_abbr+'.svg" alt="">'+
                '</div></div><div class="row widget-bottom">';
      for(i=1; i<=4; i++){
        a +=
        '<div class="col-xs-3">'+
        '<span class="date">'+getWeekday(i)+'</span>'+
        '<span class="temp-bottom">'+Math.round(data[i].the_temp)+'&#176;C<br/></span>'+
        '<img src="https://www.metaweather.com/static/img/weather/'+data[i].weather_state_abbr+'.svg" alt="">'+
        '</div>';
      }
      item.innerHTML = a + '</div>';
    });
  })
});

function getWeekday(i){
  var d = new Date();
  var weekday = new Array(7);

  var day = d.getDay()+i;

  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  if(day>6){
    day=day - 6;
  }
  return weekday[day];
}

$('#search').on('click', function(){
  $('#result').html('<div class="loader"><div class="spinner"></div></div>');
  $('#photoModal').modal('show');
  $( this ).prop("disabled", true).css('opacity', 0.3);
  var city = encodeURI($('#city').val());
  var jqxhr = $.getJSON( "proxy.php", {city: city} ,function(response){
    if(response.length > 0){
      $('#result').html('');
      $.each(response, function(i, item){
        $( '#result' ).append('<div class="item-found">' + item.title + '<p>' +
        item.woeid+ '</p></div>');
      });
    } else {
      $('#result').html('');
      $( '#result' ).append("Nic nie znaleziono :(");
    }
  })
    .done(function() {
      $( '#search' ).prop("disabled", false).css('opacity', 1);
    })
    .fail(function() {
    });
});

$('#result').on('click', 'div.item-found', function(){
  var woeid = $( this ).children('p').text();
  $('#result').html('<div class="loader"><div class="spinner"></div></div>');
  var jqxhr = $.getJSON( "proxy.php", {c: woeid} ,function(response){
        var data = response.consolidated_weather;
        a =      '<div class="col-md-4"><div class="widget">'+
                  '<div class="row"><div class="col-md-12">'+
                    '<h3>'+response.title+'</h3><span class="weather">'+data[0].weather_state_name+'</span><br/>'+
                    '<span class="temp">'+Math.round(data[0].the_temp)+'&#176;C</span>'+
                    '<img src="https://www.metaweather.com/static/img/weather/'+data[0].weather_state_abbr+'.svg" alt="">'+
                  '</div></div><div class="row widget-bottom">';
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
      });
  $('#result').html("");
  $('#result').html('<div class="loader"><div class="spinner"></div></div>');
});

//smoothscroll
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
        };
      });
    }
  }
});

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
};

function refreshMenu(){
  if(window.innerWidth<900){
    console.log('lol');
    $( ".hamburger" ).show();
    $( ".cross" ).hide();
    $( ".menu" ).hide();
  }else {
    console.log('lol2');
    $( ".menu" ).show();
    $( ".hamburger" ).hide();
    $( ".cross" ).hide();
  }
}

$( window ).resize(refreshMenu);
$( document ).on('load', menu());
