var max_timestamp = 1351699260; // 11:01:00 AM Eastern
var min_timestamp = 1351699200; // 11:00:00 AM Eastern
var client_id = '&client_id=ecbef9870b1f4200a72dd0c95fa66941';

$(document).ready(function(){

	//Stop fetching data
	$("#test_link_button").click(function() {
		clearInterval(timer);
	});

	//Iteratively Make requests
	var timer = setInterval(function() {
		getInstagram(min_timestamp, max_timestamp);
	}, 1000);
});

//pull images from Instagram
function getInstagram(minT, maxT){
	var request = 'https://api.instagram.com/v1/media/search?lat=37.786403&lng=-122.405033&distance=1800&'+client_id+'&min_timestamp='+minT+'&max_timestamp='+maxT;

	min_timestamp += 60; // increments by 60s.
	max_timestamp += 60;
	console.log('new min: '+min_timestamp);
	console.log('new max: '+max_timestamp);


	$.getJSON(request+'&callback=?', 
		function(json){ 

			var objects = []; // an array of objects

			for (var i = 0;i<json.data.length;i++) {

				var image = {}; // a new object.
				image.id = json.data[i].id; // and its information
				image.created_time = json.data[i].created_time;
				image.link = json.data[i].link;
				image.tags = json.data[i].tags;
				image.thumbURL = json.data[i].images.thumbnail.url;
				image.imageURL = json.data[i].images.standard_resolution.url;

				$('<p>'+image.id+',<strong>'+image.created_time+'</strong>,'+image.link+','+image.thumbURL+','+image.imageURL+'</p>').appendTo('#images');
				$('<p>'+image.id+','+image.tags+'</p>').appendTo('#tags');
				objects.push(image); // push image onto objects array
			};

			// Finally, send your array of objects to the PHP file
			 // $.ajax({
				//  url: "http://chancezhao.com/insert.php",
				//  type: "POST",
				//  data: { objects: objects },
				//  cache: false,
				//  success: function () {
				// 	console.log("SUCCESS WOOOOO");
				//  }
			 // });
			
		}); // end of getJSON

} // end of getInstagram

