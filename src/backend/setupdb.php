<?php
include("database_info.php");

$db_conn = new mysqli($polls_db_server, $polls_db_username, $polls_db_password, $polls_db_database);

if ($db_conn->connect_error) {
    die('Connect Error (' . $db_conn->connect_errno . ') '
            . $db_conn->connect_error);
}
?>