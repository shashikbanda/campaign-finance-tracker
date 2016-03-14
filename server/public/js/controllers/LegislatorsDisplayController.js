var app = angular.module('myApp');

app.controller('LegislatorsDisplayController',function($scope,$http){
	$scope.getState = function(state){
		$scope.currentState = state;
		$http.get('http://localhost:3000/state/' + $scope.currentState)
		.then(function(data){
			console.log("hello")
			console.log(data)
		})
	}


})