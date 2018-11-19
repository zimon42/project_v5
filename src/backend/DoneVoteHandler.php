<?php

include_once("VoteHandler.php");

class DoneVoteHandler {

    public static function handle() {
        VoteHandler::addVote($_POST["vals"]);
    }

    /*
    public static function handle() {
        // echo "DoneVoteHandler";
        // return;

        $valsArr = $_POST["vals"];

        VoteHandlerDb::saveToVoteTable();

        $voteInsertId = PollHandlerDb::getLatestInsertedId();

        $vatArr = PollHandlerDb::loadVats();
		for ($i=0; $i<count($vatArr); $i++) {
			$vat = $vatArr[$i];
            $perc = $valsArr[$i]["val"];
            $valId = $valsArr[$i]["id"];

            if ($valId != $vat->id) {
                echo "DoneVoteHandler.php: val id does not match vat id";
                return;
            }

			VoteHandlerDb::saveToVoteVatTable($voteInsertId, $vat->id, $perc);
		}		
        
    }
    */

}
?>