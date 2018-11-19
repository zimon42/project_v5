<?php

include_once("VoteHandlerDb.php");
include_once("PollHandlerDb.php");
include_once("Vote.php");
include_once("VoteVat.php");

class GetHistoryHandler {

    public static function handle() {
        // echo "Hello world!";
        $voteArr = VoteHandlerDb::loadVotes();
        $returnArr = array();

        for ($i=0; $i<count($voteArr); $i++) {
            $vote = $voteArr[$i];

            $returnVote = array();
            $returnVote["date"] = $vote->voteDate;

            $voteVatArr = VoteHandlerDb::loadVoteVats($vote->id);
            $voteVatReturnArr = array();

            for ($j=0; $j<count($voteVatArr); $j++) {
                $voteVat = $voteVatArr[$j];
                $vat = PollHandlerDb::loadVat($voteVat->vatId);
                $returnVoteVat = array();
                $returnVoteVat["val"] = $voteVat->perc;
                $returnVoteVat["title"] = $vat->title;
                $returnVoteVat["color"] = $vat->color;
                array_push($voteVatReturnArr, $returnVoteVat);
            }        

            $returnVote["vote_vats"] = $voteVatReturnArr;  
            array_push($returnArr, $returnVote);

        }

        echo json_encode($returnArr);

    }

}
?>