var mqtt = require('mqtt');
var mongoose = require('mongoose');
require('./db.js');
var data = mongoose.model('data');
var rfid = mongoose.model('rfid');
/*mongoose.connect('mongodb://0.0.0.0/smartlocker');
var mongo = mongoose.connection;
mongo.on('error', console.error.bind(console, 'connection error'));
mongo.once('open', function callback()
{
	console.log("database connect");
});
var Schema = mongoose.Schema;
var Sdata = new Schema(
	{"PIR" : "string",
	 "Air" : 'string',
	 "Hum" : 'string',
	 "Tmp" : 'string',
	 "Gas" : 'string',
	 "Rfid" : 'string',
	 "date" :  { type: Date, default: Date.now }
	}
);
var Srfid = new Schema
({
	"RFID" : 'string',
	"date" :  { type: Date, default: Date.now }}
);
var data = mongoose.model('data', Sdata);
var rfid = mongoose.model('rfid', Srfid);
*/
var client = mqtt.connect('mqtt://10.1.1.3:1883');

client.on('connect', function()
{
	client.subscribe('locker/#');
});

client.on('message', function(topic, message)
{
	console.log(message.toString());
	var jdata = JSON.parse(message);
	//console.log(jdata.Hum);
	 new data (
		{"PIR" : jdata.PIR,
		"Air" : jdata.Air,
		"Hum" : jdata.Hum,
		"Tmp" : jdata.Tmp,
		"Gas" : jdata.Gas}
	 ).save(function(err){console.log(err)});
	 //console.log(typeof(jdata.Rfid));
	 if(jdata.Rfid !="null")
	 {
		console.log(jdata.Rfid);
		new rfid({"RFID" : jdata.Rfid}
				).save(function(err){console.log(err)});
	 }
	 else
	 { 
		console.log("rfid null");
	 }
});
