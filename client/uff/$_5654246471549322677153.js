(function(){{
    $http.get(ipAWS + '/api/restoreFunctions').then(function (response) {
        console.log('GET restore functions ok', response);
    }, function errorCallback(response) {
        console.log('GET files error', response);    // called asynchronously if an error occurs
                                                     // or server returns response with an error status.
    });
}})();