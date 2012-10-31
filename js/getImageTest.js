
$(document).ready(function(){
	
	// Do something every 5 seconds
	setInterval(function() {
		getInstagram();
	}, 1000);

	function getInstagram(){
		var str = 'https://api.instagram.com/v1/media/search?lat=37.786403&lng=-122.405033&distance=1800&min_timestamp=1351656000';

		// guys, this is my super secret Instagram client ID
		str = str + '&client_id=1c221cf65ea740a7b718c08fa798b947';

		$.getJSON(str+'&callback=?', 
			function(json){ 
				$.each(json, function(index, item){

					$.each(item, function(index, v){
						console.log(v);
						$('<p>'+v.id+','+v.link+','+v.created_time+'</p>').appendTo('#results');
			    	});
			    });
				
			}); // end of getJSON
		
	} // end of getInstagram
});
