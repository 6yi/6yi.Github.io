---
title: React使用mobx
date: 2020-05-24 03:03:00
categories: 前端
urlname: 235
tags:
---
<!--markdown-->?		在react中使用Mobx我们需要做一些小配置,因为mobx有修饰器语法,这个是ES7的提案不是正式语法.



### 安装mobx本地

```cmd
npm install mobx --save
npm install mobx-react --save
```

### 安装装饰器插件

```cmd
npm install @babel/plugin-proposal-decorators --save
npm install babel-plugin-transform-decorators-legacy  --save
```

### 在package.json里添加配置

```cmd
  "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ]
    ]
  },
```

### 修改vscode这个配置

![image-20200524105631642](https://gitee.com/lzhengycy/Pic/raw/master/img/20200524105633.png)

### 重启vscode





### 简单使用

在src下创建文件

```javascript
import { observable, computed,action} from "mobx";
import moment from 'moment'
class AppStore {
    @observable time = '2020';
    @observable todos = ["haha","66"];

    @action addTodo(todo){this.todos.push(todo)}
    @action deleteTodo(){this.todos.pop()}
    @action resetTodo(){this.todos=[]}
    @action changeTime(){
        this.time = moment().format('YYYY-MM-DD HH:mm:ss')
    }

    @computed get desc(){
        return `${this.time} has ${this.todos.length}`
    }
}

const store=new AppStore()

setInterval(()=>{
    store.changeTime();
},1000)

export default store
 
```

@observable声明是状态变量

@action 是状态改变函数

@computed 是计算属性

将store暴露出去



先在入口函数里引入mobx提供的Provider组件进行包裹才能获取到状态

```javascript
import React from 'react'
import {Provider} from 'mobx-react'
import store from '../../store/index'
import Pages from '../mobxPages/mobxpages'

export function Mmobx(){
    return (
        <div>
          <Provider store={store}>
            <Pages/>
          </Provider>
        </div>
    )
}
```



在其它地方的应用

```javascript
import React from 'react'
import {
    inject,
    observer
} from 'mobx-react'

@inject('store') @observer

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
   
    handAdd=()=>{
        let {store} =this.props;
        store.addTodo('new Item')
    }

    handDelete=()=>{
        let {store} =this.props;
 
        store.deleteTodo()
    }

    handReset=()=>{
        let {store} =this.props;
    
        store.resetTodo()
    }
    render() { 
        let {store} =this.props;
        return (
            <div>
                <p>Mobx</p>
                <p>{store.desc}</p>
                <button onClick={this.handAdd}>add</button>
                <br/>
                <br/>
                <button onClick={this.handDelete}>delete</button>
                <br/>
                <br/>
                <button onClick={this.handReset}>reset</button>
                {
                    store.todos.map((ele,index,arr)=>{
                        return(
                            <div key={index}>{ele}</div>
                        )
                    })
                }
            </div>

         );
    }
}
 
export default Pages;
```

@inject('store') @observer 引入store这个状态并且观察变化



