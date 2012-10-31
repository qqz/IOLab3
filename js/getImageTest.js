
$(document).ready(function(){
	
	// Do something every 5 seconds
	setInterval(function() {
		getInstagram();
	}, 5000);

	function getInstagram(){
		var str = 'https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.2943&distance=12000&min_timestamp=1351429688';

		// guys, this is my super secret Instagram client ID
		str = str + '&client_id=1c221cf65ea740a7b718c08fa798b947';

		$.getJSON(str+'&callback=?', 
			function(json){ 

				// LOG the object returned by the API
				console.log(json);
				
			}); // end of getJSON
		
	} // end of getInstagram
});
