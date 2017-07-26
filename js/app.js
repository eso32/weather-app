$(document).ready(function(){
  var jqxhr,
      url = "proxy.php",
      $fixedWidgets = $('.widget'),
      woeIDs = [2488853, 2488042, 2455920, 2487956, 23511744];

  $.each($fixedWidgets, function(i, item) {
    jqxhr = $.getJSON( url, {c: woeIDs[i]} ,function(response){
      item.innerHTML = response.title + "<br/>" + "Weather: " +
                       response.consolidated_weather[0].weather_state_name;
    });
  })
});

$('#search').on('click', function(){
  $('#result').html("");
  console.log("fired");
  $( this ).prop("disabled", true).css('opacity', 0.3);
  var $city = $('#city').val();
  var jqxhr = $.getJSON( "proxy.php", {city: $city} ,function(response){
    console.log(response);
    if(response.length > 0){
      $.each(response, function(i, item){
        $( '#result' ).append('<span class="itemFound">' + item.title + '<p>' +
        item.woeid+ '</p></span>');
      });
    } else {
      $( '#result' ).append("Nic nie znaleziono :(");
    }

  })
    .done(function() {
      console.log( "success" );
      $( '#search' ).prop("disabled", false).css('opacity', 1);
    })
    .fail(function() {
      console.log( "error" + jqxhr.responseText);
    });
});

$('#result').on('click', 'span.itemFound', function(){
  var woeid = $( this ).children('p').text();
  var jqxhr = $.getJSON( "proxy.php", {c: woeid} ,function(response){
    $('#new').before('<div class="col-md-4"><div class="widget">'+
    response.title + "<br/>" + "Weather: " +
    response.consolidated_weather[0].weather_state_name
    +'</div></div>');
  });

  $('#result').html("");
});
