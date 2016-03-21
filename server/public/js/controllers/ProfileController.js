var app = angular.module('myApp');


app.controller('ProfileController', function($scope,$routeParams,$http){
	$scope.user = $routeParams.username;

	// $http.get('/legislator/zip/'+$scope.zipcode)
	// .then(function(data){
	// 	console.log("reaching?")
	// 	console.log(data)
	// })
	
	$http.get('/user/'+$scope.user)
	.then(function(data){
		$scope.zip = data.data[0].zip;
	})
	.then(function(){
		$http.get('/legislator/zip/'+$scope.zip)
		.then(function(dataa){
			$scope.congresspeople = dataa.data.results;
		})
	})
	
})