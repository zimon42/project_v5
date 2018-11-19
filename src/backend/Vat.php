<?php

class Vat {
	public $id = -1; // Used for new blocks in edit mode (?)
	public $title;
	public $startPerc;
	public $imageSrc;
	public $color;
		
	function __construct($title, $startPerc, $imageSrc, $color) {
		$this->title = $title;
		$this->startPerc = $startPerc;
		$this->imageSrc = $imageSrc;
		$this->color = $color;
	}

	// to json, used in GetVatsHandler
	public function toArray() {
		return array(
			"id" => $this->id,
			"title" => $this->title,
			"val" => $this->startPerc,
			"img" => $this->imageSrc,
			"color" => $this->color
		);
	}

}

?>