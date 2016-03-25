var app = angular.module('myApp');


app.controller('RegisterController', function($scope,$http,$location){
	// $scope.submitForm = function(){
	// 	var data = {
	// 		username : $scope.username,
	// 		zipcode : $scope.zipcode,
	// 		password : $scope.password,
	// 		email : $scope.email
	// 	}
	// 	$http.post('/new/register', data)
	// 	.then(function(){
	// 		console.log("reaching the .then for the psot")
	// 	})

	// 	$http.get('/new/register')
	// 	.then(function(dataa){
	// 		console.log("should redirect to personal profile route")
	// 		console.log($scope.username)
	// 		if(dataa.data.login === true){
	// 			$location.path('/profile/' + $scope.username)
	// 		}
	// 	})
	// }
})