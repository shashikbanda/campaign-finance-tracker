var app = angular.module('myApp');


app.controller('ProfileController', function($scope,$routeParams,$http,$location){
	$scope.user = $routeParams.username;

	$http.get('/signin')
	.then(function(data){
		if(data.data.authenticatedUser === $scope.user){
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
					$http.get('/track/'+$scope.user)
					.then(function(results){
						if(results.data.length === 0){
							console.log("reaching for the first time, adding for the first time")
							$scope.congresspeople = dataa.data.results;
							var info = {
								username : $scope.user,
								congresspeoplearray : dataa.data.results
							}
							$http.post('/track/'+$scope.user, info)
							.then(function(){
								console.log("posted that shit")
							})
						}
					})
				})
			})
			.then(function(){
				$http.get('/track/' + $scope.user)
				.then(function(people){
					console.log(people)
					$scope.congresspersons = people.data;
				})
			})

			$scope.removeFromProfile = function(person){
				var username = person.username;
				var bioguide_id = person.bioguide_id;
				var crp_id = person.crp_id;
				$http.get('/track/delete/'+username+'/'+bioguide_id)
				.then(function(data){
					console.log("hello, it's me");
					if(data.data.complete === true){
						$location.path('/profile/'+username)
					}
				})
			}
		}
		else{
			$location.path('/signin/error')
		}
	})
	
	
})