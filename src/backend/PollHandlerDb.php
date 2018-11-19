<?php

include_once ("setupdb.php");
// include_once ("Poll.php");
include_once ("Vat.php");

// Don't forget to add global $db_conn in beginning of each function.

class PollHandlerDb {
	
	// Tries titles Omröstning 1, Omröstning 2, and so on until it finds
	// a vacant title
	
	/*
	public static function getNextDefaultPollTitle() {
		global $db_conn;
		$i = 1;
		while (true) {
			$title = "Omröstning ".$i;
			$sql = "SELECT id, title FROM Polls WHERE title='".$title."'";
			$result = $db_conn->query($sql);
			$result || die("PollHandlerDb::getNextDefaultPollTitle error: ".$db_conn->error());
			if ($result->num_rows == 0) {
				return $title;
			}
			$i++;
		}
	}
	
	public static function saveToPollTable($poll) {
		global $db_conn;
		$sql = "INSERT INTO Polls (title) VALUES ('".$poll->title."')";
		$db_conn->query($sql) || die("PollHandlerDb::saveToPollTable error: ".$db_conn->error());
	}
	
	public static function loadPoll($id) {
		global $db_conn;
		$sql = "SELECT id, title FROM Polls WHERE id=".$id;
		$result = $db_conn->query($sql); 
		$result || die("PollHandlerDb::loadPoll error: ".$db_conn->error());
		if ($result->num_rows == 0) {
			die("PollHandlerDb::loadPoll error: No poll with such id in database");
		}
		$row = $result->fetch_assoc();
		$poll = new Poll();
		$poll->id = $row["id"];
		$poll->title = $row["title"];
		return $poll;
	}
	
	public static function loadPolls() {
		global $db_conn;
		$list = array();
		$sql = "SELECT id, title FROM Polls";
		$result = $db_conn->query($sql);
		while($row = $result->fetch_assoc()) {
			array_push($list, PollHandlerDb::loadPoll($row["id"]));
		}
		return $list;
	}	
	
	public static function removePoll($pollId) {
		global $db_conn;
		$sql = "DELETE FROM Polls WHERE id=".$pollId;
		$db_conn->query($sql) || die("PollHandlerDb::removePoll error: ".$db_conn->error());
	}

	public static function updatePollTable($poll) {
		global $db_conn;
		$sql = "UPDATE Polls SET title='".$poll->title."' WHERE id=".$poll->id;
		if ($db_conn->query($sql) !== TRUE) {
			die("PollHandlerDb::updatePollTable error: ".$db_conn->error());
		}	
	}
	*/

	public static function saveToVatTable($vat) {
		global $db_conn;
		$sql = "INSERT INTO Vats (title, start_perc, image_src, color) VALUES (".
			"'".$vat->title."',".$vat->startPerc.",'".$vat->imageSrc."','".$vat->color."')";
		echo $sql."<br>";
		$db_conn->query($sql) || die("PollHandlerDb::saveToVatTable error: ".$db_conn->error());
	}	
	
	public static function loadVat($id) {
		global $db_conn;
		$sql = "SELECT id, title, start_perc, image_src, color FROM Vats WHERE id=".$id;
		$result = $db_conn->query($sql); 
		$result || die("PollHandlerDb::loadVat error: ".$db_conn->error());
		if ($result->num_rows == 0) {
			die("PollHandlerDb::loadVat error: No vat with such id in database");
		}
		$row = $result->fetch_assoc();
		$vat = new Vat("",0,"", "");
		$vat->id = $row["id"];
		$vat->title = $row["title"];
		$vat->startPerc = $row["start_perc"];		
		$vat->imageSrc = $row["image_src"];
		$vat->color = $row["color"];
		return $vat;
	}
	
	public static function loadVats() {
		global $db_conn;
		$list = array();
		$sql = "SELECT id FROM Vats";
		$result = $db_conn->query($sql);
		while($row = $result->fetch_assoc()) {
			array_push($list, PollHandlerDb::loadVat($row["id"]));
		}
		return $list;
	}	

	/*
	public static function updateVatTable($vat) {
		global $db_conn;
		$sql = "UPDATE Vats SET poll_id=".$vat->pollId.", title='".$vat->title."', start_perc=".$vat->startPerc.", image_src='".$vat->imageSrc."', vat_order=".$vat->vatOrder." WHERE id=".$vat->id;
		if ($db_conn->query($sql) !== TRUE) {
			die("PollHandlerDb::updateVatTable error: ".$db_conn->error());
		}	
	}

	public static function removeVat($vatId) {
		global $db_conn;
		$sql = "DELETE FROM Vats WHERE id=".$vatId;
		$db_conn->query($sql) || die("PollHandlerDb::removeVat error: ".$db_conn->error());
	}
	*/

	public static function getLatestInsertedId() {
		// https://www.w3schools.com/php/php_mysql_insert_lastid.asp		
		global $db_conn;
		return $db_conn->insert_id;
	}

	public static function getNumVats() {
		global $db_conn;
		$sql = "SELECT * FROM Vats";
		$result = $db_conn->query($sql); 
		$result || die("PollHandlerDb::getNumVats error: ".$db_conn->error());
		return $result->num_rows;
	}
	
}

?>