(function() {
  var weather = {

    init: function() {
      this.cacheDom();
      this.bindEvents();
      this.buildWeatherWidget();
      this.menu();
    },

    cacheDom: function(){
      this.$menu = $( ".menu" );
      this.$hamburger = $( ".hamburger" );
      this.$cross = $( ".cross" );
    },

    bindEvents: function(){
      $('#search').on('click', this.searchForCity);
      $('#result').on('click', 'div.item-found', this.getAPIData);
      $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(this.smoothScroll);
      $( window ).resize(weather.refreshMenu.bind(this));
    },

    buildWeatherWidget: function(){
      var jqxhr,
          a = "",
          $fixedWidgets = $('.widget'),
          woeIDs = [2459115, 753692, 721943, 2487956, 638242, 523920, 615702];

      $.each($fixedWidgets, function(i, item) {
        //Pobranie danych z API
        jqxhr = $.getJSON( "proxy.php", {c: woeIDs[i]} ,function(response){
          a="";
          a = weather.widgetTemplate(response, a);

          item.innerHTML = a + '</div>';
        });
      });
    },

    //Przypisanie dnia tygodnia do cyfry kolejnego dnia
    getWeekday: function(i) {
      var d = new Date(),
          day = d.getDay()+i,
          weekday = ["Sunday", "Monday",
                    "Tuesday", "Wednesday", "Thursday",
                    "Friday", "Saturday"];

      if(day>6){
        day=day - 6;
      }
      return weekday[day];
    },

    searchForCity: function(){

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
    },


    //Pobranie danych API po wyborze miasta w modal oraz dodanie widgetu (nowego miasta)
    getAPIData: function(){
      var woeid = $( this ).children('p').text(),
          $result = $('#result'),
          a = "";

      //Loader przed wczytaniem listy miast odpowiadających zapytaniu
      $result.html('<div class="loader"><div class="spinner"></div></div>');

      var jqxhr = $.getJSON( "proxy.php", {c: woeid} ,function(response){
        a =
        '<div class="col-md-4">' +
          '<div class="widget">';

            a = weather.widgetTemplate(response, a);

            console.log(a);
            $('#new').before(a + '</div></div></div>');
            $('#photoModal').modal('hide');

          })
          .fail(function() {
            console.log('Something went wrong: ' + jqxhr.status);
          });

      //Loader po wyborze miasta - pobieranie danych z API
      $result.html('<div class="loader"><div class="spinner"></div></div>');
    },

    //wypełnienie templatu
    widgetTemplate: function(response, a){
      var data = response.consolidated_weather;
      //Wypełnienie danych dot. aktualnego dnia(div.row.widget)
      a +=
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
              '<span class="date">'+weather.getWeekday(i)+'</span>'+
              '<span class="temp-bottom">'+Math.round(data[i].the_temp)+'&#176;C<br/></span>'+
              '<img src="https://www.metaweather.com/static/img/weather/'+data[i].weather_state_abbr+'.svg" alt="">'+
            '</div>';
      }
      return a;
    },

    smoothScroll: function(event) {
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
    },

    //Rozwinięcie/zwinięcie menu dla okna mniejszego od 900px
    menu: function() {
      this.$hamburger.on('click', (function() {
          this.$menu.slideToggle( "slow", (function() {
          this.$hamburger.hide();
          this.$cross.show();
        }).bind(this));
      }).bind(this));
      this.$cross.on('click', (function() {
          this.$menu.slideToggle( "slow", (function() {
          this.$cross.hide();
          this.$hamburger.show();
        }).bind(this));
      }).bind(this));
      weather.refreshMenu();
    },

    //Odświeżenie menu po zmianie szerokości okna
    refreshMenu: function(){
      if(window.innerWidth<900){
        weather.$hamburger.show();
        this.$cross.hide();
        this.$menu.hide();
      }else {
        weather.$menu.show();
        this.$hamburger.hide();
        this.$cross.hide();
      }
    }
  };

  weather.init();
  
})();
