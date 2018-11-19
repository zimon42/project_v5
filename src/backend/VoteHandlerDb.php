<?php
include_once("setupdb.php");
include_once("Vote.php");
include_once("VoteVat.php");
include_once("PollHandlerDb.php");

class VoteHandlerDb {

	public static function saveToVoteTable() {
		global $db_conn;
		$sql = "INSERT INTO Votes (date) VALUES (NOW())";
		$db_conn->query($sql) || die("VoteHandlerDb::saveToVoteTable error: ".$db_conn->error());
	}
	
	public static function loadVote($voteId) {
		global $db_conn;
		$sql = "SELECT id, date FROM Votes WHERE id=".$voteId;
		$result = $db_conn->query($sql); 
		$result || die("VoteHandlerDb::loadVote error: ".$db_conn->error());
		if ($result->num_rows == 0) {
			die("VoteHandlerDb::loadVote error: No vote with such id in database");
		}
		$row = $result->fetch_assoc();
		$vote = new Vote();
		$vote->id = $row["id"];
		$vote->voteDate = $row["date"];
		return $vote;
	}
	
	public static function loadVotes() {
		global $db_conn;
		$list = array();
		$sql = "SELECT * FROM Votes";
		$result = $db_conn->query($sql);
		$result || die("VoteHandlerDb::loadVotes error: ".$db_conn->error());
		while($row = $result->fetch_assoc()) {
			array_push($list, VoteHandlerDb::loadVote($row["id"]));
		}
		return $list;
	}	

	public static function saveToVoteVatTable($voteId, $vatId, $perc) {
		global $db_conn;
		$sql = "INSERT INTO VoteVats (vote_id, vat_id, perc) VALUES (".$voteId.",".$vatId.",".$perc.")";
		$db_conn->query($sql) || die("VoteHandlerDb::saveToVoteVatTable error: ".$db_conn->error());
	}
	
	public static function loadVoteVat($voteVatId) {
		global $db_conn;
		$sql = "SELECT vote_id, vat_id, perc FROM VoteVats WHERE id=".$voteVatId;
		$result = $db_conn->query($sql); 
		$result || die("VoteHandlerDb::loadVoteVat error: ".$db_conn->error());
		if ($result->num_rows == 0) {
			die("VoteHandlerDb::loadVoteVat error: No voteVat with such id in database");
		}
		$row = $result->fetch_assoc();
		$voteVat = new VoteVat();
		$voteVat->voteId = $row["vote_id"];
		$voteVat->vatId = $row["vat_id"];
		$voteVat->perc = $row["perc"];
		return $voteVat;
	}
	
	public static function loadVoteVats($voteId) {
		global $db_conn;
		$list = array();
		// $sql = "SELECT * FROM VoteVats WHERE vote_id=".$voteId;
		$sql = "SELECT * FROM VoteVats WHERE vote_id=".$voteId." ORDER BY id ASC";
		$result = $db_conn->query($sql);
		$result || die("VoteHandlerDb::loadVoteVats error: ".$db_conn->error());
		while($row = $result->fetch_assoc()) {
			array_push($list, VoteHandlerDb::loadVoteVat($row["id"]));
		}
		return $list;
	}	

	/*
	
	public static function editInVoteVatTable($voteId, $vatId, $perc) {
		global $db_conn;
		$sql = "UPDATE VoteVats SET perc={$perc} WHERE vote_id={$voteId} AND vat_id={$vatId}";
		$result = $db_conn->query($sql);
		$result || die("VoteHandlerDb::editInVoteVatsTable error: ".$db_conn->error());		
	}
	
	public static function removeVote($voteId) {
		global $db_conn;
		$sql = "DELETE FROM Votes WHERE id={$voteId}";
		$result = $db_conn->query($sql);
		// $result || die("VoteHandlerDb::removeVote error: ".$db_conn->error());				
		// $result || die("VoteHandlerDb::removeVote error");				
	}

	public static function removeVoteVat($voteId, $vatId) {
		global $db_conn;
		$sql = "DELETE FROM VoteVats WHERE vote_id={$voteId} AND vat_id={$vatId}";
		$result = $db_conn->query($sql);
		// $result || die("VoteHandlerDb::removeVoteVat error: ".$db_conn->error());		
		// $result || die("VoteHandlerDb::removeVoteVat error");		
	}

	*/

}
?>