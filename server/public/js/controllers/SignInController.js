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
				$scope.user = data.data.user; //this is from the cookie on a successful login
				$location.path('/profile/'+$scope.user)
			}
			else{
				$scope.status = "Sign In"
				$location.path('/signin/error')
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