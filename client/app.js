
angular.module('app', [])
	.controller('myController', function($scope, $http){
		console.log("$http",$http);

		//Levanta los datos cuando se refresca la pagina
		var refresh = function(){
		$http.get('http://192.168.1.123:3000/api/upload')
			.then(function(response) {
				console.log("hola, todo ok", response);
				$scope.files = response.data;
				$scope.file = ({});
			}, function errorCallback(response) {
				console.log("hola, todo mal!!", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		};
		refresh();
		//Agrega un nuevo artista.
		$scope.addFile = function () {
			console.log("llama al addFile");
			var file = document.getElementById('inputFileServer').files[0];
			$scope.fd = new FormData();
			console.log(file);
	    $scope.fd.append("file", file);
			$http.post('http://192.168.1.123:3000/api/upload',$scope.fd, { transformRequest: angular.identity,
               headers: {'Content-Type': undefined}  } )
			.then(function(response) {
				refresh();
				console.log("Hola, todo ok con el post", response);
			}, function errorCallback(response) {
				console.log("Hola, todo mal con el post!!", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}

		$scope.remove = function(id){
			console.log("Hola, soy el remove: ", id);
			$http.delete('http://192.168.1.123:3000/api/upload/' + id)
			.then(function(response) {
				refresh();
				console.log("Hola, todo ok con el delete", response);
			}, function errorCallback(response) {
				console.log("Hola, todo mal con el delete!!", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}
		$scope.edit = function(id){
			console.log("Hola, soy el edit: ", id);
			$http.get('http://192.168.1.123:3000/api/upload/' + id)
			.then(function(response) {
				$scope.artista = response.data[0];
				console.log("Hola, todo ok con el edit: ", response.data[0]);
			}, function errorCallback(response) {
				console.log("Hola, todo mal con el edit!!", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}

		$scope.update = function(){
			console.log("Hola, soy el UPDATE: ", $scope.file);
			$http.put('http://192.168.1.123:3000/api/upload/' + $scope.file._id, $scope.file)
			.then(function(response) {
				refresh();
				console.log("Hola, todo ok con el put", response);
			}, function errorCallback(response) {
				refresh();
				console.log("Hola, todo mal con el put!!", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}
		$scope.deselect = function(){
			$scope.file = ({});
		}

		$scope.download = function(id){
			console.log("Hola, soy el Descargar: ", id);
			$http.get('http://192.168.1.123:3000/api/upload/' + id)
			.then(function(response) {
				$scope.file = response.data[0];
				console.log("Hola, todo ok con el descargar: ", response.data[0]);

				var filename = response.data[0].file.name;
				var contentType = response.data[0].file.mimetype;
				var a = document.createElement('a');
				var blob = new Blob([response.data[0].dato], {'type':contentType});
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();

			}, function errorCallback(response) {
				console.log("Hola, todo mal con el edit!!", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}

		$scope.strjs = function(id){
		  console.log("Hola, soy el strjs: ", id);
		  $http.get('http://192.168.1.123:3000/api/fileuff/' + id)
		  .then(function(response) {
		    //$scope.file = response.data[0];
		    console.log("Hola, todo ok con el strjs: ", response.data);
		  }, function errorCallback(response) {
		    console.log("Hola, todo mal con el strjs!!", response);
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
		}

		});
