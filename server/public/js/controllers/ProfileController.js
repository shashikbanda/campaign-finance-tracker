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
			var info = {
				username : $scope.user,
				congresspeoplearray : dataa.data.results
			}
			$http.post('/track/'+$scope.user, info)
			.then(function(){
				//console.log("posted that shit")
			})
		})
	})
	.then(function(){
		$http.get('/track/'+$scope.user)
		.then(function(people){
			console.log(people)
			$scope.congresspersons = people.data;
		})
	})
	
})