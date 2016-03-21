var app = angular.module('myApp');


app.controller('RegisterController', function($scope,$http){
	$scope.submitForm = function(){
		var data = {
			username : $scope.username,
			zipcode : $scope.zipcode,
			password : $scope.password,
			email : $scope.email
		}
		$http.post('/new/register', data)
		.then(function(){
			//redirect to user home page
			//or further ask to confirm default congressmen
		})
	}
})