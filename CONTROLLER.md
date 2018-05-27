# Controller

## 概要

* AngularJSのコントローラ

## 基本となるディレクトリ構成

```text
src
├── app
│   ├── controllers
│   │   └── main
│   │       └── main.controller.js
│   └── index.js
└── index.html
```

# 1

* 基本
    * アプリケーション名を明示する(ここでは`Hello`)
    * コントローラ名を明示する(ここでは`HelloCtrl`)

```html
<body ng-app="Hello">
<div ng-controller="HelloCtrl">
    <p ng-bind="hello.text"></p>
    <p>{{hello.text}}</p>
</div>
</body>
```

```javascript
var app = angular.module("Hello", []);
app.controller("HelloCtrl", function($scope){
  $scope.hello = {
    text : "Hello"
  };
});
```

# 2

```html
<div ng-bind-template="{{hello.salution}} {{hello.name}}!!"></div>
```

```javascript
$scope.hello = {
    salution : "Hello",
    name : "World"
};
```

# 3

```css
p {
    color : blue;
}
.red {
    color : red;
}
```

```html
<div ng-controller="HelloCtrl" ng-init="hello.class='red'">
    <p ng-class="hello.class">Hello, World!!</p>
</div>
```

# 4

```html
<div ng-controller="HelloCtrl" ng-init="hello.disabled=true">
    <button ng-disabled="hello.disabled">Hello, World!!</button>
</div>
```

# 5

```html
<form name="outerForm">
    <ng-form name="innerForm">
        <input type="text" name="text" ng-model="formText" required>
        <span ng-show="innerForm.text.$error.required">Required!!</span>
    </ng-form>
</form>
```

# 6

```html
<a ng-href="{{hello.link}}">Hello, Link!!</a>
<a ng-href="{{hello.noLink}}">Hello, NoLink!!</a>
```

```javascript
$scope.hello = {
    link : "Hello",
    noLink : ""
};
```

# 7

## index.html

```html
<div ng-init="hello.src='hello.html'">
    <div ng-include src="hello.src"></div>
</div>
```

## hello.html

```html
<h1>{{hello.text}}</h1>
<p>from hello.html</p>
```

## app.js

```javascript
var app = angular.module("Hello", []);
app.controller("HelloCtrl", function($scope){
    $scope.hello = {
        src : "hello.html",
        text : "Hello, World"
    };
});
```

# 8

## index.html

```html
<div ng-init="hello.text='Wow!!'; hello.name='World'">
    <p>{{hello.text}} {{hello.name}}</p>
</div>
```

## app.js

```javascript
$scope.hello = {
    link : "Hello",
    noLink : ""
};
```

# 9

```html
<input ng-list ng-model="names">{{names.length}}
```

# 10

* プルダウンメニュー

```html
<select ng-multiple="hello.multiple">
    <option>hello</option>
    <option>world</option>
    <option>angularjs</option>
</select>
```

```javascript
$scope.hello = {
    multiple : true
};
```

## 11

```html
<div>{{1+2}}</div>
<div ng-non-bindable>{{1+2}}</div>
```

## 12

* テキストボックス

```html
Player 1:<input type="text" ng-model="player1" value="Yoshida"><br>
Player 2:<input type="text" ng-model="player2" value="Tanaka"><br>
Number of Players:<input type="text" ng-model="playerCount" value="1"><br>
<ng-pluralize count="playerCount" when="{'0': 'Nobody.',
                                      'one': '1 player.',
                                      'other': '{} players.'}">
</ng-pluralize><br>
<ng-pluralize count="playerCount" offset=2 when="{'0': 'Nobody.',
                                               '1': '{{player1}}.',
                                               '2': '{{player1}} and {{player2}}.',
                                               'one': '{{player1}}, {{player2}} and one players.',
                                               'other': '{{player1}}, {{player2}} and {} players.'}">
</ng-pluralize>
```

```javascript
$scope.player1 = "Yoshida";
$scope.player2 = "Tanaka";
$scope.playerCount = "1";
```

# 13

* チェックボックス

```html
Readonly: <input type="checkbox" ng-model="hello.read">
<input type="text" ng-readonly="hello.read" value="Hello, World">
```

```javascript
$scope.hello = {
    read : true
};
```

# 14

```css
  .first {
    color : red;
  }
  .middle {
    color : green;
  }
  .last {
    color : blue;
  }
```

```javascript
$scope.people = [
    { name : "Sato", age : 30 },
    { name : "Takahashi", age : 25 },
    { name : "Ito", age : 14 },
    { name : "Watanabe", age : 35 },
    { name : "Kobayashi", age : 25 },
    { name : "Yoshida", age : 26 },
    { name : "Sasaki", age : 29 }
];
```

```html
<ul>
    <li ng-repeat="person in people" ng-class="{first:$first, middle:$middle, last:$last}">Player {{$index+1}} - {{person.name}} {{person.age}} years</li>
</ul>
```

# 15

* 偶数が赤
* 奇数が緑

```css
  .odd {
    color : red;
  }
  .even {
    color : green;
  }
```

```html
<ul>
    <li ng-repeat="person in people" ng-class-odd="'odd'" ng-class-even="'even'">Player {{$index+1}} - {{person.name}} {{person.age}} years</li>
</ul>
```

# 16

* プルダウン

```html
<select ng-init="selected=true">
    <option>Hello</option>
    <option ng-selected="selected">World</option>
    <option>Hello World</option>
</select>
```

