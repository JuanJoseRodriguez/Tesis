// A $( document ).ready() block.
//$( document ).ready(function() {
//    console.log( "ready!" );
//});

angular.module('app', [])
	.controller('myController', function($scope, $http){
		console.log("$http",$http);
		//Levanta los datos cuando se refresca la pagina
		var refresh = function(){
		$http.get('http://172.24.17.97:3000/api/artists')
			.then(function(response) {
				console.log("hola, todo ok", response);
				$scope.artistas = response.data;
				$scope.artista = ({});
			}, function errorCallback(response) {
				console.log("hola, todo mal!!", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		};
		refresh();
		//Agrega un nuevo artista.
		$scope.addArtista = function () {
			console.log($scope.artista);
			$http.post('http://172.24.17.97:3000/api/artists',$scope.artista)
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
			$http.delete('http://172.24.17.97:3000/api/artists/' + id)
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
			$http.get('http://172.24.17.97:3000/api/artists/' + id)
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
			console.log("Hola, soy el UPDATE: ", $scope.artista);
			$http.put('http://172.24.17.97:3000/api/artists/' + $scope.artista._id, $scope.artista)
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
			$scope.artista = ({});
		}
		});
