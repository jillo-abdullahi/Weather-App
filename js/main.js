$(document).ready(function(){

	
	//Button on click to hide some stuff and show some other stuff :)
	$("#getWeatherBtn").on("click", function(){
		$("#weather-content").css("display","inline");
		$(".landing-page").css("display","none");

		getWeatherInfo();
	});

	//Get current date and time from Moment:

	$("#date").html( moment().format('MMMM Do YYYY, h:mm a') );
	$("#day").html(moment().format('dddd') );

	function getWeatherInfo(){

		//Get location
		var lat;
		var longi;

		var options = {
  			enableHighAccuracy: true,
  			timeout: 5000,
  			maximumAge: 0
			};

		function success(pos) {
  			var crd = pos.coords;
  			lat = crd.latitude;
  			longi = crd.longitude;

  			//Setting up some variables for use later
			var key = "d46c15efe644412da4c135215172007";
			var coords = lat+","+longi;
			var weatheruri = "https://api.apixu.com/v1/current.json?key="+key+"&q="+coords;
			var forecasturi = "https://api.apixu.com/v1/forecast.json?key="+key+"&q="+coords+"&days=5";

			//Ajax call for current weather
			$.getJSON(weatheruri, function(info){
				console.log(info.current.temp_c);

				//setting up variables.
				var region = info.location.region+", "+info.location.country;
				var temp_c = info.current.temp_c;
				var temp_f = info.current.temp_f;
				var windspeed = info.current.wind_mph;
				var icon = "https:"+info.current.condition.icon;
				var description = info.current.condition.text;
				var pressure = info.current.pressure_mb;
				var humidity = info.current.humidity;

				//Displaying info
				$("#region").text(region);
				$("#temp_c").html(temp_c+"<span>&#8451;</span>");
				$("#conversion-btn").on("click",function(){

					$("#temp_c").html(temp_f+"<span>&#8457;</span>");
				});

				$("#temp-icon").attr('src',icon);
				$("#description").text(description);
				$("#winds").text(windspeed);
				$("#hum").text(humidity);
				$("#pres").text(pressure);

				
			});

			//Ajax call for forecast conditions
			$.getJSON(forecasturi, function(weather){

			//Setting header variables for forecast days
				var day1 = moment().add(1, 'd').format('dddd');
				var day2 = moment().add(2, 'd').format('dddd');
				var day3 = moment().add(3, 'd').format('dddd');
				var day4 = moment().add(4, 'd').format('dddd');

			//Grabbing items from json file
				//icons
				var icon1 = "https:"+weather.forecast.forecastday[1].day.condition.icon;
				var icon2 = "https:"+weather.forecast.forecastday[2].day.condition.icon;			
				var icon3 = "https:"+weather.forecast.forecastday[3].day.condition.icon;			
				var icon4 = "https:"+weather.forecast.forecastday[4].day.condition.icon;
				
				//max temperature
				var temp1 = weather.forecast.forecastday[1].day.maxtemp_c;
				var temp2 = weather.forecast.forecastday[2].day.maxtemp_c;
				var temp3 = weather.forecast.forecastday[3].day.maxtemp_c;
				var temp4 = weather.forecast.forecastday[4].day.maxtemp_c;

			//Displaying info
				//Setting forecast days
				$("#day1").text(day1);
				$("#day2").text(day2);
				$("#day3").text(day3);
				$("#day4").text(day4);

				//Setting icons
				$("#icon1").attr('src',icon1);
				$("#icon2").attr('src',icon2);
				$("#icon3").attr('src',icon3);
				$("#icon4").attr('src',icon4);

				//maximum forecast temperatures
				$("#temp1").html(temp1+"<span>&#8451;<span>");
				$("#temp2").html(temp2+"<span>&#8451;<span>");
				$("#temp3").html(temp3+"<span>&#8451;<span>");
				$("#temp4").html(temp4+"<span>&#8451;<span>");

			
			});

			};//End of success function

			function error(err) {
			  console.warn(`ERROR(${err.code}): ${err.message}`);
			};

			//Possible errors to cater for:
			//Timeout expired
			//Undefined

			navigator.geolocation.getCurrentPosition(success, error, options);

		

		

	}
	
});