var express = require('express');
var mongoose = require('mongoose');
var app = express();
require('./db.js');
var data = mongoose.model('data');
var rfid = mongoose.model('rfid');
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/data', function(req, res)
{
	console.log("/data");
	data.find().sort({"date": -1}).limit(10).exec(function(err,datas)
	{
		rfid.find().sort({"date": -1}).limit(10).exec(function(err,rfids)
		{
			//console.log(rfids);
			res.json({'sensor' : datas,
				"Rfid": rfids});

		});
	});

	});

app.get('/', function(req, res)
{
	console.log("/");
	data.find().sort({"date": -1}).limit(10).exec(function(err,datas)
	{
		rfid.find().sort({"date": -1}).limit(10).exec(function(err,rfids)
		{
			//console.log(rfids);
			res.render('index',{"h":"locker 1", "data": datas, "rfid": rfids});
		});
	});
});

app.get('/add', function(req, res)
{
	new data(
		{"Tmp":1,
		 "Air": 6,
		 "PIR":2,
		 "Hum":3,
		 "Gas":4,
		 "Rfid":5}
	).save(function(err)
	{
		res.redirect("/");
	});
});
app.listen(3000);
