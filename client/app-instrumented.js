var consoleLogArray = [];
angular.module('app', []).controller('myController', function ($scope, $http) {
        if (consoleLogArray.indexOf('start function null from app.js in 2') === -1) {
        consoleLogArray.push('start function null from app.js in 2');
        console.log('_PROFILING_INFO_start function null from app.js in 2_PROFILING_INFO_');
    }
    var ipAWS = 'http://18.222.192.49:3000';
    var refresh = function () {
                if (consoleLogArray.indexOf('start function null from app.js in 6') === -1) {
            consoleLogArray.push('start function null from app.js in 6');
            console.log('_PROFILING_INFO_start function null from app.js in 6_PROFILING_INFO_');
        }
        $http.get(ipAWS + '/api/files').then(function (response) {
                        if (consoleLogArray.indexOf('start function null from app.js in 8') === -1) {
                consoleLogArray.push('start function null from app.js in 8');
                console.log('_PROFILING_INFO_start function null from app.js in 8_PROFILING_INFO_');
            }
            console.log('GET files ok', response);
            $scope.files = response.data;
            $scope.file = {};
        }, function errorCallback(response) {
                        if (consoleLogArray.indexOf('start function errorCallback from app.js in 12') === -1) {
                consoleLogArray.push('start function errorCallback from app.js in 12');
                console.log('_PROFILING_INFO_start function errorCallback from app.js in 12_PROFILING_INFO_');
            }
            console.log('GET files error', response);
        });
    };
    refresh();
    $scope.delete = function (id) {
                if (consoleLogArray.indexOf('start function null from app.js in 21') === -1) {
            consoleLogArray.push('start function null from app.js in 21');
            console.log('_PROFILING_INFO_start function null from app.js in 21_PROFILING_INFO_');
        }
        $http.delete(ipAWS + '/api/files/' + id).then(function (response) {
                        if (consoleLogArray.indexOf('start function null from app.js in 23') === -1) {
                consoleLogArray.push('start function null from app.js in 23');
                console.log('_PROFILING_INFO_start function null from app.js in 23_PROFILING_INFO_');
            }
            refresh();
            console.log('Delete ok', response);
        }, function errorCallback(response) {
                        if (consoleLogArray.indexOf('start function errorCallback from app.js in 26') === -1) {
                consoleLogArray.push('start function errorCallback from app.js in 26');
                console.log('_PROFILING_INFO_start function errorCallback from app.js in 26_PROFILING_INFO_');
            }
            console.log('Delete not ok', response);
        });
    };
    $scope.downloadStrById = function (id) {
                if (consoleLogArray.indexOf('start function null from app.js in 60') === -1) {
            consoleLogArray.push('start function null from app.js in 60');
            console.log('_PROFILING_INFO_start function null from app.js in 60_PROFILING_INFO_');
        }
        $http.get(ipAWS + '/api/filesuffId/' + id).then(function (response) {
                        if (consoleLogArray.indexOf('start function null from app.js in 62') === -1) {
                consoleLogArray.push('start function null from app.js in 62');
                console.log('_PROFILING_INFO_start function null from app.js in 62_PROFILING_INFO_');
            }
            console.log('Download /api/filesuffId/' + id);
            console.log(response.data);
        }, function errorCallback(response) {
                        if (consoleLogArray.indexOf('start function errorCallback from app.js in 67') === -1) {
                consoleLogArray.push('start function errorCallback from app.js in 67');
                console.log('_PROFILING_INFO_start function errorCallback from app.js in 67_PROFILING_INFO_');
            }
            console.log('Download error', response);
        });
    };
    $scope.upload = function () {
                if (consoleLogArray.indexOf('start function null from app.js in 75') === -1) {
            consoleLogArray.push('start function null from app.js in 75');
            console.log('_PROFILING_INFO_start function null from app.js in 75_PROFILING_INFO_');
        }
        var f = document.getElementById('file').files[0];
        $scope.fd = new FormData();
        $scope.fd.append('file', f);
        $http.post(ipAWS + '/api/files', $scope.fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (response) {
                        if (consoleLogArray.indexOf('start function null from app.js in 85') === -1) {
                consoleLogArray.push('start function null from app.js in 85');
                console.log('_PROFILING_INFO_start function null from app.js in 85_PROFILING_INFO_');
            }
            refresh();
            console.log('POST Upload ok', response);
        }, function errorCallback(response) {
                        if (consoleLogArray.indexOf('start function errorCallback from app.js in 88') === -1) {
                consoleLogArray.push('start function errorCallback from app.js in 88');
                console.log('_PROFILING_INFO_start function errorCallback from app.js in 88_PROFILING_INFO_');
            }
            console.log('POST Upload not ok', response);
        });
    };
    $scope.restoreFunctions = function () {
                if (consoleLogArray.indexOf('start function null from app.js in 95') === -1) {
            consoleLogArray.push('start function null from app.js in 95');
            console.log('_PROFILING_INFO_start function null from app.js in 95_PROFILING_INFO_');
        }
        $http.get(ipAWS + '/api/restoreFunctions').then(function (response) {
                        if (consoleLogArray.indexOf('start function null from app.js in 97') === -1) {
                consoleLogArray.push('start function null from app.js in 97');
                console.log('_PROFILING_INFO_start function null from app.js in 97_PROFILING_INFO_');
            }
            console.log('GET restore functions ok', response);
        }, function errorCallback(response) {
                        if (consoleLogArray.indexOf('start function errorCallback from app.js in 99') === -1) {
                consoleLogArray.push('start function errorCallback from app.js in 99');
                console.log('_PROFILING_INFO_start function errorCallback from app.js in 99_PROFILING_INFO_');
            }
            console.log('GET files error', response);
        });
    };
});