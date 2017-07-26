// function getWeather(woeid) {
//   var url = "proxy.php";

  // .done(function() {
  //   console.log( "second success" );
  // })
  // .fail(function() {
  //   console.log( "error -> status " + jqxhr.responseText );
  //   console.log( "error -> readyState " + jqxhr.readyState);
  //
  // })
  // .always(function() {
  //   console.log( "complete" );
  //   $('#response').html(jqxhr.responseText);
  // });
// };

$(document).ready(function(){
  var jqxhr,
      url = "proxy.php",
      $fixedWidgets = $('.widget'),
      woeIDs = [2488853, 2488042, 2455920, 2487956, 23511744];

  $.each($fixedWidgets, function(i, item) {
    jqxhr = $.getJSON( url, {c: woeIDs[i]} ,function(response){
      item.innerHTML = response.title + "<br/>" + "Weather: " +
                       response.;

    });
  })


});
