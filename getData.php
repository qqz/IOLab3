<?php


$start_time = $_REQUEST['start_time'];

// database
	$dbhost = 'localhost';
	$dbuser = 'chancezh_guest';
	$dbpasswd = 'enter669%';
	$db = "chancezh_iolab3";

	$dbh = mysql_connect($dbhost, $dbuser, $dbpasswd) or die("Unable to connect to SQL server");
	$my_db = @mysql_select_db($db) or die("Unable to select database");

	// Select ALL images for now
	//$query = sprintf("SELECT * from images where created_time>'".$start_time."' LIMIT 200");
	$query = sprintf("SELECT * from images WHERE created_time>='".$start_time."' ORDER BY  `images`.`created_time` ASC LIMIT 200");

	$result = mysql_query($query);
				
	// ERROR CHECKING
	if (!$result) {
	    $message  = 'Invalid query: ' . mysql_error() . "\n";
	    $message .= 'Whole query: ' . $query;
	    die($message);
	}


	$json = array();
	$json['rows'] = array();


	$i = 0; // row number
	while ($row = mysql_fetch_assoc($result)) {
		$json['rows'][$i] = array();

		$json['rows'][$i]['image_id'] = $row['id']; 
		$json['rows'][$i]['created_time'] = $row['created_time']; 
		$json['rows'][$i]['standard_url'] = $row['standard_url']; 
		$json['rows'][$i]['thumbnail_url']= $row['thumbnail_url'];
		$json['rows'][$i]['like_count'] = $row['like_count']; 
		$json['rows'][$i]['comment_count'] = $row['comment_count'];

		$i++; // increment row
		
	}
	header("Content-Type: application/json", true);

	$json_send = json_encode($json);
	echo $json_send;
	//die($json_send);

?>
