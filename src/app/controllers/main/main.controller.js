angular.module("Controllers", ["Services"])
    .controller("MainCtrl", ["$scope", function($scope){
        $scope.title = "Todo";
        $scope.todos = [
            {text : "AngularJSを勉強する", done : true},
            {text : "AngularJSでアプリを作る", done : false}
        ];
        $scope.doneType = "line";
        $scope.save = function(){
            LocalStorage.save("todos", $scope.todos);
        };
        $scope.load = function(){
            $scope.todos = LocalStorage.get("todos");
        };
        $scope.remove = function(){
            LocalStorage.remove("todos");
        };
}]);
