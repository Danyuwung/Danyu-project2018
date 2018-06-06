starter.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRourtProvider){
    $urlRourtProvider.otherwise('login');
    $stateProvider
        .state('login',{
            url : '/login',
            templateUrl : 'templates/login.html',
            controller : 'loginCtrl'
        })
        .state('main',{
            url : '/main/:teacherId',
            templateUrl : 'templates/main.html',
            controller : 'mainCtrl'
        })
        .state('allQuestion',{
            url : '/all_question/:courseId',
            templateUrl : 'templates/all_question.html',
            controller : 'allQuestionCtrl'
        })
        .state('allTest',{
            url : '/all_test/:courseId',
            templateUrl : 'templates/all_test.html',
            controller : 'allTestCtrl'
        })
        .state('visualization',{
            url : '/visualization',
            templateUrl : 'templates/visualization.html'
        });

}]);