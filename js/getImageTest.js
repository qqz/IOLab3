
$(document).ready(function(){
	
	// when Test Link button is clicked, call testLink
	$('#test_link_button').on('click', testLink);

	// if button is clicked, test the link
	function testLink(){
		
		var str = $('#link').val();
		console.log(str);

		// guys, this is my super secret Instagram client ID
		str = str + '&client_id=1c221cf65ea740a7b718c08fa798b947';

		$.getJSON(str+'&callback=?', 
			function(json){ 

				// LOG the object returned by the API
				console.log(json);
			}); // end of getJSON
	} // end of testLink
});
