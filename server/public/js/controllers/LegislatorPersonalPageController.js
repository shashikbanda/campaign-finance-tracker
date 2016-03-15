var app = angular.module('myApp');

app.controller('LegislatorPersonalPageController', function($scope,$routeParams,$http){
	var cid = $routeParams.cid;
	$http.get('/legislator/cid/'+cid)
	.then(function(data){
		$scope.name = data.data.legislator['@attributes'].firstlast;
		$scope.party = data.data.legislator['@attributes'].party;
		$scope.bioguideid = data.data.legislator['@attributes'].bioguide_id;
		$scope.office = data.data.legislator['@attributes'].office;
		$scope.picture = "https://theunitedstates.io/images/congress/225x275/"+data.data.legislator['@attributes'].bioguide_id+".jpg"

		$http.get('/legislator/sunlight/'+$scope.bioguideid)
		.then(function(moredata){
			$scope.chamber = moredata.data.results[0].chamber
			$scope.district = moredata.data.results[0].district;
			$scope.staterank = moredata.data.results[0].state_rank;
			$scope.termstart = moredata.data.results[0].term_start;
			$scope.termend = moredata.data.results[0].term_end;
			$scope.state = moredata.data.results[0].state;
			if($scope.chamber === 'house'){
				$scope.chamber = "Member of the House of Representatives"
				$scope.house = true;
			}
			if($scope.chamber === 'senate'){
				$scope.chamber = "Member of the United States Senate"
				$scope.senate = true;
			}
		})
	})
	// Get the context of the canvas element we want to select
	var data = [
	    {
	        value: 300,
	        color:"#F7464A",
	        highlight: "#FF5A5E",
	        label: "Red"
	    },
	    {
	        value: 50,
	        color: "#46BFBD",
	        highlight: "#5AD3D1",
	        label: "Green"
	    },
	    {
	        value: 100,
	        color: "#FDB45C",
	        highlight: "#FFC870",
	        label: "Yellow"
	    }
	]
	var ctx = document.getElementById("myChart").getContext("2d");

	var myDoughnutChart = new Chart(ctx).Doughnut(data);
})