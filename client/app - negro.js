angular.module('app', [])
	.controller('myController', function($scope, $http){
		//get all files when page is refreshed
		var refresh = function(){
		$http.get('http://192.168.0.110:3000/api/files')
			.then(function(response) {
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
			$http.delete('http://192.168.0.110:3000/api/files/' + id)
			.then(function(response) {
				refresh();
			}, function errorCallback(response) {
				console.log("Delete not ok", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}

		//Download file from server
		$scope.download = function(id){
			$http.get('http://192.168.0.110:3000/api/files/' + id)
			.then(function(response) {

			/*	var a = document.createElement('a');
        var blob = new Blob([response.data], {'type':"text/javascript"});
				console.log("Archivo convertido: ", blob);
        a.href = window.URL.createObjectURL(blob);
        a.download = 'asd.js';
        a.click();*/

				console.log("Download ok HEADERS: ", response);
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

			/*f.files.forEach(function(file){
				fd.append('file',f);
	    });*/

			$http.post('http://192.168.0.110:3000/api/files',$scope.fd,{
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
