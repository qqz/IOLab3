<html>
	<head>
	<script src="jquery-latest.min.js"></script>
	<script src="jquery.min.js"></script>

	<script type="text/javascript" src="bootstrap.min.js"></script>
	<link rel=StyleSheet href="../css/bootstrap.css" type="text/css">
	<link rel=StyleSheet href="../css/bootstrap-responsive.css" type="text/css">

	<script type="text/javascript">

		$(document).ready(function(){

			$("#load_button").click(function() {
				loadImages();
			});

			function loadImages(){
			// connect to database with PHP
			<?php

				$dbhost = 'localhost';
				$dbuser = 'chancezh_guest';
				$dbpasswd = 'enter669%';
				$db = "chancezh_iolab3";

				$dbh = mysql_connect($dbhost, $dbuser, $dbpasswd) or die("Unable to connect to SQL server");
				$my_db = @mysql_select_db($db) or die("Unable to select database");


				/* Database query code from:
				 * http://php.net/manual/en/function.mysql-query.php */

				// Select ALL images for now
				$query = sprintf("SELECT * from IMG");
				$result = mysql_query($query);
				
				// ERROR CHECKING
				if (!$result) {
				    $message  = 'Invalid query: ' . mysql_error() . "\n";
				    $message .= 'Whole query: ' . $query;
				    die($message);
				}

				// for each result, add thumbnail picture to the page
				while ($row = mysql_fetch_assoc($result)) { ?>
					$('#images').append("<img src='<?php echo $row['thumbnail_url']; ?>' />");
    				<?	
				}
				
			?>
			}	// end of loadImages
		}); // end of document ready
	</script>
	</head>
	<body>	
		<div>
			<button id="load_button" class="btn btn-info" type="button">Get Images!&amp; &#44;</button>
		</div>
		<div id="images" class="images"></div>
	</body>
</html>
