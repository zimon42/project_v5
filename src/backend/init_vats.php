<?php

include_once("PollHandlerDb.php");
include_once("Vat.php");

function addVat($title, $startPerc, $imageSrc, $color) {
    PollHandlerDb::saveToVatTable(new Vat($title, $startPerc, $imageSrc, $color));
}

addVat("Läsk", 12, "soda2.jpg", "#FF5733");
addVat("Kaffe", 12, "coffee.png", "#641E16");
addVat("Mjölk", 12, "milk.jpg", "#FEF9E7");
addVat("Choklad", 12, "hot_chokolate.jpg", "#935116");
addVat("Rejuvelac", 12, "rejuvelac.jpg", "#FEF9E7");
addVat("Svart te", 12, "black_tea.png", "#F5B7B1");
addVat("Grönt te", 12, "green_tea.jpg", "#A9DFBF");
addVat("Roibos", 12, "roibos.jpg", "#D98880");

/*
addVat("Buljong", 12, "no_image.jpg", "#FDEDEC");
addVat("Mineralvatten", 12, "no_image.jpg", "#F7F9F9");
*/

echo "Added vats<br>";

/*
{id:0, title: "Läsk", val: 25, img:"soda2.jpg", isLocked: false},
{id:1, title: "Kaffe", val: 25, img:"coffee.png", isLocked: false},
{id:2, title: "Mjölk", val: 25, img:"milk.jpg", isLocked: false},
{id:3, title: "Choklad", val: 25, img:"hot_chokolate.jpg", isLocked: false},
{id:4, title: "Rejuvelac", val: 25, img:"rejuvelac.jpg", isLocked: false},
{id:5, title: "Svart te", val: 25, img:"black_tea.png", isLocked: false},
{id:6, title: "Grönt te", val: 25, img:"green_tea.jpg", isLocked: false},
{id:7, title: "Roibos", val: 25, img:"roibos.jpg", isLocked: false}
{title: "Buljong", val: 25, img:"broth.jpg", isLocked: false},
{title: "Mineralvatten", val: 25, img:"mineral_water2.png", isLocked: false}
*/

?>