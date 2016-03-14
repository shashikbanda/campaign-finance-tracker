var app = angular.module('myApp');

app.controller('LegislatorsDisplayController',function($scope,$http){
	console.log("state = ", $scope.state)
	$scope.getState = function(state){
		console.log(state)
	}
})