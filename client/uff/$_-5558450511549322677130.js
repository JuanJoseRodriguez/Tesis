(function(){{
    $http.delete(ipAWS + '/api/files/' + id).then(function (response) {
        refresh();
        console.log('Delete ok', response);
    }, function errorCallback(response) {
        console.log('Delete not ok', response);    // called asynchronously if an error occurs
                                                   // or server returns response with an error status.
    });
}})();