var dice_results = [1, 1, 1, 1, 1, 1]; // Le résultat des dés
var nowgen = ["blue", "red", "black", "yellow", "purple", "green"]; // La génération qui est utilisé
var nextgen = [null, null, null, null, null, null] // La prochaine génération - qui est vide par défaut

/* Fonction appelée lorsqu'un dé est cliqué */
function random(dice){
	var dices_el = document.getElementsByClassName("dice");
	var colors_el = document.getElementsByClassName("color");

	var dicecolor = colors_el[dice - 1].classList.item(1);

	var randint = Math.floor(Math.random() * 6) + 1; // Nombre aléatoire entre 1 et 6 compris
	/* On l'affiche et on l'enregistre */
	dices_el[dice - 1].innerHTML = '<img src="' + randint + '.png" />';
	dice_results[dice - 1] = randint;

	/* Affichage dans la piscine */
	for (let i = 1; i <= randint; i++){
		var x = Math.floor(Math.random() * 0.46 * window.innerWidth); // Parce que la width de la piscine est de 50vw (soit 50% du viewport) et qu'on enlève un peu
		var y = Math.floor(Math.random() * 0.33 * window.innerHeight); // Le height de la piscine est de 40vh
		x += 0.25 * window.innerWidth; /* Pour les faire rentrer dans l'espace prévu (et non dans le coin en haut à gauche) */
		y += 0.3 * window.innerHeight;
		var piscine = document.getElementById("piscine");
		/* Création du nouveau rond de couleur */
		var newcolor = document.createElement("div");
		newcolor.setAttribute("class", "color " + dicecolor)
		newcolor.setAttribute("style", "position: fixed; left: " + x + "px; top: " + y + "px;")
		piscine.appendChild(newcolor);
	}
}

/* Fonction appelée lorsqu'on souhaite créer la génération suivante */
function newgen(){

	/* On liste déjà les couleurs de la génération actuelle
	var colors = document.getElementsByClassName("color");
	var colors_avail = [];
	for (let c = 0; c <= 6; c++){
		var colordiv = colors[c];
		var color = colordiv.classList.item(1);
		colors_avail.push(color);
	}*/
	/* On fait les couleurs de la nouvelle génération */
	var colors_weighted = [];
	/* On fait avec le "poids" des couleurs dû aux lancers de dés */
	for (let n in dice_results){
		for (let result = 1; result <= n; result++){
			colors_weighted.push(nowgen[n]);
		}
	}
	var newgen_el = document.getElementsByClassName("newgen"); // Les divs sont transparents par défaut
	/* Choix des couleurs au hasard */
	var tmpgen = [];
	for (let n = 0; n < 6; n++){
		var element = newgen_el[n];
		var randindex = Math.floor(Math.random() * colors_weighted.length);
		var color_choose = colors_weighted[randindex];
		/* Enregistrement */
		tmpgen.push(color_choose);
		element.classList.replace("transparent", color_choose);
	}
	nextgen = tmpgen;
}

/* Fonction pour relancer la simu avec la new gen qui devient la gen actuelle */
function rerun(){
	var colors_el = document.getElementsByClassName("color");
	var dices_el = document.getElementsByClassName("dice");
	var newgen_el = document.getElementsByClassName("newgen");
	var table = document.getElementById("tableau");
	var newline = document.createElement("tr");
	newline.appendChild(document.createElement("td"));
	for (let n = 0; n < 6; n++){
		colors_el[n].classList.replace(nowgen[n], nextgen[n]); // Changement de la génération actuelle
		dices_el[n].innerHTML = '<img src="1.png" />'; // Changement des dés
		newgen_el[n].classList.replace(nextgen[n], "transparent"); // On vide la nextgen
		/* Création d'une nouvelle ligne du tableau */
		var td = document.createElement("td");
		td.setAttribute("class", "color " + nextgen[n]);
		newline.appendChild(td);
	}
	table.appendChild(newline);
	nowgen = nextgen;
	document.getElementById("piscine").innerHTML = "";
}