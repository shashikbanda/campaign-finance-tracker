var app = angular.module('myApp');


app.controller('RegisterController', function($scope,$http){
	$scope.submitForm = function(){
		console.log($scope.username);
		console.log($scope.email);
		console.log($scope.password)
	}
})