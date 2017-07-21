$(document).ready(function(){

	var skycons = new Skycons({"color": "#000"});
  // on Android, a nasty hack is needed: {"resizeClear": true}

  // you can add a canvas by it's ID...
  skycons.add("weather-icon", Skycons.PARTLY_CLOUDY_DAY);

  // start animation!
  skycons.play();


	function getWeatherInfo(){
		var uri = "https://api.darksky.net/forecast/e3d851489bc8e6c05e3debb0dcddeff5/37.8267,-122.4233";
		$.get(uri, function(result){

			console.log(result.summary);
		});

	}
	$(".weather-btn").on("click",function(){
		getWeatherInfo();
	});
});