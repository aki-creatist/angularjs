# Model

## 初期ファイル

### index.html

```html
<body ng-app="ToDo">

</body>
```

### index.js

```javascript
angular.module("ToDo", []);
    console.log('test_main');
```

## ルーティング

### 読込用ボタンの追加

```bash
vim index.html
```

```html
<div ui-view></div>
<button class="mr10 btn btn-default" ui-sref="page-A">pageA</button>
```

## ルーティングの追加

```bash
vim app/index.js
```

```javascript
angular.module('ToDo', ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('page-A', {
                url: '/',
                templateUrl: 'app/controllers/main/main.html',
                controller: 'MainCtrl'
            })
    });
```

## コントローラの追加

### main.controller.js

```bash
touch app/controllers/main/main.controller.js
```

```javascript
angular.module("Controllers", [])
    .controller("MainCtrl", ["$scope", function($scope){
    $scope.title = "ToDo";
}]);
```

### index.js

* モジュール名が異なるため、コントローラが見つからない
* `Controller`を追加することで`MainCtrl`を見つけられるようにする

```diff
- angular.module('ToDo', ['ui.router'])
+ angular.module('ToDo', ["Controllers", 'ui.router'])
```

### main.html

```bash
touch app/controllers/main/main.html
```

```html
<h1>{{title}}</h1>
```

## チェックボックスの追加

### main.html

```html
<ul>
  <li ng-repeat="todo in todos">
    <label><input type="checkbox" ng-model="todo.done">{{todo.text}}</label>
  </li>
</ul>
```

### main.controller.js

* 下記を追加する

```javascript
$scope.todos = [
    {text : "AngularJSを勉強する", done : true},
    {text : "AngularJSでアプリを作る", done : false}
];
```

## スタイルを追加する

### main.html

```diff
- <li ng-repeat="todo in todos">
+ <li ng-repeat="todo in todos" ng-class="{ done : todo.done }">
```

### app/index.css

```css
li.done {
  text-decoration : line-through;
}
```

## 取り消し線の表示/非表示

### main.html

```html
<h1>{{title}}</h1>
<label><input type="radio" ng-model="doneType" value="line">取り消し線</label>
<label><input type="radio" ng-model="doneType" value="hide">非表示</label>
<ul ng-class="doneType">
  <li ng-repeat="todo in todos" ng-class="{ done : todo.done }">
    <label><input type="checkbox" ng-model="todo.done">{{todo.text}}</label>
  </li>
</ul>
```

### main.controller.js

* １行追加

```javascript
$scope.doneType = "line";
```

### index.css

* 下記のように書き換える

```css
ul.line li.done{
  text-decoration : line-through;
}
ul.hide li.done {
  display : none;
}
```

### main.html

```diff
- <ul>
+ <ul ng-class="doneType">
```

## 追加機能の実装

### index.js

```diff
- angular.module('ToDo', ["Controllers", 'ui.router'])
+ angular.module('ToDo', ["Controllers", "Directives", 'ui.router'])
```

### main.html

```diff
+ <div add-todo todos="todos"></div>
```

### directives.js

* 下記を新規作成

```javascript
angular.module("Directives", [])
    .directive("addTodo", function(){
        return {
            restrict : "A",
            replace : true,
            scope : { todos : "=todos" },
            template : "<div><input ng-model='text'><button>追加</button></div>",
            link : function(scope, element) {
                var button = angular.element(element.children()[1]);
                button.bind("click", function(){
                    scope.todos.push({text : scope.text, done : false});
                    scope.text = "";
                    scope.$apply();
                });
            }
        };
    });
```

## ローカルストレージの利用


### index.js

```diff
- angular.module('ToDo', ["Controllers", "Directives", 'ui.router'])
+ angular.module('ToDo', ["Controllers", "Directives", "Services", 'ui.router'])
```

### main.html

* 下記の2行を追加

```html
<button ng-click="save()">保存</button>
<button ng-click="load()">呼び出し</button>
```

### services.js

```javascript
angular.module("Services", []).factory("LocalStorage", ["$window", function($window){
    var localStorage = $window.localStorage;
    return {
        save : function(key,  data){
            var str = JSON.stringify(data);
            localStorage.setItem(key, str);
        },
        get : function(key){
            var str = localStorage.getItem(key);
            return JSON.parse(str);
        },
        remove : function(key){
            return localStorage.removeItem(key);
        }
    };
}]);
```

### main.controller.js

```diff
- angular.module("Controllers", [])
+ angular.module("Controllers", ["Services"])
```

* 下記を追加

```javascript
$scope.save = function(){
    LocalStorage.save("todos", $scope.todos);
};
$scope.load = function(){
    $scope.todos = LocalStorage.get("todos");
};
$scope.remove = function(){
    LocalStorage.remove("todos");
};
```