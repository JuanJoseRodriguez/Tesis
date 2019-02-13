angular.module('app', [])
	.controller('myController', function($scope, $http){

		var ipAWS = 'http://13.59.133.10:3000'
		//get all files when page is refreshed
		var refresh = function(){
		$http.get(ipAWS + '/api/files')
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
			$http.delete(ipAWS + '/api/files/' + id)
			.then(function(response) {
				refresh();
				console.log("Delete ok", response);
			}, function errorCallback(response) {
				console.log("Delete not ok", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}

		//Delete file from DB
		$scope.removeAllFiles = function(){
			$http.delete(ipAWS + '/api/files/')
			.then(function(response) {
				refresh();
				console.log("Delete all ok", response);
			}, function errorCallback(response) {
				console.log("Delete all not ok", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}

		//Download file from server as a string by file id
		$scope.downloadStrById = function(id){
			$http.get(ipAWS + '/api/filesuffId/' + id)
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
			var fi = document.getElementById('filetxt').files[0];
			//var f = document.getElementById('file');
			$scope.fd=new FormData();
			//var fd=new FormData();
			$scope.fd.append('file',f);
			$scope.fd.append('filetxt',fi);
			$http.post(ipAWS + '/api/files',$scope.fd,{
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
		//restore funtions with a specific filter
		$scope.restoreFunctions = function () {
			$http.get(ipAWS + '/api/restoreFunctions')
			.then(function(response) {
				refresh();
				console.log("GET restore functions ok", response);
			}, function errorCallback(response) {
				console.log("GET files error", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}

		//Upload a file/files to server
		$scope.instrumentFile = function () {
			var f = document.getElementById('file').files[0];
			//var f = document.getElementById('file');
			$scope.fd=new FormData();
			//var fd=new FormData();
			$scope.fd.append('file',f);
			$http.post(ipAWS + '/api/instrumentFile',$scope.fd,{
							 transformRequest: angular.identity,
							 headers: {'Content-Type': undefined}
						})
			.then(function(response) {
				refresh();
				console.log("POST instrument ok", response);
				let filename = "instrumentedfile.js";
				let contentType = "text/javascript";
				let a = document.createElement('a');

				let blob = new Blob([response.data, { 'type': contentType }]);
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();
			}, function errorCallback(response) {
				console.log("post instrument not ok", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}

		});
