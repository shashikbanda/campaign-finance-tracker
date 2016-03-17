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
	var data = [];
	var dataArray = [];
	$scope.labelArray = [];
	$scope.allLabelArray = [];
	function getRandomColor() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}
	$http.get('/legislator/contribution/industry/'+cid)
	.then(function(industrydata){
		var industryContributionData = industrydata.data.response.industries.industry;
		for(var i=0; i<industryContributionData.length;i++){
			$scope.allLabelArray.push(industryContributionData[i]['@attributes'].industry_name)
			data.push(
			{	
				value : industryContributionData[i]['@attributes'].total,
				color : getRandomColor(),
				highlight : getRandomColor(),
				label : industryContributionData[i]['@attributes'].industry_name
			})
		}
	})
	.then(function(){
		console.log(data)
		var ctx = document.getElementById("myChart").getContext("2d");
		var myDoughnutChart = new Chart(ctx).Pie(data);
	})
	$http.get('/legislator/contribution/sector/'+cid)
	.then(function(sectordata){
		var sectorContributionData = sectordata.data.response.sectors.sector;
		for(var i = 0; i < sectorContributionData.length; i++){
			$scope.allLabelArray.push(sectorContributionData[i]['@attributes'].sector_name)
			$scope.labelArray.push(sectorContributionData[i]['@attributes'].sector_name)
			dataArray.push(sectorContributionData[i]['@attributes'].total)
		}
		console.log(dataArray)
	})
	.then(function(){
		var data = {
		    labels: $scope.labelArray,
		    datasets: [
		        {
		            label: "Contributions by Sector",
		            fillColor: "rgba(220,220,220,0.5)",
		            strokeColor: "rgba(220,220,220,0.8)",
		            highlightFill: "rgba(220,220,220,0.75)",
		            highlightStroke: "rgba(220,220,220,1)",
		            data: dataArray
		        }
		    ]
		};
		var ctx = document.getElementById("bySector").getContext("2d");
		var myBarChart = new Chart(ctx).Bar(data);

	})
	$scope.getAreaCategory = function(area){
		console.log(area)
	}
})