```javascript
var app = angular.module("Hello", []);
app.controller("HelloCtrl", function($scope){});
```

# 17

* テキストを緑にする

```html
<div ng-init="colorStyle={color:'green'}">
    <p ng-style="colorStyle">Hello World!!</p>
</div>
```

# 18

```html

<form ng-submit="submit()">
    <input type="text" name="text" ng-model="text">
    <input type="submit" value="Submit">
    <p>Hello {{word}}</p>
</form>
```

```javascript
$scope.submit=function(){
    $scope.word = $scope.text;
};
```

# 19

```html
<div ng-init="items=['hello', 'world', 'other'];selection=items[0]">
    <select ng-model="selection" ng-options="item for item in items">
    </select>
    <div ng-switch on="selection">
        <div ng-switch-when="hello">Hello Div</div>
        <span ng-switch-when="world">World Span</span>
        <p ng-switch-default>Hello World Default</p>
    </div>
</div>
```

```javascript
var app = angular.module("Hello", []);
app.controller("HelloCtrl", function($scope){

});
```

# 20

* プルダウンメニューで選択した項目が表示される

```html
<div>
    <select ng-model="selection" ng-options="item for item in items">
    </select>
    <span>{{selection}}</span>
</div>
```

```javascript
$scope.items = [
    "吉田", "田中", "山田"
];
$scope.selection = $scope.items[0];
```

# 21

```javascript
$scope.items =[
    {id : "Yoshida", name : "吉田", group : "や行"},
    {id : "Tanaka", name : "田中", group : "た行" },
    {id : "Yamada", name : "山田", group : "や行"}
];
$scope.selection = $scope.items[0].id;
```

```html
<div>
    <select ng-model="selection" ng-options="item.id as item.name for item in items">
    </select>
    <span>{{selection}}</span>
</div>
```

# 22

```javascript
$scope.items =   $scope.items = {
    "Yoshida": "吉田",
    "Tanaka" : "田中",
    "Yamada" : "山田"
};
$scope.selection = $scope.items.Yoshida;
```

```html
<div>
    <select ng-model="selection" ng-options="value for (key, value) in items">
    </select>
    <span>{{selection}}</span>
</div>
```

# 23

```html
<div>
    <select ng-model="selection" ng-options="key as value for (key, value) in items">
    </select>
    <span>{{selection}}</span>
</div>
```

```javascript
$scope.items =   $scope.items = {
    "Yoshida": "吉田",
    "Tanaka" : "田中",
    "Yamada" : "山田"
};
$scope.selection = "Yoshida";
```

# 24

```javascript
$scope.items = {
    "Yoshida" : {
        "group" : "や行",
        "name" : "吉田"
    },
    "Yamada" : {
        group : "や行",
        name : "山田"
    },
    "Tanaka" : {
        group : "た行" ,
        name : "田中"
    }
};
$scope.selection = $scope.items.Yoshida;
```

```html
<div>
    <select ng-model="selection" ng-options="value.name group by value.group for (key, value) in items">
    </select>
    <span>{{selection}}</span>
</div>
```

# 25

```javascript
$scope.items = {
    "Yoshida" : {
        "group" : "や行",
        "name" : "吉田"
    },
    "Yamada" : {
        group : "や行",
        name : "山田"
    },
    "Tanaka" : {
        group : "た行" ,
        name : "田中"
    }
};
$scope.selection = "Yoshida";
```

```html
<div>
    <select ng-model="selection" ng-options="key as value.name group by value.group for (key, value) in items">
    </select>
    <span>{{selection}}</span>
</div>
```

# 26

```javascript
var app = angular.module("Hello", []);
app.controller("HelloCtrl",["$scope", "$document", function($scope, $document){
    $document.append("<b>Hello</b>");
}]);
```

```html
<div ng-bind-html-unsafe="hello.html"></div>
```

# 27

```javascript
var app = angular.module("Hello", []);
app.controller("HelloCtrl", ["$scope", "$http", function($scope, $http){
    $http({method : "GET", url : "hello.json"}).success(function(data, status, headers, config){
        console.log(data);
    }).error(function(data, status, headers, config){
        console.log(status);
    });
}]);
```

## hello.json

```json
{
  "hello": "world"
}
```

# 28

```html
<div ng-controller="HelloCtrl">
</div>
```

```javascript
var app = angular.module("Hello", []);
app.controller("HelloCtrl", ["$scope", "$location", function($scope, $location){
    console.log($location.absUrl());
}]);
```

## コントローラを複数使用する場合

```html
<body ng-app="controllers">
<div ng-controller="MainCtrl as main">
  <div ng-controller="OtherCtrl as other">
    <p>{{main.text}}</p>
    <p>{{other.text}}</p>
  </div>
</div>
</body>
```

```javascript
var app = angular.module("controllers", []);
app.controller("MainCtrl", function(){
    this.text = "This is MainCtrl.";
});
app.controller("OtherCtrl", function(){
    this.text = "This is OtherCtrl.";
});
```

## 反復処理

```html
<body ng-app="controllers">
    <div ng-controller="MainCtrl">
        <p ng-repeat="value in items track by $index">{{value}}</p>
    </div>
</body>
```

```javascript
var app = angular.module("controllers", []);
app.controller("MainCtrl", function($scope){
    $scope.items =["ng", "ng"];
});
```