const express = require("express");
const app = express();
const fs = require("fs");
var cors = require("cors");
const { v4: uuid } = require("uuid");
app.use(express.json());
app.use(cors());


const allData = JSON.parse(fs.readFileSync(`${__dirname}/db.json`));

app.get("/api/addresses", (req, res) => {
	res.status(200).json({
		status: "success",
		results: allData.length,
		data: {
			allData: allData,
		},
	});
});

app.get("/api/addresses/:id", (req, res) => {
	const id = req.params.id;
	const user = allData.find((el) => el.id == id);
	// console.log(user);
	res.status(200).json({
		status: "success",
		data: {
			allData: user,
		},
	});
});

app.post("/api/addresses", (req, res) => {
	const newId = uuid();
	const newData = Object.assign({ id: newId }, req.body);
	allData.push(newData);
	fs.writeFile(`${__dirname}/db.json`, JSON.stringify(allData), () => {
		res.status(201).json({
			status: "success",
			data: {
				allData: newData,
			},
		});
	});
});

app.patch("/api/addresses/:id", (req, res) => {
	const id = req.params.id;
	const data = allData.find((el) => el.id == id);
	const update = Object.assign(data, req.body);
	fs.writeFile(`${__dirname}/db.json`, JSON.stringify(allData), () => {
		res.status(200).json({
			status: "success",
			data: {
				allData: update,
			},
		});
	});
});

app.delete("/api/addresses/:id", (req, res) => {
	const id = req.params.id;
	const index = allData.findIndex((el) => el.id == id);
	allData.splice(index, 1);
	fs.writeFile(`${__dirname}/db.json`, JSON.stringify(allData), () => {
		res.status(200).json({
			status: "success",
		});
	});
});

const port = 8000;
app.listen(port, () => {
	console.log(`App is listening on port ${port}`);
});
