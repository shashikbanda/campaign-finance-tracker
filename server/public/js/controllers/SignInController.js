var app = angular.module('myApp');

app.controller('SignInController', function($scope,$http,$location){
	$scope.good = true;
	$scope.bad = false;
	$scope.signIn = function(){
		var data = {
			entered_username : $scope.username,
			entered_password : $scope.password
		}

		$http.post('/signin',data)
		.then(function(data){
			if(data.data.login === true){
				$scope.good = false;
				$scope.bad = true;
				$scope.user = $scope.username;
				$location.path('/profile/'+$scope.username)
			}
			else{
				$scope.status = "Sign In"
			}
		})
		
	}
	$scope.logout = function(){
		$scope.good = true;
		$scope.bad = false;
		$scope.user = ""
		var data = {
			username : $scope.entered_username
		}
		$http.post('/logout', data)
		.then(function(dataa){
			if(dataa.data.logout === true){
				console.log('logging out')
				$location.path('/')
			}
		})
	}
	
})