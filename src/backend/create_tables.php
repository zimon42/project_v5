<?php

include_once ("setupdb.php");

/*
$db_conn->query("DROP TABLE Polls");

$sql = "CREATE TABLE Polls (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
title VARCHAR(100) NOT NULL
)";

if ($db_conn->query($sql) === TRUE) {
    echo "Table Polls created successfully";
} else {
    echo "Error creating Polls table: " . $db_conn->error;
}
*/

$db_conn->query("DROP TABLE Vats");

$sql = "CREATE TABLE Vats (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(100) NOT NULL,
start_perc INT(6) NOT NULL,
image_src VARCHAR(100) NOT NULL,
color VARCHAR(100) NOT NULL
)";

if ($db_conn->query($sql) === TRUE) {
    echo "Table Vats created successfully<br>";
} else {
    echo "Error creating Vats table: " . $db_conn->error . "<br>";
}

/*
$db_conn->query("DROP TABLE Users");

$sql = "CREATE TABLE Users (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
pers_number VARCHAR(100) NOT NULL, 
name VARCHAR(100) NOT NULL
)";

if ($db_conn->query($sql) === TRUE) {
    echo "Table Users created successfully";
} else {
    echo "Error creating Users table: " . $db_conn->error;
}

UserHandler::addPredefinedUsers();

*/

$db_conn->query("DROP TABLE Votes");

// Vote table
$sql = "CREATE TABLE Votes (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
date DATETIME NOT NULL
)";

if ($db_conn->query($sql) === TRUE) {
    echo "Table Votes created successfully<br>";
} else {
    echo "Error creating Votes table: " . $db_conn->error;
}

$db_conn->query("DROP TABLE VoteVats");

// VoteVat table
$sql = "CREATE TABLE VoteVats (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
vote_id INT(6),
vat_id INT(6),
perc DECIMAL(10,5)
)";

if ($db_conn->query($sql) === TRUE) {
    echo "Table VatVotes created successfully";
} else {
    echo "Error creating VoteVats table: " . $db_conn->error;
}

$db_conn->close();

?>