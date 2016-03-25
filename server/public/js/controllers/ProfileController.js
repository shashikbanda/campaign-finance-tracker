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
				.then(function(){
					var billPromise = [];
					for(let l=0; l < $scope.congresspersons.length; l++){ //2 times on cheeselord
						var billReturn = $http.get('/legislator/bills/introduced/' + $scope.congresspersons[l].bioguide_id)
						billPromise.push(billReturn)
					}
					Promise.all(billPromise)
					.then(function(resolvedBills){
						var allBills = [];
						for(let k = 0; k < resolvedBills.length; k++){
							allBills = allBills.concat(resolvedBills[k].data.results[0].bills)
						}
						allBills.sort(function(a,b){
							var dateA = new Date(a.introduced_date);
							var dateB = new Date(b.introduced_date);
							return dateB - dateA
						});

						$scope.billArray = allBills;
						console.log($scope.billArray)
						$scope.billArray = $scope.billArray.slice(0,20)
						for(let k=0; k < $scope.billArray.length; k++){
							$scope.billArray[k].title = $scope.billArray[k].title.replace(new RegExp("&#x27;", "g"), "'");
						}
					})
				})
			})
			$scope.billArray = [];
			$scope.removeFromProfile = function(person){
				var username = person.username;
				var bioguide_id = person.bioguide_id;
				var crp_id = person.crp_id;
				$http.get('/track/delete/'+username+'/'+bioguide_id)
				.then(function(data){
					if(data.data.complete === true){
						$location.path('/profile/'+username)
					}
				})
			}
		}
		else{
			$location.path('/error')// CHANGE TO ERROR PAGE
		}
	})
	$scope.viewSaved = function(){
		$scope.showSavedPoliticans = true;
		$scope.showLatestBills = false;
	}
	$scope.viewBills = function(){
		$scope.showSavedPoliticans = false;
		$scope.showLatestBills = true;
	}
	
	
})