// colorGame.js

var aantalVierkanten = 6;
var kleuren = [];
var pickedColor;
var vierkanten = document.querySelectorAll(".vierkant");
var kl_Display = document.getElementById("kleurDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

//  bij opstart initieel uit te voeren functie
function init() {
	// modebuttons eventlisteners
	setupModeButtons();
	// vierkanten eventlisteners
	setupVierkanten();
	// opbouwen nieuw spel
	reset();
}

// modebuttons eventlisteners
function setupModeButtons(){
	// loop door alle modebuttons
	for (var i = 0; i < modeButtons.length; i++) {
	 	// als er op de knop wordt geklikt
	 	modeButtons[i].addEventListener("click", function(){
	 		// deselecteer beide buttons
	 		modeButtons[0].classList.remove("geselecteerd");
	 		modeButtons[1].classList.remove("geselecteerd");
	 		// markeer button waarop geklikt is als geselecteerd
	 		this.classList.add("geselecteerd");
	 		// if geklikte button is de easy button 
	 		this.textContent === "Easy"
	 			// then keuze uit 3 vierkanten
	 			? aantalVierkanten = 3
	 			// else keuze uit 6 vierkanten
	 			: aantalVierkanten = 6;
	 		// opbouwen niew spel	
	 		reset();
		});
	}
}

// vierkanten eventlisteners
function setupVierkanten(){
	for (var i = 0; i < vierkanten.length; i++) {
		vierkanten[i].addEventListener("click", function(){
			// bewaar de kleur van het geselecteerde vierkant
			var clickedColor = this.style.backgroundColor;
			// vergelijk keur van geselecteerde vierkant met de te raden kleur
			if (clickedColor === pickedColor){
				// vierkant met juiste kleur is op geklikt (kleur is geraden)
				// show message
				messageDisplay.textContent = "Goed bezig!";
				// verander tekst in resetbutton
				resetButton.textContent = "Nog een spel?";
				// verander kleuren van de vierkanten in geraden kleur
				changeColors(clickedColor);
				// verander achtegrondkleur in geraden kleur
				h1.style.backgroundColor = clickedColor;
			} else {
				// vierkant met andere kleur is op geklikt (kleur nog niet geraden)
				// verwijder vierkant door vierkant de kleur van de achtergrond te geven
				this.style.backgroundColor = "#232323";
				// show message message
				messageDisplay.textContent = "Try again"
			}
		});
	} 
}

// reset functie; opbouwen nieuw spel
function reset(){
	// generate nieuwe kleuren
	kleuren     = generateRandomColors(aantalVierkanten);
	// kies een random kleur
	pickedColor = kiesKleur();
	// verander te raden rgb kleurcode in header
	kl_Display.textContent = pickedColor;
	// verander knoptekst
	resetButton.textContent = "nieuwe kleuren";
	// verander de kleuren op het scherm
	for (var i = 0; i < vierkanten.length; i++) {
		if (kleuren[i]) {
			vierkanten[i].style.display = "block";
			// geef de vierkanten de nieuwe kleuren
			vierkanten[i].style.backgroundColor = kleuren[i];
		} else {
			vierkanten[i].style.display = "none";
		}
	}
	// reset h1 kleur
	h1.style.backgroundColor = "steelblue";
	// wis message in streep
	messageDisplay.textContent = "";
}

resetButton.addEventListener("click", function(){
 	reset();
});

// verander de kleuren van de vierkanten
function changeColors(kleur){
	// loop door alle vierkanten
	for (var i = 0; i < vierkanten.length; i++) {
		// verander kleur in argument kleur
	 vierkanten[i].style.backgroundColor = kleur;
	};
}

// kies te raden kleur uit gegenereerde kleuren
function kiesKleur(){
	var randomKleur = Math.floor(Math.random() * kleuren.length);
	return kleuren[randomKleur];
}

// maak array van kleuren
function generateRandomColors(num){
	// maak array
	var arr = []
	// add numm random kleuren aan array toe
	for (var i = 0; i < num; i++) {
		// get random color en zet deze in het array
		arr.push(randomColor())
	}
	// return array
	return arr;
}

// genereer random kleur (array van drie getallen tussen 0 en 255)
function randomColor(){
	// kies rood van 0 -255
	var rRed = Math.floor(Math.random() * 256);
	// kies groen van 0 -255
	var rGreen = Math.floor(Math.random() * 256);
	// kies blauw van 0 -255
	var rBlue = Math.floor(Math.random() * 256);
	// return rgb(r, g, b)
	return "rgb(" + rRed +", " + rGreen + ", " + rBlue + ")";
}