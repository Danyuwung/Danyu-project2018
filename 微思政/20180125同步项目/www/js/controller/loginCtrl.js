/*用户登录的控制器*/
starter.controller('loginCtrl',['$scope','$http','$state','$rootScope',function($scope,$http,$state,$rootScope){
    $scope.userLogin = function(){
        var user = new Object;
        user.userName = $scope.userName;
        user.password = $scope.password;
        $http({
            method : 'POST',
            url : '/userLogin',
            data : user,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(
            function(req) {
                status = req.data;
                if (status == "0") {
                    $scope.loginStatus = "用户名错误";
                } else if (status == "1") {
                    $rootScope.teacherNum = $scope.userName;
                    $state.go('main',{teacherId:$scope.userName});
                } else if (status == "2") {
                    $scope.loginStatus = "密码错误";
                }
            },
            function(err){
                $scope.loginStatus = "连接出错";
                console.log('登录出错：',err);
            }
        );
    };

}]);