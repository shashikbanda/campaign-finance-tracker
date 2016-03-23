var app = angular.module('myApp');

app.controller('SignInController', function($scope,$http,$location,$route){
	$http.get('/signin')
	.then(function(data){
		if(data.data.authenticatedUser !== null){
			console.log(data.data.authenticatedUser)
			$scope.showLogin = false;
			$scope.showLogout = true;
			$scope.user = data.data.authenticatedUser;
		}
		else{
			$scope.showLogin = true;
			$scope.showLogout = false;
			$scope.user = null;
		}
		$scope.signIn = function(){
			var data = {
				entered_username : $scope.username,
				entered_password : $scope.password
			}

			$http.post('/signin',data)
			.then(function(data){
				if(data.data.login === true){
					$scope.user = data.data.user; //this is from the cookie on a successful login
					$scope.showLogin = false;
					$scope.showLogout = true;
					$location.path('/profile/'+$scope.user)
				}
				else{
					$scope.status = "Sign In"
					$location.path('/signin/error')
				}
			})
			
		}
		$scope.logout = function(){
			$scope.user = ""
			var data = {
				username : $scope.user
			}
			$http.post('/logout', data)
			.then(function(dataa){
				if(dataa.data.logout === true){
					$location.url('/')
				}
			})

		}
	})
	
	
})