var app = angular.module('myApp');


app.controller('ProfileController', function($scope,$routeParams,$http,$location){
	$scope.user = $routeParams.username;

	$scope.goToLegislator = function(person){
		$location.path('/legislator/'+person.crp_id)
	}
	
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
	// .then(function(){
	// 	var usercongressmen = {congress:$scope.congresspeople}
	// 	$http.post('/')
	// })
	
})