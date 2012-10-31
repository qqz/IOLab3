
$(document).ready(function(){
	var max_timestamp = 1351699260; // 11:01:00 AM
	var min_timestamp = 1351699200; // 11:00:00 AM
	var client_id = '&client_id=ecbef9870b1f4200a72dd0c95fa66941';

	//Do something every 5 seconds
	var timer = setInterval(function() {
		getInstagram(min_timestamp, max_timestamp);
	}, 1000);

	//Do something on click
	$("#test_link_button").click(function() {
		clearInterval(timer);
	});

	function getInstagram(minT, maxT){
		var request = 'https://api.instagram.com/v1/media/search?lat=37.786403&lng=-122.405033&distance=1800&'+client_id+'&min_timestamp='+minT+'&max_timestamp='+maxT;
		
		min_timestamp += 60; // increments by 60s.
		max_timestamp += 60;

		$.getJSON(request+'&callback=?', 
			function(json){ 

				var objects = []; // an array of objects

				for (var i = 0;i<json.data.length;i++) {

					var image = {}; // a new object.
						image.id = json.data[i].id; // and its information
						image.link = json.data[i].link;
						image.created_time = json.data[i].created_time;
						image.tags = json.data[i].tags;
						image.thumbURL = json.data[i].images.thumbnail.url;
						image.imageURL = json.data[i].images.standard_resolution.url;

						console.log(image);

						objects.push(image); // push image onto objects array
				};

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
