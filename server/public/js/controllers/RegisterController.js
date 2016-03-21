var app = angular.module('myApp');


app.controller('RegisterController', function($scope,$http,$location){
	$scope.submitForm = function(){
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
		$http.get('/new/register')
		.then(function(){
			console.log("should redirect to personal profile route")
			$location.path('profile/' + $scope.username)
		})
	}
})