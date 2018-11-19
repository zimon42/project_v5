<?php
include_once("VoteHandler.php");
include_once("PollHandlerDb.php");

$numVats = PollHandlerDb::getNumVats();
$numVotes = 100;

/*

// Algorithm 1

for ($v=0; $v<$numVotes; $v++) {

    $valsArr = array();

    for ($i=0; $i<$numVats; $i++) {
        $val = array(
            "val" => rand(2,32),
            "id" => $i+1
        );
        array_push($valsArr, $val);
    }

    VoteHandler::addVote($valsArr);

}
*/

// Algorithm 2: Calculate total start percentages, and then distribute one perc 
// every iteration to a random vat

// Calculate total perc
$vats = PollHandlerDb::loadVats();
$totalPerc = 0;
for ($i=0; $i<$numVats; $i++) {
    $totalPerc += $vats[$i]->startPerc;
}
echo "Total start perc: ".$totalPerc."<br>";

// Iterate votes
for ($v=0; $v<$numVotes; $v++) {

    // Create random arr
    $randArr = array();

    // Initialize random arr
    for ($r=0; $r<$numVats; $r++) {
        $randArr[$r] = 0;
    }

    // Iterate total perc
    for ($t=0; $t<$totalPerc; $t++) {
        $rand_i = rand(0,$numVats-1);
        $randArr[$rand_i]++;
    }

    // Set vals
    $valsArr = array();
    for ($i=0; $i<$numVats; $i++) {
        $val = array(
            "val" => $randArr[$i],
            "id" => $i+1
        );
        array_push($valsArr,$val);
    }

    VoteHandler::addVote($valsArr);

}


echo "Added ".$numVotes." votes";

?>