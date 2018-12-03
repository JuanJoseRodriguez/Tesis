function $dl(scriptURL){if(!window.uffs){window.uffs = {};}if(!window.uffs[scriptURL]){var xhReq = new XMLHttpRequest();xhReq.open("GET", scriptURL, false);xhReq.send(null); window.uffs[scriptURL] = xhReq.responseText;}return window.uffs[scriptURL];}
angular.module('app', []).controller('myController', function ($scope, $http) {
        eval($dl('http://192.168.1.10:3000/api/filesuff/$_-7783129281543274165815.js'));
});
