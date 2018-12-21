# 搭建步骤
1. create react project by webpack
2. install and use Jasmine
3. install and use Enzyme with Jasmine

1. create react project by webpack
## 1.所需要的依赖

- webpack
- webpack-cli
- webpack-dev-server

> npm install --save-dev webpack webpack-cli webpack-dev-server

- babel-core
- babel-cli
- babel-loader
- babel-preset-env
- babel-preset-react
- babel-preset-stage-1

> npm install --save babel-core babel-cli babel-loader@7 babel-preset-env babel-preset-react babel-preset-stage-1

由于默认安装的 babel-core 和 babel-cli 是`6.x`的版本，而 babel-loader 是`8.x`的版本，这个版本的 babel-loader 需要`7.x`以上的 babel-core，因此要降低 babel-loader 的版本到`7.x`，以适应 babel-core 和 babel-cli。  
babel-preset-stage-1 是用于翻译class中使用箭头函数定义类方法的语法

- css-loader
- style-loader

> npm install --save css-loader style-loader

样式打包的工具，css-loader：遍历加载CSS文件，style-loader：生成style标记

- react
- react-dom

> npm install --save react react-dom

对于bable的模块，若使用`--save-dev`安装，在使用webpack命令打包项目时，很可能出现`babel-loader`找不到的异常而打包失败，此时可以将babel的所有模块卸载，重新使用`--save`选项安装，此时就可以成功执行webpack打包。然后再将所有babel模块重新用`--save-dev`安装，也可以正常工作了。

对于`css-loader`和`style-loader`也有上述的发现。

## 2.项目结构

- node_modules
- dist
  - index.html
  - bundle.js
- src
  - component
  - app.js
  - index.js
- .babelrc
- webpack.config.js
- package.json

![项目结构](readme-pic/react-project-structure-1.png)

## 3.配置文件

### webpack.config.js

```javascript
const path = require("path");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react", "stage-1"]
          }
        },
        exclude: /(node_modules|bower_components)/
        },
        // 样式加载器，必须将`css-loader`放在最后，因为use对loader的加载顺序是从后往前的，先遍历加载CSS资源，再生成style标记。
        {
            test: /\.css/,
            use: ["style-loader", "css-loader"],
            exclude: /(node_modules|bower_components)/
        }
    ]
  },
  //开启监听
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 2000
  },
  mode: "development",
  devtool: "inline-source-map",//开发调试的工具
  // webpack-dev-server的服务器配置
  devServer: {
    contentBase: "./dist",
    host: "localhost",
    port: 8888
  }
};

module.exports = config;
```

### .babelrc(可选)
若 webpack.config.js 配置 loader 的 `options` ，则可以不需要
```json
{
  "presets": ["env", "react", "stage-1"]
}

```
### package.json
webpack打包项目的命令和运行服务
```json
...
"scripts": {
    "start":"webpack-dev-server --open",
    "build": "webpack --webpack.config.js"
 }
 ...
```

## 4.文件基本结构
### index.html
1. 提供一个App的容器，如：`<div id="root"></div>`
2. 引用webpack打包后的bundle.js文件

![index.html](readme-pic/react-index-html-2.png)

### index.js
使用`ReactDOM`将APP组件渲染到index.html的容器中
![index.js](readme-pic/react-index-js-3.png)

### app.js
将其他子组件组装成一个app  
![app.js](readme-pic/react-app-js-4.png)

--------------------

# install and use Jasmine
## install and init Jasmine
1.  Add Jasmine to your package.json  
    *use local install and global install*

    > npm install --save-dev jasmine  
    > npm install -g jasmine

2.  Use `jasmine` command

    - `jasmine`: use global install
    - `node node_modules/jasmine/bin/jasmine`: use locally install

3.  Initialize Jasmine in your project

    > node node_modules/jasmine/bin/jasmine `init`  

    or  
    > jasmine `init`  

4.  Set jasmine as your test script in your package.json

```json
"scripts": { "test": "jasmine" }
```

5.  Run your tests

    > npm test

    > jasmine

    > node node_modules/jasmine/bin/jasmine.js

    // run specific test file

    > jasmine spec/appSpec.js

6.  Generate `example` spec and source files by Jasmine
    > jasmine examples

## Jasmine project structure

![jasmine测试项目结构.png](readme-pic/jasmine-test-project-structure.png)

- `spec` folder: `spec`在 Jasmine 中是`测试用例`的意思，`spec`文件夹用于存放测试文件和测试配置文件的目录，其中重要的文件就是`support/jasmine.json`
- `support` folder: `spec`的子目录，存放`jasmine.json`文件，之所以要有这一级目录，是因为 Jasmine 的源文件中指明了要在项目的`spec/support`目录下找`jasmine.json`文件
- `jasmine.json`: 项目中 jasmine 的配置文件，在**Configuration**中介绍

