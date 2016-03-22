'use strict'
var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var knex = require('./db/knex');
var pg = require('pg');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session')



app.use(cookieParser("abcdefghijklmnopqrstuvwxyz"));
app.use(cookieSession({
  name: 'session',
  keys: ["key1","key2"]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, "/public")));

app.get('/',function(req, res){
	res.sendFile(path.resolve(__dirname + '/public/index.html'));

});

app.get('/new/register', function(req,res){
	res.redirect('/#/profile/')
})

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
				zip:zipcode
			})
			.then(function(data){
				var hash = bcrypt.hashSync(password,8);
				knex('users').where({username:username})
				.update({password:hash})
				.then(function(){
					//res.cookie('username',username)
				})
			})
		}
	})
})

app.post('/logout', function(req,res){
	req.session.username = "";
	res.send({logout:true})
})

app.post('/signin', function(req,res){
	var enteredUsername = req.body.entered_username;
	var enteredPassword = req.body.entered_password;
	console.log(req.session)
	knex('users').where({username:enteredUsername})
	.then(function(rows){
		if(bcrypt.compareSync(enteredPassword,rows[0].password)){
			req.session.username = enteredUsername;
			res.json({login:true})
		}
	})
})

app.get('/track/:username', function(req,res){
	var username = req.params.username;
	knex('legislatorsByAssociation').where({username:username})
	.then(function(data){
		res.send(data)
	})
})

app.post('/track/:username', function(req,res){
	var initialArray = req.body.congresspeoplearray;
	var username = req.body.username;
	var crp_id_arr = [];
	var bioguide_id_arr = [];

	for(let i =0; i < initialArray.length; i++){
		knex('legislatorsByAssociation')
		.where({crp_id:initialArray[i].crp_id, bioguide_id:initialArray[i].bioguide_id})
		.then(function(row){
			if(row.length===0){
				knex('legislatorsByAssociation')
				.insert({username:username,
					first_name:initialArray[i].first_name,
					last_name:initialArray[i].last_name,
					state_name:initialArray[i].state_name,
					party:initialArray[i].party,
					crp_id:initialArray[i].crp_id, 
					bioguide_id:initialArray[i].bioguide_id})
				.then(function(dataaa){
					//
				})
			}
		})
	}
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

app.get('/legislator/zip/:zip', function(req,res){
	var zip = req.params.zip;
	request.get('https://congress.api.sunlightfoundation.com/legislators/locate?zip='+zip+'&apikey=4def00d383ea4b4fb61822f11db486fc', function(error, response,body){
		var newBody = JSON.parse(body);
		res.send(newBody)
	})
})

app.get('/user/:username', function(req,res){
	var username = req.params.username;
	knex('users').where({username:username}).then(function(data){
		res.send(data)
	})
})

app.listen(3000, function(){
	console.log('listening on 3000')
})