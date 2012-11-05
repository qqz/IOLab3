<?php

$dbhost = 'localhost';
$dbuser = 'chancezh_guest';
$dbpasswd = 'enter669%';
$db = "chancezh_iolab3";

$dbh = mysql_connect($dbhost, $dbuser, $dbpasswd) or die("Unable to connect to SQL server");
$my_db = @mysql_select_db($db) or die("Unable to select database");

$i=0;
//$objects = json_decode($_REQUEST['objects']);
$objects = $_REQUEST['objects'];
$tags = $_REQUEST['tags'];
/* Code for writing to file
 * http://php.net/manual/en/function.file-put-contents.php */

$file = 'data.txt';
// Open the file to get existing content
$current = file_get_contents($file);
// Append a new person to the file
$current .= stripslashes($objects);
// Write the contents back to the file
file_put_contents($file, $current);

$file2 = 'tags.txt';
// Open the file to get existing content
$current2 = file_get_contents($file2);
// Append a new person to the file
$current2 .= stripslashes($tags);
// Write the contents back to the file
file_put_contents($file2, $current2);




// let's see if json_decode works after stripslashes
// It does!
// Ok, now it doesn't again. Ack.
$obj = json_decode($objects);
//$objects = $_REQUEST['objects'];
	// For each item in the array that we get
	//for ($i = 0; $i < $objects.length; $i++){
		// insert into the database
		/* $query1 = "INSERT INTO IMG(id) VALUES(" + objects[i].id + ")";
		$query2 = "INSERT INTO IMG(created_time) VALUES(" + objects[i].created_time + ")";
		$query3 = "INSERT INTO IMG(text) VALUES(" + objects[i].comments + ")";
		$query4 = "INSERT INTO IMG(url) VALUES(" + objects[i].image_url + ")";
		$query5 = "INSERT INTO IMG(lat) VALUES(" + objects[i].lat + ")";
		$query6 = "INSERT INTO IMG(long) VALUES(" + objects[i].long + ")"; */
		//$image = json_decode($objects[$i])a


		$query1= "INSERT INTO IMG(id, created_time, standard_url, thumbnail_url) VALUES ('". $obj[0]->id ."','". $obj[0]->created_time ."','". $obj[0]->imageURL ."','". $obj[0]->thumbURL .")";
		$query2= "INSERT INTO IMG(id, created_time) VALUES ('". $obj[0]->id ."','". $obj[0]->created_time .")";
		// $query1= "INSERT INTO IMG(id) VALUES ('". $image->id ."')";
		//$query = "INSERT INTO IMG(id) VALUES ('42')";
		//$query = "INSERT INTO IMG(id) VALUES ('NEW VALUE')";
		
		mysql_query($query1) or die(mysql_error());
		mysql_query($query2) or die(mysql_error());
		//mysql_query($query) or die(mysql_error());
		/*
		mysql_query($query1) or die(mysql_error());
		mysql_query($query2) or die(mysql_error());
		mysql_query($query3) or die(mysql_error());
		mysql_query($query4) or die(mysql_error());
		mysql_query($query5) or die(mysql_error());
		mysql_query($query6) or die(mysql_error()); 
		*/		
	//} // end of for

?>
