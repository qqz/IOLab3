
$(document).ready(function(){
	var max_timestamp = 1351699260; // 11:01:00 AM
	var min_timestamp = 1351699200; // 11:00:00 AM
	var client_id = '&client_id=ecbef9870b1f4200a72dd0c95fa66941';
	var objects = []; // an array of objects
	var alltags = [];

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

				console.log(json);
				for (var i = 0;i<json.data.length;i++) {

						var image = {}; // a new object.
						image.id = json.data[i].id; // and its information
						image.link = json.data[i].link;
						image.created_time = json.data[i].created_time;
						// image.tags = json.data[i].tags;
						image.thumbURL = json.data[i].images.thumbnail.url;
						image.imageURL = json.data[i].images.standard_resolution.url;

						// Store tag array in separate object
						for (var n=0; n< json.data[i].tags.length; n++){
							var tag = {};
							tag.id = json.data[i].id;
							tag.name = json.data[i].tags[n];
							alltags.push(tag);
						}

						var imageString = JSON.stringify(image);
						console.log(imageString);
						objects.push(image);
				}

			}); // end of getJSON
		ajax();
	} // end of getInstagram

	// send array of objects to PHP file
	function ajax(){
		console.log("AJAX CALLED...");
		var obj = JSON.stringify(objects);
		console.log("Stringified...");
		console.log(obj);

		var tags = JSON.stringify(alltags);
		console.log("Tags...");
		console.log(tags);

		  $.ajax({
			 url: "http://chancezhao.com/iolab3/js/insert.php",
			 type: "POST",
			 data: { objects: obj, tags: tags},
			 cache: false,
			 success: function () {
				 console.log("SUCCESS yay");
			 }
		  });
	} // end of ajax
});
