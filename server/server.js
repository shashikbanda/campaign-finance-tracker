var express = require('express');
var app = express();
var cors = require('cors');
var path = require('path');

var request = require('request');

app.use('/', express.static(path.join(__dirname, "/public")));

app.get('/',function(req, res){
	res.sendFile(path.resolve(__dirname + '/public/index.html'));
});

app.get('/state/:stateID', function(req,res){ //get state legislators information
	var stateID = req.params.stateID;
	request.get('http://www.opensecrets.org/api/?method=getLegislators&id=' + stateID +'&apikey=3888a2822de7936ee277abdcc92caa1b&output=json',function(error,response,body){
		var newBody = JSON.parse(body)
		res.send(newBody.response)
	})
})

app.get('/legislator/cid/:cid', function(req,res){
	var cid = req.params.cid;
	request.get('http://www.opensecrets.org/api/?method=getLegislators&id=' + cid +'&apikey=3888a2822de7936ee277abdcc92caa1b&output=json', function(error,response,body){
		var newBody = JSON.parse(body)
		res.send(newBody.response)
	})
})

app.listen(3000, function(){
	console.log('listening on 3000')
})