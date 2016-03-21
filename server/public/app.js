var app = angular.module('myApp',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'/partials/main.html',
		controller: 'MainController'
	})
	.when('/legislators',{
		templateUrl:'/partials/legislators.html',
		controller: 'LegislatorsDisplayController'
	})
	.when('/legislator/:cid',{
		templateUrl:'partials/legislatorpersonalpage.html',
		controller: 'LegislatorPersonalPageController'
	})
	.when('/register',{
		templateUrl:'/partials/register.html',
		controller:'RegisterController'
	})
})