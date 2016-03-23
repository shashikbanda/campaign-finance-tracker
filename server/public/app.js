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
	.when('/profile/:username',{
		templateUrl: '/partials/profile.html',
		controller:'ProfileController'
	})
	.when('/signin/error',{
		templateUrl:'/partials/signinerror.html',
		controller:'SignInController'
	})
})