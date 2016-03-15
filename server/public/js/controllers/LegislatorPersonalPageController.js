var app = angular.module('myApp');

app.controller('LegislatorPersonalPageController', function($scope,$routeParams,$http){
	var cid = $routeParams.cid;
	$http.get('/legislator/cid/'+cid)
	.then(function(data){
		$scope.name = data.data.legislator['@attributes'].firstlast;
		$scope.party = data.data.legislator['@attributes'].party;
		if($scope.party === 'D'){
			$scope.party = "Democratic Party"
		}
		if($scope.party === 'R'){
			$scope.party = "Republican Party"
		}
		$scope.bioguideid = data.data.legislator['@attributes'].bioguide_id;
		$scope.office = data.data.legislator['@attributes'].office;
		$scope.picture = "https://theunitedstates.io/images/congress/225x275/"+data.data.legislator['@attributes'].bioguide_id+".jpg"

		$http.get('/legislator/sunlight/'+$scope.bioguideid)
		.then(function(moredata){
			console.log(moredata);
			console.log("asdfasdfasfd")
		})
	})
})