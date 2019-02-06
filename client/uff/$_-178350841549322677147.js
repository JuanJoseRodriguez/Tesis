(function(){{
    var f = document.getElementById('file').files[0];
    //var f = document.getElementById('file');
    $scope.fd = new FormData();
    //var fd=new FormData();
    $scope.fd.append('file', f);
    $http.post(ipAWS + '/api/files', $scope.fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
    }).then(function (response) {
        refresh();
        console.log('POST Upload ok', response);
    }, function errorCallback(response) {
        console.log('POST Upload not ok', response);    // called asynchronously if an error occurs
                                                        // or server returns response with an error status.
    });
}})();