function getWeekday(e){var t=new Date,a=new Array(7),s=t.getDay()+e;return a[0]="Sunday",a[1]="Monday",a[2]="Tuesday",a[3]="Wednesday",a[4]="Thursday",a[5]="Friday",a[6]="Saturday",s>6&&(s-=6),a[s]}function menu(){$(".hamburger").click(function(){$(".menu").slideToggle("slow",function(){$(".hamburger").hide(),$(".cross").show()})}),$(".cross").click(function(){$(".menu").slideToggle("slow",function(){$(".cross").hide(),$(".hamburger").show()})}),refreshMenu()}function refreshMenu(){window.innerWidth<900?(console.log("lol"),$(".hamburger").show(),$(".cross").hide(),$(".menu").hide()):(console.log("lol2"),$(".menu").show(),$(".hamburger").hide(),$(".cross").hide())}$(document).ready(function(){var e,t;url="proxy.php",$fixedWidgets=$(".widget"),woeIDs=[2488853,2488042,2455920,2487956,23511744,523920,615702],$.each($fixedWidgets,function(a,s){e=$.getJSON(url,{c:woeIDs[a]},function(e){var i=e.consolidated_weather;for(t='<div class="row"><div class="col-md-12"><h3>'+e.title+'</h3><span class="weather">'+i[0].weather_state_name+'</span><br/><span class="temp">'+Math.round(i[0].the_temp)+'&#176;C</span><img src="https://www.metaweather.com/static/img/weather/'+i[0].weather_state_abbr+'.svg" alt=""></div></div><div class="row widget-bottom">',a=1;a<=4;a++)t+='<div class="col-xs-3"><span class="date">'+getWeekday(a)+'</span><span class="temp-bottom">'+Math.round(i[a].the_temp)+'&#176;C<br/></span><img src="https://www.metaweather.com/static/img/weather/'+i[a].weather_state_abbr+'.svg" alt=""></div>';s.innerHTML=t+"</div>"})})}),$("#search").on("click",function(){$("#result").html('<div class="loader"><div class="spinner"></div></div>'),$("#photoModal").modal("show"),$(this).prop("disabled",!0).css("opacity",.3);var e=encodeURI($("#city").val());$.getJSON("proxy.php",{city:e},function(e){e.length>0?($("#result").html(""),$.each(e,function(e,t){$("#result").append('<div class="item-found">'+t.title+"<p>"+t.woeid+"</p></div>")})):($("#result").html(""),$("#result").append("Nic nie znaleziono :("))}).done(function(){$("#search").prop("disabled",!1).css("opacity",1)}).fail(function(){})}),$("#result").on("click","div.item-found",function(){var e=$(this).children("p").text();$("#result").html('<div class="loader"><div class="spinner"></div></div>');$.getJSON("proxy.php",{c:e},function(e){var t=e.consolidated_weather;for(a='<div class="col-md-4"><div class="widget"><div class="row"><div class="col-md-12"><h3>'+e.title+'</h3><span class="weather">'+t[0].weather_state_name+'</span><br/><span class="temp">'+Math.round(t[0].the_temp)+'&#176;C</span><img src="https://www.metaweather.com/static/img/weather/'+t[0].weather_state_abbr+'.svg" alt=""></div></div><div class="row widget-bottom">',i=1;i<=4;i++)a+='<div class="col-xs-3"><span class="date">'+getWeekday(i)+'</span><span class="temp-bottom">'+Math.round(t[i].the_temp)+'&#176;C<br/></span><img src="https://www.metaweather.com/static/img/weather/'+t[i].weather_state_abbr+'.svg" alt=""></div>';$("#new").before(a+"</div></div></div>"),$("#photoModal").modal("hide")});$("#result").html(""),$("#result").html('<div class="loader"><div class="spinner"></div></div>')}),$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(e){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=$(this.hash);t=t.length?t:$("[name="+this.hash.slice(1)+"]"),t.length&&(e.preventDefault(),$("html, body").animate({scrollTop:t.offset().top},1e3,function(){var e=$(t);if(e.focus(),e.is(":focus"))return!1;e.attr("tabindex","-1"),e.focus()}))}}),$(window).resize(refreshMenu),$(document).on("load",menu());