
<?php
// echo $_SERVER['HTTP_USER_AGENT'] . "\n\n";
include __DIR__.'/lib/load.php';

?>

    <?php
    // agri::insertUserContactMessage("test","test","test");

// $test = getJsonApis();
// print_r($test);
echo rss::rssFetch();

?>
