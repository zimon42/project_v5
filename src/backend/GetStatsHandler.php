<?php

include_once("VoteHandlerDb.php");
include_once("PollHandlerDb.php");

class GetStatsHandler {

    public static function handle() {
        
        $vats = PollHandlerDb::loadVats();
        $numVats = PollHandlerDb::getNumVats();                
        $voteArr = VoteHandlerDb::loadVotes();
        $perc_arr = array();

        // Create percent array for stats mode
        for ($i=0; $i<$numVats; $i++) {	            
            
            // Sum all votes for vat $i
            $sum = 0;
            for ($j=0; $j<count($voteArr); $j++) {
                $vote = $voteArr[$j];
                $voteVatArr = VoteHandlerDb::loadVoteVats($vote->id);
                $voteVat = $voteVatArr[$i]; // <-- OBS i not j
                $sum += $voteVat->perc;
            }
            
            $avg = $sum/count($voteArr);
            $perc_arr[$i] = round($avg);
        }	     

        // Get diagram data
        $returnArr = array();
        $voteVatsArr = array();
        for ($i=0; $i<$numVats; $i++) {
            $vat = $vats[$i];
            $valArr = array();
            $valArr["val"] = $perc_arr[$i];
            $valArr["title"] = $vat->title;
            $valArr["color"] = $vat->color;
            array_push($voteVatsArr, $valArr);
        }
        $returnArr["vote_vats"] = $voteVatsArr;
        $returnArr["num_votes"] = count($voteArr);
        echo json_encode($returnArr);

    }

}

?>