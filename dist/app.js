function getWeekday(e){var t=new Date,a=t.getDay()+e,s=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return a>6&&(a-=6),s[a]}function menu(){$(".hamburger").click(function(){$(".menu").slideToggle("slow",function(){$(".hamburger").hide(),$(".cross").show()})}),$(".cross").click(function(){$(".menu").slideToggle("slow",function(){$(".cross").hide(),$(".hamburger").show()})}),refreshMenu()}function refreshMenu(){window.innerWidth<900?($(".hamburger").show(),$(".cross").hide(),$(".menu").hide()):($(".menu").show(),$(".hamburger").hide(),$(".cross").hide())}$(document).ready(function(){var e,t="",a=$(".widget"),s=[2459115,753692,721943,2487956,638242,523920,615702];$.each(a,function(a,i){e=$.getJSON("proxy.php",{c:s[a]},function(e){var s=e.consolidated_weather;for(t='<div class="row"><div class="col-md-12"><h3>'+e.title+'</h3><span class="weather">'+s[0].weather_state_name+'</span><br/><span class="temp">'+Math.round(s[0].the_temp)+'&#176;C</span><img src="https://www.metaweather.com/static/img/weather/'+s[0].weather_state_abbr+'.svg" alt="Weather state"></div></div><div class="row widget-bottom">',a=1;a<=4;a++)t+='<div class="col-xs-3"><span class="date">'+getWeekday(a)+'</span><span class="temp-bottom">'+Math.round(s[a].the_temp)+'&#176;C<br/></span><img src="https://www.metaweather.com/static/img/weather/'+s[a].weather_state_abbr+'.svg" alt=""></div>';i.innerHTML=t+"</div>"})})}),$("#search").on("click",function(){var e=$.trim($("#city").val());if(""!=e){var t=$("#result");t.html('<div class="loader"><div class="spinner"></div></div>'),$("#photoModal").modal("show"),$(this).prop("disabled",!0).css("opacity",.3);var a=encodeURI(e),s=$.getJSON("proxy.php",{city:a},function(e){e.length>0?(t.html(""),$.each(e,function(e,a){t.append('<div class="item-found">'+a.title+"<p>"+a.woeid+"</p></div>")})):(t.html(""),t.append("Nic nie znaleziono :("))}).done(function(){$("#search").prop("disabled",!1).css("opacity",1)}).fail(function(){console.log("Something went wrogn with searchin API: "+s.responseText)})}else $(".notification").toggleClass(" active"),setTimeout(function(){$(".notification").toggleClass(" active")},3e3)}),$("#result").on("click","div.item-found",function(){var e=$(this).children("p").text(),t=$("#result"),a="";t.html('<div class="loader"><div class="spinner"></div></div>');var s=$.getJSON("proxy.php",{c:e},function(e){var t=e.consolidated_weather;for(a='<div class="col-md-4"><div class="widget"><div class="row"><div class="col-md-12"><h3>'+e.title+'</h3><span class="weather">'+t[0].weather_state_name+'</span><br/><span class="temp">'+Math.round(t[0].the_temp)+'&#176;C</span><img src="https://www.metaweather.com/static/img/weather/'+t[0].weather_state_abbr+'.svg" alt="Weather state"></div></div><div class="row widget-bottom">',i=1;i<=4;i++)a+='<div class="col-xs-3"><span class="date">'+getWeekday(i)+'</span><span class="temp-bottom">'+Math.round(t[i].the_temp)+'&#176;C<br/></span><img src="https://www.metaweather.com/static/img/weather/'+t[i].weather_state_abbr+'.svg" alt=""></div>';$("#new").before(a+"</div></div></div>"),$("#photoModal").modal("hide")}).fail(function(){console.log("Something went wrong: "+s.status)});t.html('<div class="loader"><div class="spinner"></div></div>')}),$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(e){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=$(this.hash);t=t.length?t:$("[name="+this.hash.slice(1)+"]"),t.length&&(e.preventDefault(),$("html, body").animate({scrollTop:t.offset().top},1e3,function(){var e=$(t);if(e.focus(),e.is(":focus"))return!1;e.attr("tabindex","-1"),e.focus()}))}}),$(window).resize(refreshMenu),$(document).on("load",menu());