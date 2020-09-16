/**
 * Request of Quote Form
 * Saad Eddine FEKI
 */

// Get form data

const planSelector = document.getElementById("planSelector");
const nbApparts = document.getElementById("type1");
const nbFloors = document.getElementById("type2");
const nbBasement = document.getElementById("type3");
const nbBusiness = document.getElementById("type4");
const nbParking = document.getElementById("type5");
const nbCages = document.getElementById("type6");
const nbDistinctTenant = document.getElementById("type7");
const nbOccup = document.getElementById("type8");
const activity24 = document.getElementById("type9");
const nbElevator = document.getElementById("nbElevator");
const totalCost = document.getElementById("totalCost");
const instFee = document.getElementById("instFee");
const unitPrice = document.getElementById("unitPrice");
const priceElevator = document.getElementById("priceElevator");
const productType = document.getElementsByName("radio-btn");

// Form elements Events Listener
// planSelector.addEventListener("change", divControll);
planSelector.addEventListener("change", () => {
	divControll();
	reloadForm();
});

// nbApparts.addEventListener("input", nbElevatorCalculator);
// nbFloors.addEventListener("input", nbElevatorCalculator);
// nbBasement.addEventListener("input", nbElevatorCalculator);
// nbBusiness.addEventListener("input", nbElevatorCalculator);
// nbParking.addEventListener("input", nbElevatorCalculator);
// nbCages.addEventListener("input", nbElevatorCalculator);
// nbDistinctTenant.addEventListener("input", nbElevatorCalculator);
// nbOccup.addEventListener("input", nbElevatorCalculator);
// activity24.addEventListener("input", nbElevatorCalculator);

//Listener for the radio buttons
for (var i = 0; i < productType.length; i++) {
	productType[i].onclick = getCost;
}

//     ****** functions  *****

// get the index of the project
function getItemIndex() {
	return document.getElementById("planSelector").selectedIndex;
}
// Add a Div in the DOM
function addDiv(nb) {
	if (document.getElementById("fields-" + nb)) {
		document.getElementById("fields-" + nb).style.display = "block";
	}
}
// Remove a div
function removeDiv(nb) {
	if (document.getElementById("fields-" + nb)) {
		document.getElementById("fields-" + nb).style.display = "none";
	}
}

// Lets controll the Div`s
function divControll() {
	var choix = getItemIndex();
	if (choix == 1) {
		// ------  residential project ------
		aZeroInput();
		for (var i = 0; i < 3; i++) {
			addDiv(i + 1);
		}

		for (var i = 4; i < 10; i++) {
			removeDiv(i);
		}
	} else if (choix == 2) {
		//  ----- *** Commercial project***---
		aZeroInput();
		for (var i = 1; i < 6; i++) {
			addDiv(i + 1);
		}

		// remove divs
		removeDiv(1);
		removeDiv(7);
		removeDiv(8);
		removeDiv(9);
	} else if (choix == 3) {
		// ----- corporate Project -----
		// the order of questions is respected

		aZeroInput();
		addDiv(7);
		addDiv(2);
		addDiv(3);
		addDiv(5);
		addDiv(8);

		// remove divs
		removeDiv(1);
		removeDiv(4);
		removeDiv(6);
		removeDiv(9);
	} else if (choix == 4) {
		// hybrid
		aZeroInput();
		addDiv(4);
		addDiv(2);
		addDiv(3);
		addDiv(5);
		addDiv(8);
		addDiv(9);

		// remove divs
		removeDiv(1);
		removeDiv(6);
		removeDiv(7);
	} else {
		document.getElementById("requestQuote").reset();
		for (var i = 0; i < 9; i++) {
			removeDiv(i + 1);
		}
	}
}

// reset Fields

function aZeroInput() {
	for (var i = 1; i < 10; i++) {
		document.getElementById("type" + i).value = "";
	}
	nbElevator.value = "";
}

/**
 * Function calculate and update nbElevator
 * the readOnly input
 *
 */
/*
function nbElevatorCalculator() {
	var choix = getItemIndex();

	if (choix == 1) {
		//nbElevator.value = 0;
		reloadForm();
		// Residential

		// Round a number upward to its nearest integer
		var nbColumn = Math.ceil(nbFloors.value / 20);
		//  nbApparts / nbFloors = Average of doors
		//Average of doors /6 => nbElevator  ==   (nbApparts / (nbFloors * 6))
		var nbElevatorPerColumn = Math.ceil(nbApparts.value / (nbFloors.value * 6));
		var nbElevatorTotal = nbElevatorPerColumn * nbColumn;

		if (nbApparts.value != 0 && nbFloors.value != 0 && nbBasement.value != "") {
			nbElevator.value = nbElevatorTotal;
			document.getElementById("fields10").style.display = "block";
		} else {
			nbElevator.value = 0;
		}
	}
	// Commercial
	else if (choix == 2) {
		reloadForm();
		if (
			nbBusiness.value != "" &&
			nbFloors.value != "" &&
			nbBasement.value != "" &&
			nbParking.value != "" &&
			nbCages.value != 0
		) {
			nbElevator.value = nbCages.value;
			document.getElementById("fields10").style.display = "block";
		} else {
			nbElevator.value = 0;
		}
	}

	// Corporate or Hybrid
	else if (choix == 3 || choix == 4) {
		var a = Number(nbFloors.value);
		var b = Number(nbOccup.value);
		var c = Number(nbBasement.value);
		var nbrequired = Math.ceil((b * (a + c)) / 1000);
		var colonne = Math.ceil((a + c) / 20);
		var res = Math.ceil(nbrequired / colonne);
		var resTotal = res * colonne;

		if (nbFloors.value != 0 && nbOccup.value != 0 && nbBasement.value != 0) {
			nbElevator.value = resTotal;
			document.getElementById("fields10").style.display = "block";
		}
	} else {
		nbElevator.vaconst = 0;
	}
}

/**
 * Function getCost calculate project cost and update DOM
 */
/*
function getCost() {
	if (productType[0].checked == true && nbElevator.value != 0) {
		// set the price and the fee of installation
		unitPrice.value = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(7565);
		priceElevator.value = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(7565 * nbElevator.value);
		instFee.value = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(nbElevator.value * (7565 * 0.1));
		totalCost.value = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(nbElevator.value * (7565 * 1.1));
	} else if (productType[1].checked == true && nbElevator.value != 0) {
		// set the price
		unitPrice.value = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(12345);
		priceElevator.value = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(12345 * nbElevator.value);
		instFee.value = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(nbElevator.value * (12345 * 0.13));
		totalCost.value = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(nbElevator.value * (12345 * 1.13));
	} else if (productType[2].checked == true && nbElevator.value != 0) {
		// set the price
		unitPrice.value = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(15400);
		priceElevator.value = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(15400 * nbElevator.value);
		instFee.value = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(nbElevator.value * (15400 * 0.16));
		totalCost.value = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(nbElevator.value * (15400 * 1.16));
	} else {
		reloadForm();
	}
}
function reloadForm() {
	document.getElementById("displayCost").reset();
	productType[0].checked = false;
	productType[1].checked = false;
	productType[2].checked = false;
}*/

// fin calcul
