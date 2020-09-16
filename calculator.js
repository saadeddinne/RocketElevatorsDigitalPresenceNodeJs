const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//  pour acces au form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// app.get("/", function (req, res) {
// 	res.sendFile(__dirname + "/index.html");
// });
// // handling post request
// app.post("/", function (req, res) {
// 	var num1 = Number(req.body.num1);
// 	var num2 = Number(req.body.num2);
// 	var result = num1 + num2;
// 	res.send("The result is: " + result);
// });

/**
 * /bmi calculator
 */
app.get("/", function (req, res) {
	console.log();
	res.sendFile(__dirname + "/index.html");
});
//handling req
app.post("/", function (req, res) {
	var choix = req.body.selectPlan;
	var appart = Number(req.body.appart);
	var floor = Number(req.body.floor);
	var basement = Number(req.body.basement);
	var busines = Number(req.body.busines);
	var parking = Number(req.body.parking);
	var cages = Number(req.body.cages);
	var companies = Number(req.body.companies);
	var occupents = Number(req.body.occupents);
	var activity = Number(req.body.activity);
	console.log(choix.localeCompare("Residential"));
	console.log(choix.localeCompare("Commercial"));
	console.log(choix);

	// lets calculate that

	//  1. residential
	function nbElevatorCalculator() {
		var nbElevatorTotal;
		if (choix.localeCompare("Residential") === 0) {
			// Round a number upward to its nearest integer
			var nbColumn = Math.ceil(floor / 20);

			//  nbApparts / nbFloors = Average of doors
			//Average of doors /6 => nbElevator  ==   (nbApparts / (nbFloors * 6))
			var nbElevatorPerColumn = Math.ceil(appart / (floor * 6));
			return nbElevatorPerColumn * nbColumn;
			//return nbElevatorTotal;
		} else if (choix.localeCompare("Commercial") === 0) {
			nbElevatorTotal = cages;
			return nbElevatorTotal;
		} else if (
			choix.localeCompare("Corporate") === 0 ||
			choix.localeCompare("Hybrid") === 0
		) {
			var nbrequired = Math.ceil((occupents * (floor + basement)) / 1000);
			console.log(nbrequired);
			var colonne = Math.ceil((floor + basement) / 20);
			console.log(colonne);
			var res = Math.ceil(nbrequired / colonne);
			console.log(res * colonne);

			return res * colonne;
		} else {
			return 0;
		}
	}

	var numberElevators = nbElevatorCalculator();
	// fonction cost
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

	// fin cost
	var tt = nbElevatorCalculator();
	res.send(
		" Your choice is: " +
			choix +
			" voila tes variables : " +
			"appart: " +
			appart +
			" floor: " +
			floor +
			" " +
			" basement" +
			basement +
			"busines  " +
			busines +
			" parking: " +
			parking +
			" cages:  " +
			cages +
			" companies: " +
			companies +
			"occupents" +
			occupents +
			" activity: " +
			activity +
			"=====>" +
			nbElevatorCalculator()
	);
});
// Server
app.listen(9000, function () {
	console.log("server is runing on port 9000");
});
