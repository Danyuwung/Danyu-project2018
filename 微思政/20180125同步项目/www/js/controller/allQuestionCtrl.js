/*展示课程题库的控制器*/
starter.controller('allQuestionCtrl',['$scope','$http','$state','$stateParams','$rootScope',function($scope,$http,$state,$stateParams,$rootScope){
    $rootScope.nowCourseId = $stateParams.courseId ;

    //获取课程名称显示在导航栏
    $http({
        method:'POST',
        url:'/getCourseNameByCourseId',//定义的数据传输的接口
        data:$rootScope.nowCourseId,
        //数据传递的类型
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(function(req) {
        $rootScope.nowCourseName = req.data[0].courseName;
    },function(err){
        console.log('获取课程名称连接出错：',err);
    });

    //根据课程ID获取所有的分组
    $scope.firstGroupId = 0;
    $http({
        method:'POST',
        url:'/group_list_nums', //定义的数据传输的接口
        data:$rootScope.nowCourseId,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(function(req) {
        $scope.all_groups = req.data;
        $scope.firstGroupId = req.data[0].id;
        $http({
            method: 'POST',
            url: '/getQuestionByID',//定义的数据传输的接口
            data: $scope.firstGroupId,
            //数据传递的类型
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then(function (req) {
            $scope.all_questions = req.data;
        }, function (err) {
            console.log(err);
        });
    });

    $scope.getQuestionByGroupId = function(groupId){
        $http({
            method:'POST',
            url:'/getQuestionByID',//定义的数据传输的接口
            data:groupId,
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
            console.log('返回的题目所不的测试：',req.data);
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
            console.log('返回的题目所不的测试：',req.data);
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
            console.log(req);
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
            console.log(req);
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
            console.log(req);
        },function(err){
            console.log(err);
        });
    };

    $('#questionButton').click(function () {
        $state.go('allQuestion',{courseId:$rootScope.nowCourseId});
    });
    $('#testButton').click(function () {
        $state.go('allTest',{courseId:$rootScope.nowCourseId});
    });

    /*显示正确答案*/
    $scope.show_answer = function(is_check,is_true){
        if(is_check == true && is_true == 1){
            return true;
        }else{
            return false;
        }
    }

    /*向题库中添加新的题目*/
    $http({
        method:'GET',
        url:'/group_list',//定义的数据传输的接口
    }).then(function(req) {
        $scope.all_groups = req.data;
    },function(err){
        console.log(err);
    });

    /*以下是11月28日新增部分---获取所有的题目分组*/
    $scope.add_question = function(){
        form_data = new Object();
        form_data.title = $scope.title;
        form_data.type = $scope.type;
        form_data.group_id = $scope.group;
        is_true = [];
        all_check = document.getElementsByName("is_true");
        for(var i=0; i<all_check.length; i++){
            if(all_check[i].checked)
                is_true.push(all_check[i].value)
        }
        form_data.question_options = new Array();
        var options = new Object();
        if($.inArray("1", is_true)>=0){
            options = new Object();
            options.option = $scope.option1;
            options.is_true = 1;
            form_data.question_options.push(options);
        }else{
            options = new Object();
            options.option = $scope.option1;
            options.is_true = 0;
            form_data.question_options.push(options);
        }
        if($.inArray("2", is_true)>=0){
            options = new Object();
            options.option = $scope.option2;
            options.is_true = 1;
            form_data.question_options.push(options);
        }else{
            options = new Object();
            options.option = $scope.option2;
            options.is_true = 0;
            form_data.question_options.push(options);
        }
        if($.inArray("3", is_true)>=0){
            options = new Object();
            options.option = $scope.option3;
            options.is_true = 1;
            form_data.question_options.push(options);
        }else{
            options = new Object();
            options.option = $scope.option3;
            options.is_true = 0;
            form_data.question_options.push(options);
        }
        if($.inArray("4", is_true)>=0){
            options = new Object();
            options.option = $scope.option4;
            options.is_true = 1;
            form_data.question_options.push(options);
        }else{
            options = new Object();
            options.option = $scope.option4;
            options.is_true = 0;
            form_data.question_options.push(options);
        }
        console.log('form_data:',form_data);
        $http({
            method:'POST',
            url:'/header',//定义的数据传输的接口
            data:form_data,
            //数据传递的类型
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            /*transformRequest: function(obj) {
                var str = [];
                for (var p in obj) {
                    if(p != "question_options")
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    else{
                        for (var q in obj[p]){

                        }
                    }
                }
                return str.join("&");
            }*/
        }).then(function(req) {
            console.log(req);
        },function(err){
            console.log(err);
        });
        $state.go('show_question');
    }
}]);