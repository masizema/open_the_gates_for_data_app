<?php
//php http://php.net/manual/en/function.mail.php
$name = $_POST["name"];
$message = $_POST["name"];
$email = $_POST["name"];
$msg = wordwrap($message,70);
//masizema@student.arteveldehs.be
// send email
mail("masizema@student.arteveldehs.be","Contact form",$msg);

//redirect back
header("Location: {$_SERVER['HTTP_REFERER']}");
exit;
