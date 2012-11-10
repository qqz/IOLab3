<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Test Img Gallery</title>

    <link type="text/css" rel="stylesheet" media="all" href="css/bootstrap.css">
    <link type="text/css" rel="stylesheet" media="all" href="css/main.css">
 
</head>

<body>
	<div class="container">
		<ul id="nav-right">
			<li><a href=""><img src="assets/nav-dot.png" alt="Link"></a></li>
			<li><a href=""><img src="assets/nav-dot.png" alt="Link"></a></li>
			<li><a href=""><img src="assets/nav-dot.png" alt="Link"></a></li>
			<li><a href=""><img src="assets/nav-dot.png" alt="Link"></a></li>
		</ul>
		<header role="banner" class="header">
			<nav>
				<ul class="nav" id="nav">
					<li><a href=""><img src="assets/nav-dot.png" alt="Link"></a></li>
					<li><a href=""><img src="assets/nav-dot.png" alt="Link"></a></li>
					<li><a href=""><img src="assets/nav-dot.png" alt="Link"></a></li>
					<li><a href=""><img src="assets/nav-dot.png" alt="Link"></a></li>
               </ul>
			</nav>
		</header>
		<div class="masthead">
			<img src="assets/sf-giants-logo.png" alt="SF Giants Logo" width="457" height="246">
		</div>

		<div id="image-wrapper">
		<div class="row-fluid">
			<div class="img-wrapper span3">
				<a id="open-modal" href="#">
					<span class="img-tag">#SF Parade</span>
					<img class="img-polaroid lazy" src="assets/blank.gif" data-original="http://distilleryimage10.s3.amazonaws.com/703cae38ff5711e182e122000a1de761_6.jpg" width="160" height="160">
					<ul class="img-stats">
						<li class="stat-likes"><b><span>2</span></b></li>
						<li class="stat-comments"><b><span>0</span></b></li>
					</ul>
				</a>
			</div>
			<div class="img-wrapper span3">
				<a href="#instagram-link" target="_blank">
					<span class="img-tag">#Go Giants</span>
					<img class="img-polaroid lazy" src="assets/blank.gif" data-original="http://distilleryimage9.s3.amazonaws.com/17540238017511e28a0c22000a1e9e6b_6.jpg" width="160" height="160">
					<ul class="img-stats">
						<li class="stat-likes"><b><span>2</span></b></li>
						<li class="stat-comments"><b><span>0</span></b></li>
					</ul>
				</a>
			</div>
			<div class="img-wrapper span3">
				<a href="#instagram-link" target="_blank">
					<span class="img-tag">#SF Giants</span>
					<img class="img-polaroid lazy" src="assets/blank.gif" data-original="http://distilleryimage4.s3.amazonaws.com/42b986d8ffb211e18c8422000a1cbdd4_6.jpg" width="160" height="160">
					<ul class="img-stats">
						<li class="stat-likes"><b><span>2</span></b></li>
						<li class="stat-comments"><b><span>0</span></b></li>
					</ul>
				</a>
			</div>

			<div class="img-wrapper span3">
				<a href="#instagram-link" target="_blank">
					<span class="img-tag">#Player1</span>
					<img class="img-polaroid lazy" src="assets/blank.gif" data-original="http://distillery.s3.amazonaws.com/media/2011/10/29/a0cfc1c9f7bf4a678fc9b31943e59d9b_6.jpg" width="160" height="160">
					<ul class="img-stats" width="160" height="160">
						<li class="stat-likes"><b><span>2</span></b></li>
						<li class="stat-comments"><b><span>0</span></b></li>
					</ul>
				</a>
			</div>
		</div>
		</div>

		<div class="modal" id="myModal">
		  <img src='http://distilleryimage10.s3.amazonaws.com/703cae38ff5711e182e122000a1de761_7.jpg'>
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
 <script src="js/lazy-load.js" type="text/javascript"></script>
 <script src="js/modal.min.js" type="text/javascript"></script>
	<script type="text/javascript">
		$(document).ready(function() {

			
			loadFromDB();
			function loadFromDB(){
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


				// Database query code from:
				// http://php.net/manual/en/function.mysql-query.php 

				// Select ALL images for now
				$query = sprintf("SELECT * from images LIMIT 100");
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
						$('#image-wrapper').append('<div class="row-fluid" id="row'+row_counter+'"></div>');
						console.log("Row incremented: ");
						console.log(row_counter);
					}
					
					var row_div = '#row' + row_counter;
					console.log("row_div id #........");
					console.log(row_div);
					console.log("row count....");
					console.log(row_counter);
					console.log("column count...");
					console.log(col_counter);

				$(row_div).append('<div class="img-wrapper span3"><a id="open-modal" href="#"><span class="img-tag">#SF Parade</span><img class="img-polaroid lazy" src="assets/blank.gif" data-original="<?php echo $row['thumbnail_url']; ?>" width="160" height="160"><ul class="img-stats"><li class="stat-likes"><b><span><?php echo $row['like_count']; ?></span></b></li><li class="stat-comments"><b><span><?php echo $row['comment_count']; ?></span></b></li></ul></a></div>');
				col_counter++;

    				<?	
				} // end of while			
			?>
			
			}	// end of loadFromDB
			 
			// loadImages used to start here
		 		$("img.lazy").lazyload({
			     		effect: "fadeIn"
				});
			

			$(".img-wrapper img").on({
				mouseenter: function () {
					$(this).addClass(pickClass());
				},
			  	mouseleave: function () {
					$(this).removeClass("img-hover1 img-hover2");
				}
			});

			  $("#open-modal").click(function(e) {
			      $("#myModal").mikesModal();
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
