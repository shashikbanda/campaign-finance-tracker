var app = angular.module('myApp');

app.controller('LegislatorsDisplayController',function($scope,$http,$location){
	$scope.getState = function(state){
		$scope.currentState = state;
		$http.get('state/' + $scope.currentState)
		.then(function(data){
			$scope.stateLegislators = data.data.legislator; //array of all congressmen and senators

		})
		$scope.showSearchBox = true;
	}

	$scope.goToLegislatorPage = function(person){
		var personCID = person['@attributes'].cid;
		$location.url("/legislator/"+personCID);
		$scope.showSearchBox = true;
	}


})