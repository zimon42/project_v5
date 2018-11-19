<?php
    header("Access-Control-Allow-Origin: *");

    include_once("GetVatsHandler.php");
    include_once("DoneVoteHandler.php");
    include_once("GetHistoryHandler.php");
    include_once("GetStatsHandler.php");

    $action = $_POST["action"];
    // echo "Hello world";
    // $arr = array("message" => "Hello World!!!");
    // echo json_encode($arr);
    // echo "Hello world";

    if ($action == "done_vote") {
        DoneVoteHandler::handle();
    }

    if ($action == "get_vats") {
        GetVatsHandler::handle();
    }

    if ($action == "get_history") {
        GetHistoryHandler::handle();
    }

    if ($action == "get_stats") {
        GetStatsHandler::handle();
    }

    // echo json_encode($_POST["vats"]);
?>