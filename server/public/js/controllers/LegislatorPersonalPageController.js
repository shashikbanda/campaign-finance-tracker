var app = angular.module('myApp');

app.controller('LegislatorPersonalPageController', function($scope,$routeParams,$http){
	var cid = $routeParams.cid;
	$http.get('/legislator/cid/'+cid)
	.then(function(data){
		$scope.name = data.data.legislator['@attributes'].firstlast;
		console.log($scope.name)
	})
})