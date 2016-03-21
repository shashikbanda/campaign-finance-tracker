var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var knex = require('./db/knex');
var pg = require('pg');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, "/public")));

app.get('/',function(req, res){
	res.sendFile(path.resolve(__dirname + '/public/index.html'));

});

app.post('/new/register', function(req,res){
	var username = req.body.username;
	var zipcode = req.body.zipcode;
	var email = req.body.email;
	var password = req.body.password;
	
	knex('users').where({username:username})
	.then(function(data){
		if(data.length === 0){
			knex('users')
			.insert({
				username:username,
				zip:zipcode,
				email:email
			})
			.then(function(data){
				var hash = bcrypt.hashSync(password,8);
				knex('users').where({username:username})
				.update({password:hash})
				.then(function(data){
					console.log("check to see if hash password has updated lil man")
				})
			})
		}
	})
	
})

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

app.get('/legislator/sunlight/:bioguideid',function(req,res){
	var bioguide_id = req.params.bioguideid;
	request.get('https://congress.api.sunlightfoundation.com/legislators?bioguide_id=' +bioguide_id+'&apikey=4def00d383ea4b4fb61822f11db486fc',function(error,response,body){
		var newBody = JSON.parse(body);
		res.send(newBody)
	}) //4def00d383ea4b4fb61822f11db486fc
})

app.get('/legislator/contribution/industry/:cid',function(req,res){
	var cid = req.params.cid;
	request.get('http://www.opensecrets.org/api/?method=candIndustry&cid='+ cid +'&cycle=2016&apikey=3888a2822de7936ee277abdcc92caa1b&output=json', function(error,response,body){
		var newBody = JSON.parse(body);
		res.send(newBody)
	})
})

app.get('/legislator/contribution/sector/:cid', function(req,res){
	var cid = req.params.cid;
	request.get('http://www.opensecrets.org/api/?method=candSector&cid='+ cid +'&cycle=2016&apikey=3888a2822de7936ee277abdcc92caa1b&output=json', function(error,response,body){
		var newBody = JSON.parse(body);
		res.send(newBody)
	})
})

// app.get('/')

app.listen(3000, function(){
	console.log('listening on 3000')
})