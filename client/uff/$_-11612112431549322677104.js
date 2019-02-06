(function(){{
    console.log('GET files ok', response);
    $scope.files = response.data;
    $scope.file = {};
}})();