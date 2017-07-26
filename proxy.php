<?php

header('Content-Type: application/json');

$c = $_GET['c'];

$url = 'https://www.metaweather.com/api/location/'.$c.'/';

$handle = fopen($url, "r");

if($handle){
  while(!feof($handle)){
    $buffer = fgets($handle, 4096);
    echo $buffer;
  }
  fclose($handle);
}

// echo $c;
// echo json_encode($data);
//
// if($_GET['a'] == "ble"){
//   echo "{Cześć szefie!}";
// } else {
//   echo "Siema plebie!";
// }

?>