## Jasmine Configuration

```javascript
{
    // Spec directory path relative to the current working dir when jasmine is executed.
    "spec_dir": "spec",

    // Array of filepaths (and globs) relative to spec_dir to include
    "spec_files": [
        "**/*spec.js"
    ],

    // Array of filepaths (and globs) relative to spec_dir to include before jasmine specs
    "helpers": [
        "helper/*.js"
    ],

    // Stop execution of a spec after the first expectation failure in it
    stopSpecOnExpectationFailure: false,

    // Run specs in semi-random order
    random: false
}
```

- 使用一颗星`*`表示匹配任意字符；使用两颗星`**`则可以匹配任意目录
- 完成 Jasmine 的配置后，在编写测试文件时，无需引入 jasmine 的模块

-------------------------

# install and use Enzyme with Jasmine
## 准备
1. 搭建一个React的开发环境
2. 搭建基本的Jasmine测试环境

## 依赖模块
- enzyme
- jasmine-enzyme
- jsdom
- enzyme-adapter-react-16(针对react 16.x)

enzyme 为react测试提供核心的API  
enzyme-adapter-react-16 enzyme的react适配器，用于向Enzyme配置正确的react版本   
jasmine-enzyme 是jasmine配合enzyme使用的扩增matcher库，增加了许多UI测试的断言API，但不是必须的  
jsdom 由于nodeJS没有DOM环境，jsdom可以提供一个node的DOM环境，用于react构造组件和虚拟DOM  

- react
- react-dom
- babel-core 或 babel-register
- babel-preset-react
- jasmine

这部分依赖是在构建react和jasmine环境是要用到的，同时也是搭建Enzyme测试环境必须的依赖  

Jasmine似乎不支持ES6的一些语法(import)，所以在测试文件开头都要导入`babel-register`或`babel-core\register`进行语法的转码，而`babel-core\register`在Babel 7.x之后就从`babel-core`移除

![Jasmine的Enzyme测试环境依赖](readme-pic/jasmine-enzyme-dependency.png)

## 配置
- babel setup
- enzyme setup
- jsdom setup
- style setup

这些配置都是在测试的前期准备，可以理解为`beforeEach`，通过创建相应的配置文件，配置到`jasmine.json`的`helpers`列表中即可  

同时这些配置文件的引入顺序也要按上述的顺序

### babel setup
引入babel对ES6的语法进行翻译

```javascript
// babel.setup.js
require("babel-register");
```
或
```javascript
// babel.setup.js
require("babel-core/register");
/*
"babel-core/register" is same as "babel-register"
Since Babel7.x, "register" was removed from "babel/core"
*/
```

### enzyme setup
配置Enzyme的React适配器  
在每个spec启动前加载jasmine-enzyme

```javascript
//enzyme.setup.js
import jasmineEnzyme from "jasmine-enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

beforeEach(function() {
  jasmineEnzyme();
});
```

若不使用jasmine-enzyme，则只需要：
```javascript
//enzyme.setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
```
### jsdom setup
提供node的DOM环境，若没有DOM环境，enzyme的`mount`和`shallow`无法成功模拟react控件，测试启动会抛异常

```javascript
//jsdom.setup.js
import {JSDOM} from 'jsdom';

const dom = new JSDOM('<html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;
```

### style setup
对于Enzyme模拟的组件来说，真正去加载组件中的图片或CSS样式是比较消耗资源，也是没有必要的，因此有一些文件是必须被忽略掉的，否则

`ignore-styles`这么包可以忽略文件中导入的样式文件
> npm install --save-dev ignore-styles

在测试文件中直接导入该模块即可自动忽略CSS样式文件的加载
```javascript
import "ignore-styles";
```

### jasmine.json helpers
将所有setup文件依次添加到jasmine.json的helpers列表中

```json
{    
    "helpers": [
        "helper/babel.setup.js",
        "helper/enzyme.setup.js",
        "helper/jsdom.setup.js",
        "helper/*.js"
    ]
}
```

## 使用Enzyme
在引入被测试的组件之前，必须向引入"react"
```javascript
import React from "react";
import { mount, shallow } from "enzyme";

import TodoList from "../../src/component/todo-list";

describe("todo list", () => {
  let wrapper = {};
  beforeEach(() => {
    wrapper = shallow(<TodoList />);
  });

  it("title", () => {
    //toHaveClassName 和 toHaveClassName 都是jasmine-enzyme的断言API
    expect(wrapper.find("header")).toHaveClassName("title");
    expect(wrapper.find("header")).toHaveText("Todo List");
  });
});
```
