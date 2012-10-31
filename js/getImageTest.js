
$(document).ready(function(){
	
	//Do something every 5 seconds
	// setInterval(function() {
	// 	getInstagram();
	// }, 1000);

	//Do something on click
	$("#test_link_button").click(function() {
		getInstagram();
	});

	function getInstagram(){
		var str = 'https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.2943&distance=12000&min_timestamp=1351429688';

		// guys, this is my super secret Instagram client ID
		str = str + '&client_id=ecbef9870b1f4200a72dd0c95fa66941';

		$.getJSON(str+'&callback=?', 
			function(json){ 

				var objects = []; // an array of objects

				$.each(json, function(index, item){
					$.each(item, function(index, v){
						var image = {}; // a new object.
						image.id = v.id; // and its information
						image.link = v.link;
						image.created_time = v.created_time;
						image.tags = v.tags;
						image.images = v.images;

						$('<p>'+v.id+','+v.link+','+v.created_time+','+v.tags+'</p>').appendTo('#results');
						
						objects.push(image); // push image onto objects array
			    	});
			    });

					// // Finally, send your array of objects to the PHP file
					//  $.ajax({
					// 	 url: "http://chancezhao.com/insert.php",
					// 	 type: "POST",
					// 	 data: { objects: objects },
					// 	 cache: false,
					// 	 success: function () {
					// 		 console.log("SUCCESS WOOOOO");
					// 	 }
					//  });
				

				
			}); // end of getJSON
		
	} // end of getInstagram
});
