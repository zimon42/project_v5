<?php
include_once("PollHandlerDb.php");
include_once("Vat.php");

class GetVatsHandler {

    public static function handle() {
        // echo "Get vats!!!";
        $objectsList = PollHandlerDb::loadVats();
        $arraysList = self::convertObjectsToArrays($objectsList); // to json
        echo json_encode($arraysList);
    }

    public static function convertObjectsToArrays($objectsList) {  
        // return array("message" => "Hello world!!!");

        $arrayList = array();
        for ($i=0; $i<count($objectsList); $i++) {
            $vat = $objectsList[$i];
            array_push($arrayList, $vat->toArray());
        }
        return $arrayList;
        
    }

}
?>