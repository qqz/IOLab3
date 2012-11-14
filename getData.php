<?php

$start_time = $_REQUEST['start_time'];
 
// database
	$dbhost = 'localhost';
	$dbuser = 'chancezh_guest';
	$dbpasswd = 'enter669%';
	$db = "chancezh_iolab3";

	$dbh = mysql_connect($dbhost, $dbuser, $dbpasswd) or die("Unable to connect to SQL server");
	$my_db = @mysql_select_db($db) or die("Unable to select database");

	//$query = sprintf("SELECT * from images where created_time>'".$start_time."' LIMIT 200");
	$query = sprintf("SELECT * from images WHERE created_time>='".$start_time."' ORDER BY  `images`.`created_time` ASC LIMIT 200");
	$query2 = sprintf("SELECT * FROM top_tags_by_interval WHERE created_time='".$start_time."' ORDER BY `top_tags_by_interval`.`frequency` DESC LIMIT 15");

	$result = mysql_query($query);
	$result2 = 	mysql_query($query2);			
	// ERROR CHECKING
	if (!$result) {
	    $message  = 'Invalid query: ' . mysql_error() . "\n";
	    $message .= 'Whole query: ' . $query;
	    die($message);
	}


	$json = array();
	$json['rows'] = array();
	$json['tags'] = array();


	$i = 0; // row number for images
	$j = 0; // row number for tags array

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
	while ($tag_row = mysql_fetch_assoc($result2)) {
		$json['tags'][$j] = array();

		$json['tags'][$j]['tagname'] = $tag_row['tagname']; 
		$json['tags'][$j]['frequency'] = $tag_row['frequency']; 

		$j++; // increment row
		
	}

	$json_send = json_encode($json);
	echo $json_send;

?>
