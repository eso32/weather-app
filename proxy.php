<?php

header('Content-Type: application/json');

if(isset($_GET['c'])){
  $c = $_GET['c'];

  $url = 'https://www.metaweather.com/api/location/'.$c.'/';

  $handle = fopen($url, "r");

  if($handle){
    while(!feof($handle)){
      $buffer = fgets($handle, 4096);
      echo $buffer;
    }
    fclose($handle);
  };
} elseif(isset($_GET['city'])) {
  $city = $_GET['city'];

  $url = 'https://www.metaweather.com/api/location/search/?query='.$city;

  $handle = fopen($url, "r");

  if($handle){
    while(!feof($handle)){
      $buffer = fgets($handle, 4096);
      echo $buffer;
    }
    fclose($handle);
  };
}


?>
