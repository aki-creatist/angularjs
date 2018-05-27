angular.module('ToDo', ["Controllers", "Directives", "Services", 'ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('page-A', {
                url: '/',
                templateUrl: 'app/controllers/main/main.html',
                controller: 'MainCtrl'
            })
    });
