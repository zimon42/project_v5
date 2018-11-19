<?php
include_once("setupdb.php");
include_once("Vote.php");
include_once("VoteVat.php");
include_once("PollHandlerDb.php");
include_once("VoteHandlerDb.php");

class VoteHandler {

    public static function addVote($valsArr) {

        // $valsArr = $_POST["vals"];

        VoteHandlerDb::saveToVoteTable();

        $voteInsertId = PollHandlerDb::getLatestInsertedId();

        $vatArr = PollHandlerDb::loadVats();
		for ($i=0; $i<count($vatArr); $i++) {
			$vat = $vatArr[$i];
            $perc = $valsArr[$i]["val"];
            $valId = $valsArr[$i]["id"];

            if ($valId != $vat->id) {
                echo "Warning: VoteHandler.php: val id does not match vat id. ".
                "val id is ".$valId." and vat id is ".$vat->id."<br>";
                return;
            }

			VoteHandlerDb::saveToVoteVatTable($voteInsertId, $vat->id, $perc);
		}		

    }

}

?>