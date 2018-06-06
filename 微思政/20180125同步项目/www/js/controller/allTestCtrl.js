/*展示课程测试的控制器*/
starter.controller('allTestCtrl',['$scope','$http','$state','$stateParams','$rootScope',function($scope,$http,$state,$stateParams,$rootScope){
    $rootScope.nowCourseId = $stateParams.courseId ;

    //获取课程名称显示在导航栏
    $http({
        method:'POST',
        url:'/getQuestionByID',//定义的数据传输的接口
        data:{
            courseId:$rootScope.nowCourseId
        },
        //数据传递的类型
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(function(req) {
        $rootScope.nowCourseName = '操作系统';
    },function(err){
        console.log('获取课程名称连接出错：',err);
    });

    $('#questionButton').click(function () {
        $state.go('allQuestion',{courseId:$rootScope.nowCourseId});
    });
    $('#testButton').click(function () {
        $state.go('allTest',{courseId:$rootScope.nowCourseId});
    });

    firstTestId = 0;
    $scope.nowTest = new Object();
    $scope.nowTest.status = '';
    $http({
        method:'GET',
        url:'/all_test_list',//定义的数据传输的接口
    }).then(function(req) {
        $scope.all_tests = req.data;
        firstTestId = $scope.all_tests[0].testId;
        $scope.nowTest.id = $scope.all_tests[0].testId;
        var status = $scope.all_tests[0].status;
        if(status == 0){
            $scope.nowTest.status = '开启测试';
        }else if(status == 1){
            $scope.nowTest.status = '关闭测试';
        }else{
            $scope.nowTest.status = '程序出错';
        }
        $http({
            method:'POST',
            url:'/getQuestionByTest',//定义的数据传输的接口
            data:firstTestId,
            //数据传递的类型
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).then(function(req) {
            $scope.all_questions = req.data;
        },function(err){
            console.log(err);
        });
    },function(err){
        console.log(err);
    });

    $scope.getQuestionByTestId = function(testId){
        $scope.nowTest.id = testId;
        //新增接口-----------》获取当前测试是否开启start
        $http({
            method:'POST',
            url:'/getStatusOfTest',//定义的数据传输的接口
            data:$scope.nowTest.id,
            //数据传递的类型
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).then(function(req) {
            status = req.data[0].status;
            if(status == 0){
                $scope.nowTest.status = '开启测试';
            }else if(status == 1){
                $scope.nowTest.status = '关闭测试';
            }else{
                $scope.nowTest.status = '程序出错';
            }
        },function(err){
            console.log(err);
        });
        //新增接口-----------》获取当前测试是否开启end
        $http({
            method:'POST',
            url:'/getQuestionByTest',//定义的数据传输的接口
            data:testId,
            //数据传递的类型
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).then(function(req) {
            $scope.all_questions = req.data;
        },function(err){
            console.log(err);
        });
    };

    //查询题目所不在的测试
    $scope.allOutTest = new Array();
    $scope.getOutTest = function(questionId){
        console.log('问题ID：',questionId);
        $http({
            method:'POST',
            url:'/getOutTest',//定义的数据传输的接口
            data:questionId,//从前台传递过来的问题ID
            //数据传递的类型
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).then(function(req) {
            questionId = parseInt(questionId);
            $scope.allOutTest[questionId] = req.data;
        },function(err){
            console.log(err);
        });
    };
    //查询题目所在的测试
    $scope.allInTest = new Array();
    $scope.getInTest = function(questionId){
        console.log('问题ID：',questionId);
        $http({
            method:'POST',
            url:'/getInTest',//定义的数据传输的接口
            data:questionId,
            //数据传递的类型
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).then(function(req) {
            $scope.allInTest[questionId] = req.data;
        },function(err){
            console.log(err);
        });
    };
    //将题目添加到测试
    $scope.addQuestionToTest = function(questionId,testId){
        console.log('将题目添加到测试中：questionId:',questionId,'testId',testId);
        /*以下---向后台提交添加题目到测试的接口*/
        var data = new Object();
        data.questionId = questionId;
        data.testId = testId;
        $http({
            method:'POST',
            url:'/addQuestionToTest',//定义的数据传输的接口
            data:data,
            //数据传递的类型
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).then(function(req) {
        },function(err){
            console.log(err);
        });
    };
    //将题目从测试中删除
    $scope.deleteQuestionFromTest = function(questionId,testId){
        console.log('将题目从测试中删除：questionId:',questionId,'testId',testId);
        /*以下---向后台提交删除题目到测试的接口*/
        var data = new Object();
        data.questionId = questionId;
        data.testId = testId;
        $http({
            method:'POST',
            url:'/deleteQuestionFromTest',//定义的数据传输的接口
            data:data,
            //数据传递的类型
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).then(function(req) {
        },function(err){
            console.log(err);
        });
    };
    //添加测试表单
    $scope.addTest = function(){
        var newTest = new Object();
        newTest.testName = $scope.testName;
        newTest.description = $scope.description;
        console.log('提交的测试信息:',newTest);
        $http({
            method:'POST',
            url:'/addTest',//定义的数据传输的接口
            data:newTest,
            //数据传递的类型
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).then(function(req) {
        },function(err){
            console.log(err);
        });
    };
    //开启关闭测试的方法
    $scope.startAndCloseTest = function(testId){
        $http({
            method:'POST',
            url:'/changeStatusOfTest',//定义的数据传输的接口
            data:$scope.nowTest.id,
            //数据传递的类型
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).then(function(req) {
            console.log("测试是否开启：",req.data[0].status);
            status = req.data[0].status;
            if(status == 0){
                $scope.nowTest.status = '开启测试';
            }else if(status == 1){
                $scope.nowTest.status = '关闭测试';
            }else{
                $scope.nowTest.status = '程序出错';
            }
        },function(err){
            console.log(err);
        });
    };

}]);
