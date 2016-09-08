var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var data = new Schema
(
	{   "PIR" : 'string',
		"Air" : 'string',
		"Hum" : 'string',
		"Tmp" : 'string',
		"Gas" : 'string',
		"date" : {type: Date, default : Date.now}}
);

var rfid = new Schema
(
 {"RFID" : 'string',
  "date" : {type: Date, default : Date.now}}
);

mongoose.model('data', data);
mongoose.model('rfid', rfid);
mongoose.connect('mongodb://127.0.0.1/smartlocker');
var mongo = mongoose.connection;

mongo.on('error', console.error.bind(console, 'connection error'));

mongo.once('open', function callback()
{
	console.log("database connect");
});



