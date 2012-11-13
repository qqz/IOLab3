<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Test Img Gallery</title>

    <link type="text/css" rel="stylesheet" media="all" href="css/jquery-ui-1.9.1.custom.css">
    <link type="text/css" rel="stylesheet" media="all" href="css/bootstrap.css">
    <link type="text/css" rel="stylesheet" media="all" href="css/main.css">
 
</head>

<body>
	<div class="container">
		<div class="tag-box">
			<strong>Tag filters</strong>
			<ul id="tag-list">
				<li>#tag1</li>
				<li>#tag2</li>
			</ul>
		</div>
		<header role="banner" class="header">
			<nav>
					<div class="nav" id="slider"></div>
	                <div id="time">Current Time</div>
	                <div id="tag-button">Top Tags</div>
			</nav>
		</header>
		<div class="masthead">
			<img src="assets/sf-giants-logo.png" alt="SF Giants Logo" width="457" height="246">
		</div>

		<div id="image-container">
		</div>

		<div class="modal" id="img-modal">
		  <img src=''>
		  <div class="description">
		    <h1>Top Tags</h1>
		    <ul class="tag-list">
		    	<li>tag1</li>
		    	<li>tag2</li>
		    </ul>
		  </div>
		</div>

	</div>
</body>
 <script src="js/jquery-latest.min.js"></script>
 <script src="js/jquery-ui-1.9.1.custom.min.js"></script>
 <script src="js/lazy-load.js" type="text/javascript"></script>
 <script src="js/modal.min.js" type="text/javascript"></script>
 <script src="js/testGallery.js" type="text/javascript"></script>
	<script type="text/javascript">
		$(document).ready(function() {

			loadFromDB(1351699200);
			function loadFromDB(start_time){
				start_time = start_time || "1351699200";
				var col_counter = 0;
				var col_count_mod = 4; // 4 per column, +1
				var row_counter = 0;
			
			// connect to database with PHP
			<?php

				$dbhost = 'localhost';
				$dbuser = 'chancezh_guest';
				$dbpasswd = 'enter669%';
				$db = "chancezh_iolab3";

				$dbh = mysql_connect($dbhost, $dbuser, $dbpasswd) or die("Unable to connect to SQL server");
				$my_db = @mysql_select_db($db) or die("Unable to select database");
				//$startTime = echo "<script>document.write(Gstart);</script>";
				// Database query code from:
				// http://php.net/manual/en/function.mysql-query.php 

				// Select ALL images for now
				$query = sprintf("SELECT * from images WHERE created_time > '1351699200' LIMIT 1000");
				$result = mysql_query($query);
				
				// ERROR CHECKING
				if (!$result) {
				    $message  = 'Invalid query: ' . mysql_error() . "\n";
				    $message .= 'Whole query: ' . $query;
				    die($message);
				}

				// for each result, add thumbnail picture to the page
				while ($row = mysql_fetch_assoc($result)) { ?>

					// for every four columns we want to create new row-fluid
					if (col_counter % col_count_mod == 0){
						// create new row-fluid div

						row_counter++;
						$('#image-container').append('<div class="row-fluid" id="row'+row_counter+'"></div>');
					}
					
					var row_div = '#row' + row_counter;

				$(row_div).append('<div class="img-wrapper span3"><span class="img-id"><?php echo $row['id']; ?></span><span class="standard-url"><?php echo $row['standard_url']; ?></span><span class="created_time"><?php echo $row['created_time']; ?></span><a id="open-modal" href="#"><span class="img-tag">#SF Parade</span><img class="img-polaroid lazy" src="assets/blank.gif" data-original="<?php echo $row['thumbnail_url']; ?>" width="160" height="160"><ul class="img-stats"><li class="stat-likes"><b><span><?php echo $row['like_count']; ?></span></b></li><li class="stat-comments"><b><span><?php echo $row['comment_count']; ?></span></b></li></ul></a></div>');
				col_counter++;

    				<?	
				} // end of while			
			?>
			
			}	// end of loadFromDB
			 
			// loadImages used to start here
		 		$("img.lazy").lazyload({
			     		effect: "fadeIn"
				});

		 	//create modal
			$(".img-wrapper").click(function(e) {
				var id = $(this).children('.img-id').text();
				var url = $(this).children('.standard-url').text();
				console.log(id);
				console.log(url);
				$('#img-modal img').attr('src', url);
				//PHP pass id to db, and get tags

				$("#img-modal").mikesModal();
				return false;
			  });
			
		 	// Img hover effect
			$(".img-wrapper img").on({
				mouseenter: function () {
					$(this).addClass(pickClass());
				},
			  	mouseleave: function () {
					$(this).removeClass("img-hover1 img-hover2");
				}
			});

			function pickClass() {
				var a = [0,1];
		 		var b = Randomize(a);
		 		var c = '';
		 		if (b[0]==0){
		 			c = 'img-hover1';
		 		}else{
		 			c = 'img-hover2';
		 		}return c;
			};

			function Randomize(arr) {
		   	for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
			return arr;
		   };

		 });
	</script>
</html>
