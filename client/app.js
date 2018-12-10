angular.module('app', [])
	.controller('myController', function($scope, $http){

		var ipNegro = 'http://192.168.0.110:3000'
		var ipBuitre = 'http://18.188.249.225:3000'//'http://192.168.1.123:3000'
		//get all files when page is refreshed
		var refresh = function(){
		$http.get(ipBuitre + '/api/files')
			.then(function(response) {
				console.log("GET files ok", response);
				$scope.files = response.data;
				$scope.file = ({});
			}, function errorCallback(response) {
				console.log("GET files error", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		};
		refresh();

		//Delete file from DB
		$scope.delete = function(id){
			$http.delete(ipBuitre + '/api/files/' + id)
			.then(function(response) {
				refresh();
				console.log("Delete ok", response);
			}, function errorCallback(response) {
				console.log("Delete not ok", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}

		//Download file from server
		$scope.download = function(id){
			$http.get(ipBuitre + '/api/files/' + id)
			.then(function(response) {
			console.log(response)

		}, function errorCallback(response) {
				console.log("Download error", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}

		//Download file from server as a string by file name
		$scope.downloadStr = function(name){
			$http.get(ipBuitre + '/api/filesuff/' + name)
			.then(function(response) {
			console.log(response.data)

		}, function errorCallback(response) {
				console.log("Download error", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}

		//Download file from server as a string by file id
		$scope.downloadStrById = function(id){
			$http.get(ipBuitre + '/api/filesuffId/' + id)
			.then(function(response) {

			console.log("Download /api/filesuffId/" + id);
			console.log(response.data)

		}, function errorCallback(response) {
				console.log("Download error", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}

		//Upload a file/files to server
		$scope.upload = function () {
			var f = document.getElementById('file').files[0];
			//var f = document.getElementById('file');
			$scope.fd=new FormData();
			//var fd=new FormData();
			$scope.fd.append('file',f);
			$http.post(ipBuitre + '/api/files',$scope.fd,{
               transformRequest: angular.identity,
               headers: {'Content-Type': undefined}
            })
			.then(function(response) {
				refresh();
				console.log("POST Upload ok", response);
			}, function errorCallback(response) {
				console.log("POST Upload not ok", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}
		});
