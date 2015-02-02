<?php
	$data = json_decode(file_get_contents("php://input"));
    $name = $data->name;
    $email = $data->email;
    
    $to="info@iwct-uk.org";
    $subject="Newsletter request";
    $message="Name: ".$name." \r\nEmail: ".$email."\r\n";
    
    // In case any of our lines are larger than 70 characters, we should use wordwrap()
    $message = wordwrap($message, 70, "\r\n");
    
    mail($to,$subject,$message);
?>