<?php
	echo "JSON encoding...";
	$str = '[{"a": "new", "b": "new2", "c": "new3" }, {"we": "new", "b":"ewn"}]';
	$new = json_decode($str);
	echo $new[0]->a;
?>

