const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//  pour acces au form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

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
	var range = req.body.range;
	console.log(choix.localeCompare("Residential"));
	console.log(choix.localeCompare("Commercial"));
	console.log(choix);
	console.log(range);

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

	var unitPrice = 0;
	var priceElevator = 0;
	var instFee = 0;
	var totalCost = 0;

	if (range.localeCompare("standard") === 0) {
		console.log("yessss");
		unitPrice = 7565;
		priceElevator = 7565 * nbElevatorCalculator();
		instFee = nbElevatorCalculator() * (7565 * 0.1);
		totalCost = nbElevatorCalculator() * (7565 * 1.1);
		//
		res.send(
			"<html><body style={ #74b9ff;}><h1>PROJECT COST</h1><ul> <li>Number of elevator: " +
				nbElevatorCalculator() +
				"</li> <li>Unit price: $" +
				unitPrice +
				"</li> <li>Elevator total cost: $" +
				priceElevator +
				"</li> <li>Installation fee: $" +
				instFee +
				"</li><li>Total: $" +
				totalCost +
				"</li></ul></body></html>"
		);
	} else if (range.localeCompare("premium") === 0) {
		unitPrice = 12345;
		priceElevator = 12345 * nbElevatorCalculator();
		instFee = nbElevatorCalculator() * (12345 * 0.13);
		totalCost = nbElevatorCalculator() * (12345 * 1.13);
		//
		res.send(
			"<html><body style={ #74b9ff;}><h1>PROJECT COST</h1><ul> <li>Number of elevator: " +
				nbElevatorCalculator() +
				"</li> <li>Unit price: $" +
				unitPrice +
				"</li> <li>Elevator total cost: $" +
				priceElevator +
				"</li> <li>Installation fee: $" +
				instFee +
				"</li><li>Total: $" +
				totalCost +
				"</li></ul></body></html>"
		);
	} else if (range.localeCompare("excelium") === 0) {
		unitPrice = 15400;
		priceElevator = 15400 * nbElevatorCalculator();
		instFee = nbElevatorCalculator() * (15400 * 0.16);
		totalCost = nbElevatorCalculator() * (15400 * 1.16);
		//
		res.send(
			"<html><body style={ #74b9ff;}><h1>PROJECT COST</h1><ul> <li>Number of elevator: " +
				nbElevatorCalculator() +
				"</li> <li>Unit price: $" +
				unitPrice +
				"</li> <li>Elevator total cost: $" +
				priceElevator +
				"</li> <li>Installation fee: $" +
				instFee +
				"</li><li>Total: $" +
				totalCost +
				"</li></ul></body></html>"
		);
	}
});
// Server
app.listen(process.env.PORT || 3000, function () {
	console.log("server is runing on port 9090");
});
