<?php

$image_id = $_REQUEST['image_id'];


// database
	$dbhost = 'localhost';
	$dbuser = 'chancezh_guest';
	$dbpasswd = 'enter669%';
	$db = "chancezh_iolab3";

	$dbh = mysql_connect($dbhost, $dbuser, $dbpasswd) or die("Unable to connect to SQL server");
	$my_db = @mysql_select_db($db) or die("Unable to select database");

	// Select tags for this image
	$query = sprintf("SELECT * from tags where id='".$image_id. "'");
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
		$json['rows'][$i]['tagname'] = $row['tagname']; 

		$i++; // increment row
		
	}

	$json_send=json_encode($json);
	echo $json_send;
?>
