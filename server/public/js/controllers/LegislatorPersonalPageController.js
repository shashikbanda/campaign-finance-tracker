var app = angular.module('myApp');

app.controller('LegislatorPersonalPageController', function($scope,$routeParams,$http){
	var cid = $routeParams.cid;
	$scope.detail = false;
	$http.get('/legislator/contributors/'+cid)
	.then(function(data){
		$scope.org_name_arr = [];
		$scope.indiv_contr_arr = [];
		$scope.pacs_contr_arr = [];
		$scope.total_contr_arr = [];
		for(let j = 0; j < data.data.response.contributors.contributor.length; j++){
			$scope.org_name_arr.push(data.data.response.contributors.contributor[j]['@attributes'].org_name);
			$scope.indiv_contr_arr.push(data.data.response.contributors.contributor[j]['@attributes'].indivs);
			$scope.pacs_contr_arr.push(data.data.response.contributors.contributor[j]['@attributes'].pacs);
			$scope.total_contr_arr.push(data.data.response.contributors.contributor[j]['@attributes'].total);
		}
	})
	$http.get('/legislator/cid/'+cid)
	.then(function(data){
		$scope.name = data.data.legislator['@attributes'].firstlast;
		$scope.party = data.data.legislator['@attributes'].party;
		$scope.bioguideid = data.data.legislator['@attributes'].bioguide_id;
		$scope.office = data.data.legislator['@attributes'].office;

		$scope.website = data.data.legislator['@attributes'].website;
		$scope.twitter_id = data.data.legislator['@attributes'].twitter_id;
		$scope.youtube_url = data.data.legislator['@attributes'].youtube_url;
		$scope.facebook_url = data.data.legislator['@attributes'].facebook_id;


		$scope.picture = "https://theunitedstates.io/images/congress/225x275/"+data.data.legislator['@attributes'].bioguide_id+".jpg"

		$http.get('/legislator/bills/introduced/' + $scope.bioguideid)
		.then(function(data){
			$scope.billArray = data.data.results[0].bills
			//console.log($scope.billArray)
		})

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
	function parseString(inputWord){
	    var newWord = inputWord.toLowerCase();
	    var keywordArray = [];
	    var startIndex = 0;
	    var endIndex = 0;
	    for(var i=0; i<newWord.length;i++){
	        if(newWord[i] === "/" || newWord[i] === '&' || newWord[i] === ' '){
	            endIndex = i;
	            keywordArray.push(newWord.substring(startIndex,endIndex));
	            startIndex = i+1;
	        }
	    }
	    keywordArray.push(newWord.substring(startIndex,newWord.length))
	    
	    for(var j = 0 ; j < keywordArray.length; j++){
	        if(keywordArray[j] === ' ' || keywordArray[j] === '&' || newWord[i] === "/" || newWord[i] === ''){
	            keywordArray.splice(j, 2);
	        }
	    }
	    return keywordArray;
	}

	$scope.getAreaCategory = function(area){
		$scope.category = parseString(area); // category that needs to be parsed and compared to subject in API call
		console.log($scope.category)
		
	}

	$scope.addToProfile = function(){
		var cidToTrack = $routeParams.cid; 
		$http.get('/legislator/cid/'+cidToTrack)
		.then(function(data){
			var bioguide_id = data.data.legislator['@attributes'].bioguide_id;
			$http.get('/legislator/sunlight/'+bioguide_id)
			.then(function(dataa){
				var dataToAdd = {
					bioguide_id : dataa.data.results[0].bioguide_id,
					crp_id : dataa.data.results[0].crp_id,
					first_name : dataa.data.results[0].first_name,
					last_name : dataa.data.results[0].last_name,
					state_name : dataa.data.results[0].state_name,
					party : dataa.data.results[0].party
				}

				$http.put('/track/add',dataToAdd)
				.then(function(data){
					console.log("put")
				})

			})
		})
	}

	$scope.showDetails = function(index){
		$scope.detail = !$scope.detail;
		$scope.display_total = $scope.total_contr_arr[index]
		$scope.display_individual = $scope.indiv_contr_arr[index]
		$scope.display_pacs = $scope.pacs_contr_arr[index]
		$scope.currentIndex = index;
		console.log($scope.detail)
	}

	
})