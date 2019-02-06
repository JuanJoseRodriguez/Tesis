(function(){{
    $http.get(ipAWS + '/api/filesuffId/' + id).then(function (response) {
        console.log('Download /api/filesuffId/' + id);
        console.log(response.data);
    }, function errorCallback(response) {
        console.log('Download error', response);    // called asynchronously if an error occurs
                                                    // or server returns response with an error status.
    });
}})();