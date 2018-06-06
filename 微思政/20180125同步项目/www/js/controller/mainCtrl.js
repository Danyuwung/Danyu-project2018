/*展示所有课程页面的控制器*/
starter.controller('mainCtrl', ['$scope', '$http','$rootScope', '$stateParams',function ($scope, $http,$rootScope,$stateParams) {
    var teacherId = $stateParams.teacherId;
    /*根据不同用户获取其所有的课程*/
    $http({
        method: 'POST',
        url: '/getCourseListByTeacherId',//定义的数据传输的接口
        data: teacherId,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).then(function (req) {
        $scope.allCourse = req.data;
    }, function (err) {
        console.log('获取所有课程出错：', err);
    });

    /*调用模态框*/
    $scope.getModel = function () {
        $('#myModal').modal({
            keyboard: true
        })
    };

    /*添加课程*/
    $scope.addCourse = function () {
        var fd = new FormData();
        fd.append('courseName', $scope.courseName);
        fd.append('courseAddress', $scope.courseAddress);
        fd.append('courseTime', $scope.courseTime);
        fd.append('teacherId',teacherId);
        fd.append("file", document.getElementById("coursePicture").files[0]);

        $http({
            method: 'POST',
            url: '/addCourse',//定义的数据传输的接口
            data: fd,
            //数据传递的类型
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).then(function (req) {
            code = req.data;
        }, function (err) {
            console.log('添加课程出错：', err);
        });
    };

    $scope.editCourse = function (courseid) {
        console.log(courseid, "你点击了编辑按钮");
        $('#editModal').modal({
            keyboard: true
        })
        $http({
            method: 'POST',
            url: '/getCourseInfoByCourseId',//根据课程id获取课程信息
            data: courseid,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then(function (req) {
            $scope.nowEditCourse = req.data[0];
            console.log(req.data[0]);
        }, function (err) {
            console.log('获取所有课程出错：', err);
        });
    };
    $scope.updateCourse = function () {
        var fd = new FormData();
        fd = $scope.nowEditCourse;
        $http({
            method: 'POST',
            url: '/updateCourse',//定义的数据传输的接口
            data: fd,
            //数据传递的类型
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then(function (req) {
            code = req.data;
        }, function (err) {
            console.log('添加课程出错：', err);
        });
    };
    /*删除课程*/
    $scope.deleteCourse = function (courseid) {
        console.log(courseid, "你点击了删除按钮");
        var msg=confirm("确定要删除该课程吗？");
        if(msg=true){
            $http({
                method: 'POST',
                url: '/deleteCourse',//定义的数据传输的接口
                data: courseid,
                //数据传递的类型
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            }).then(function (req) {
                code = req.data;
            }, function (err) {
                console.log('删除课程出错：', err);
            });
        }
        else
        {
            return false;
        }
    }
}]);

