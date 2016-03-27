var app = angular.module('myApp');

app.controller('SignInController', function($scope,$http,$location,$route){
	$scope.submitForm = function(){
		$route.reload();
		var data = {
			username : $scope.username,
			zipcode : $scope.zipcode,
			password : $scope.password,
			email : $scope.email
		}
		$http.post('/new/register', data)
		.then(function(){
			//
		})

		$http.get('/new/register/'+$scope.username)
		.then(function(dataa){
			console.log("should redirect to personal profile route")
			console.log($scope.username)
			if(dataa.data.login === true){
				$scope.showLogin = false;
				$scope.showLogout = true;
				$scope.user = dataa.data.authenticatedUser;
				$location.url('profile/' + $scope.user)
			}
		})
	}
	$http.get('/signin')
	.then(function(data){
		if(data.data.authenticatedUser !== null){
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
					$scope.username = "";
					$scope.password = "";
					//$location.path('/signin/error')
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
					$scope.showLogin = true;
					$scope.showLogout = false;
					$location.path('/');
				}
			})

		}
	})
	
	
})