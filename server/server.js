var express = require('express');
var app = express();
var cors = require('cors');
var path = require('path');

var request = require('request');

app.use('/', express.static(path.join(__dirname, "/public")));

app.get('/',function(req, res){
	res.sendFile(path.resolve(__dirname + '/public/index.html'));
});

app.get('/state/:stateID', function(req,res){
	var stateID = req.params.stateID;
	request.get('http://www.opensecrets.org/api/?method=getLegislators&id=' + stateID +'&apikey=&output=json',function(error,response,body){
		var newBody = JSON.parse(body)
		res.send(newBody.response)
	})
})

app.listen(3000, function(){
	console.log('listening on 3000')
})