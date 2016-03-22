var app = angular.module('myApp');

app.controller('SignInController', function($scope){
	$scope.input = {};
	$scope.signIn = function(){
		console.log($scope.input.username)
		console.log($scope.input.password)
		
	}
	
})