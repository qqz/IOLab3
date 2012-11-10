var min_timestamp = 1351699200; // 11:00:00 AM Eastern
var max_timestamp = 1351699260; // 11:01:00 AM Eastern
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

	$.getJSON(request+'&callback=?', 
		function(json){ 
			console.log(json);
			var objects = []; // an array of objects

			for (var i = 0;i<json.data.length;i++) {
				var image = {}; // a new object.
				image.id = json.data[i].id; // and its information
				image.created_time = json.data[i].created_time;
				image.tags = json.data[i].tags; // tags
				image.link = json.data[i].link; // Instagram URL
				image.thumbURL = json.data[i].images.thumbnail.url; // 150x150
				image.imagelowURL = json.data[i].images.low_resolution.url; // 306x306
				image.imageURL = json.data[i].images.standard_resolution.url; // 612x612
				image.likes = json.data[i].likes.count; // likes count
				image.comments = json.data[i].comments.count; //comments count

				// Pull out individual tags from each image's tagset
				for (var n = 0; n < image.tags.length ; n++){
					var tag = {};
					tag.id = image.id;
					tag.name = image.tags[n];
					$('<p>'+tag.id+','+tag.name+'</p>').appendTo('#tags');
				};

				// Append image info
				$('<p><strong>'+image.id+'</strong>,<em>'+image.created_time+'</em>,'+image.link+','+image.thumbURL+','+image.imagelowURL+','+image.imageURL+','+image.likes+','+image.comments+'</p>').appendTo('#images');


				objects.push(image); // push image onto objects array
			};
			
		}); // end of getJSON
	
	min_timestamp += 60; // increments by 60s.
	max_timestamp += 60;

} // end of getInstagram

