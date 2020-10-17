---
title: 从零开始用Vue打造在线音乐播放器
date: 2020-02-10 18:27:00
categories: linux
urlname: 177
tags:
---
<!--markdown-->##### 		最近把Vue刷了一遍,反正疫情这么严重,在家闲着也是闲着,就想练一下Vue.
项目地址: https://github.com/6yi/Music_APP_Vue
##### 		废话不多说,我的目标是打造一个在线音乐播放器,类似网易云那种,那我们现在就开始



### 主要的技术栈
```shell
html+css+js	//基本的网页设计
webpack        //前端的模块化开发
Vue.js         // 前端开发框架
```



# Day01

##### 		我的Vue和webpack也是简单的学了下,所以这个项目边做可能还要边学习,没关系

##### 		因为我已经装好了nodejs和vue-cli,所以直接用Vue-cli建立项目,因为我们肯定需要用到路由功能,所以顺便装一下Vue-router

```shell
vue init webpack Music_app

npm install vue-router --save
```

##### 这个就是项目目录了,我们需要在src里写代码

<img src="http://59.110.173.180:9090/static/SavePic/9a806de2fa158be5c6ede871d3563b9d微信截图_20200211013735.png"/>

?	

### 接下来我会发代码,并且把项目里的路径标在最上面



##### 把多余的东西去掉,在main.js里引入router

##### 下面这个便是Vue项目的入口函数main.js了,我们引入了APP这个模板,并且在index.html的app元素里插入'APP',这就相对于我们插入了个组件,我们写的东西都会在APP这个组件里显示.

(前端模块化开发我也是一边做一边学的,如果说的不好大神勿喷)

```javascript
#path="./src/main.js"
import Vue from 'vue'
import App from './App'
import router from './router'

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

```

##### index.html

```html
#path="./index.html"
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>music_app</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```



##### 接着就去APP这个组件里面把结构写好把

##### 我的想法是这样的,先要有个头,显示APP信息和个人资料页入口啥的,所以来个'mhead'组件,然后就是选择面板,比如是推荐呀,还是排行榜什么的,所以来个'mtable',再来就是路由视图了,从mtable里选择组件显示

###### (我这里为了方便把所有元素的边距都给去掉了,不知道大伙们有啥更好的办法)

```html
#path="./src/APP.vue"
<template>
  <div id="app">
	<mhead></mhead>
	<mtable/>
    <router-view/>
  </div>
</template>
<script>
import mhead from './components/mhead/mhead.vue'
import mtable from './components/table/mtable.vue'
export default {
  name: 'App',
	components:{
		mhead,mtable
	}
}
</script>
<style>
*{
	margin: 0;
	padding: 0;
}
#app {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
}
</style>
```



##### 那下一步就是去写mhead组件,这里就是简单的写了项目标题,并且有两个图标,一个是搜索,一个是个人详细,我就先写了个路由,具体页面还没写

```html
#path="./src/components/mhead/mhead.vue"
<template>
  <div class="m-header">
    <h1 class="text">Music</h1>
    <router-link to="/user" class="mine" tag="div">
     <img class="icon-list" src='../../common/icon/list.png'></img>
    </router-link>
    <router-link to="/search" class="search" tag="div">
      <img class="icon-search" src="../../common/icon/search.png"></img>
    </router-link>
  </div>
</template>
<script>
export default {
	name:"mhead"
}
</script>
<style>
.search{
		position: absolute;
	    top: 4px;
	    right: 2px;
		.iconfont {
		    display: block;
		    padding: 12px;
		    font-size: 18px;
		    color: #d44439-l;
		}
}
.mine {
    position: absolute;
    top: 4px;
    left: 2px;
    .iconfont {
        display: block;
        padding: 11px;
        font-size: 22px;
        color: #d44439-l;
    }
  }
.icon-list{
	width: 30px;
}
.icon-search{	
	width: 30px;
}
.text{
	font-family: "courier new";
    line-height: 44px;
    font-weight: bold;
    color: white;
    letter-spacing: 3px;
  }
  
.m-header {
  padding: 0;
  margin-top: 0;
  position: relative;
  height: 44px;
  width: 100%;
  text-align: center;
  background: #d44439;
 
}
</style>
```

##### 好,接着干,把mtable也弄完,一样是先写好路由

```html
#path="./src/components/mhead/mtable.vue"
<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span>推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span>排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span>歌手</span>
    </router-link>
  </div>
</template>
<script>
export default {
	name:"mtable"
}
</script>
<style>
.tab{
	display: flex;
	line-height: 44px;
	height: 44px;
	width: 100%;
	font-size: 14px;
	background: rgb(212, 68, 57);
}
.tab-item {
    flex: 1; 
	display: block;
	width: 33%;
	text-align: center;
    color: rgb(228, 228, 228);
}
span{
	padding-bottom: 3px;
}
</style>
```

##### 我们来看看现在简单的效果,好像还可以对吧

<img src="http://59.110.173.180:9090/static/SavePic/1c54c8fb336d41c231a5ab9272531a09微信截图_20200211020008.png"/>



##### 那我们接下来就要把推荐页面写了,这里有个难点,就是轮播图,我们需要再最上面放个每日推荐轮播,然后下面是每日推荐歌单.

##### 所以我们应该先去写个轮播组件,我本来是打算自己写的,奈何功夫不到家,写了很久都不满意,就用swiper这个组件了,我们直接看代码

##### 引入swiper这个组件需要先用npm下载

```shell
npm install vue-awesome-swiper --save
```

##### 标签里带swiper都是引用的组件,我们的banner图数据是由recommend组件里传进来的,所以等等我们还需要写个js API文件去获取网易云数据,我没有把css样式给放出来,太长会影响阅读

```html
<template>
	  <div id="sl" class="banner" >
		<swiper :options="swiperOption" class="bannerspan">
            <swiper-slide v-for="(item,index) in recommends" :key="index" >
			<a :href="item.url">
				<img class="bannerimg" :src="item.picUrl">
			</a>
		</swiper-slide>	        
      <div class="swiper-pagination " slot="pagination"></div>         
		</swiper>
	</div>	
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.min.css'
  export default {
    name: 'App',
	props:['recommends'],
	components:{
	  swiper,
	  swiperSlide
	},
	  data () {
	    return {
	      swiperOption:{
			autoplay:true,
			autoHeight:true,
	        slidesPerView: 'auto',
	        centeredSlides:true,
	        spaceBetween: 10,
	        loop:true,
	        speed:600, 
			pagination: {
			          el: '.swiper-pagination',
			          type: 'bullets'
			        }
	      }
	    }
	  },
  }
</script>
```

##### 这就是轮播组件了,等等我们只需要在recommend组件里把数据给他并且插入就好了,所以我们再回到recommend组件的编写

##### 我最不擅长的就是写样式了,但是这部分的样式很重要,我也调了很久,不过看着很乱,不好意思 ,我们说重点,我们引用用了Scroll,这是一个第三方的组件,用于页面下拉回弹效果,还有就是我的轮播组件mylb,并且引用了API.js文件,这是用于获取网易云数据的,先写了两个方法,分别去获取每日banner和每日歌单,把每日banner数据给轮播组件,再用for循环生成每日推荐歌单

### 再说一次,这部分的重点是CSS样式,有个很重要的点,我会仔细说

```html
#path="./src/commpents/recommend/recommend.vue"
<template>
  <scroll class="recommend" ref="recommend" >
	  <div class="recommend-content" ref="scroll" >
		  <div class="decorate">
			  <mylb v-bind:recommends="banner"></mylb>
		  </div>  
		   <div class="recommend-list" ref="recommendList">
			     <h1 class="title">推荐歌单</h1>
					<ul>
						<li class="item" v-for="item in playList" :key="item.id">
						  <div class="icon" @click="selectList(item)">
							<div class="gradients"></div>
							<img v-lazy="item.picUrl">
						  </div>
						  <div class="t">
						    <p class="name">{{item.name}}</p>
						  </div>
						</li>
					</ul>
			</div>				   		  
	  </div>
  </scroll>
</template>
<script>
import Scroll from '../../base/scroll/scroll'
import mylb from '../../base/mylb/lb.vue'
import {getBanner, getRecommendList, getRecommendMusic} from '../../API/recommend.js'
  export default {
    name: 'App',
	components: {
	  Scroll,mylb
	},
	data(){
		return{
			banner: [],
			playList: [],
		}
	},
	created () {
	  this._getBanner()
	  this._getRecommendList()
	},
	methods:{
		_getBanner(){
		  getBanner().then((res) => {
		    if (res.status === 200) {
			let list = res.data.banners
			this.banner = list.splice(4)
		      console.log(this.banner)
		    } else {
		      console.error('Banner 获取失败')
		    }
		  })
		},
	_getRecommendList () {
	  getRecommendList().then((res) => {
	    if (res.status === 200) {
	      this.playList = res.data.result
		  console.log(this.playList)
	    } else {
	      console.error('getRecommendList 获取失败')
	    }
	  })
	},
    },	
  }
</script>
<style>
	.name{
		font-size: 10px;
		margin-bottom: 10px;
	}
	.recommend-list{
		margin-top: 20px;
	}
img {
		width: 100%;
		height: 100%;
		border-radius: 3px;
   }		  
.gradients {
	  position: absolute;
	  top: 0;
	  width: 100%;
	  height: 35px;
	  border-radius: 3px;
	  background: linear-gradient(rgba(109, 109, 109, 0.4),rgba(255, 255, 255, 0));
}	
.item {
		display:inline-block;
        position: relative;
        box-sizing: border-box;
        width: 33%;
        padding: 0 2%;
		margin: 10px auto;
		
}
 .icon {
          position: relative;
          display: inline-block;
          width: 100%;
		
          margin-bottom: 5px;
}
.title {
        height: 65px;
        line-height: 65px;
        padding-left: 1.5%;
        text-align: left;
        font-size: 20px;
        font-weight: bold;
        color: $color-text;
    }
.recommend{
	overflow: hidden;
	position: fixed;
	width: 100%;
	top: 88px;
	bottom: 0;
	z-index: -99;
}
.content{
	width: 100%;
	height: 1400px;
}
 .decorate{
	 align-items: center;
	 background-color: #D44439;
	 width: 100%;
	 height: 120px;
	 z-index: -99;
 }
</style>

```

##### 

##### 这部分看完我们再去写API接口用于获取数据

##### 引如了axios库用于ajax请求,我们的请求地址是一个host变量

```javascript
#path="./src/API/recommend.js"
import axios from 'axios'
const host="http://musicapi.leanapp.cn"

export function getBanner () {
  const url = host + '/banner'
  return axios.get(url)
}
export function getRecommendList () {
  const url = host + '/personalized'
  return axios.get(url)
}
```

### 该API提供项目为:<a href='https://github.com/Binaryify/NeteaseCloudMusicApi'>网易云API</a>

### 对作者表示感谢



#### 做完这些我们再去看看效果
<img src="http://59.110.173.180:9090/static/SavePic/d02b9244a5a2ea2b7228ebe9173b9da7微信截图_20200211022150.png"/>


####  哦吼,看着好像差不多,但是又奇奇怪怪是吧,没错,就是li标签没对齐,为什么会造成这样呢,其实就是那个文字数量的问题,因为li标签是挨着上一个标签结束产生的,所以当你的字多一行时,那么下一个标签就会比上一个标签高度降低一行,那我们怎么解决呢

#### 改CSS样式,这个就是li标签,我们先是写了display:inline-block,让他们都在一行显示,这还不够,得再加一个vertical-align:top,这样就保证对齐了

```css
.item {
		display:inline-block;
        position: relative;
        box-sizing: border-box;
        width: 33%;
        padding: 0 2%;
		margin: 10px auto;
		vertical-align:top;
}
```



##### 让我们再看看效果
<img src="http://59.110.173.180:9090/static/SavePic/860dc46524f4bb7f0e371e34083565fe微信截图_20200211022620.png"/>


##### 可以,完美了



#### 那今天就先到这里吧.

2019/2/11


# Day?

#### 哈哈,鸽了很多天,其实每天都有在写,就是笔记没有一直做.我觉得这玩意说起来太复杂,索性不记录了.....



### 现在为止的完成度

<img src='http://59.110.173.180:9090/static/SavePic/14143b6dd629a5d9f66567bf7933c3bf微信截图_20200215211242.png'/>
<img src='http://59.110.173.180:9090/static/SavePic/8bb5757d2fb3f927712075808069ae49微信截图_20200215211911.png'/>
<img src='http://59.110.173.180:9090/static/SavePic/cc42f7219f609294fe8b9492cafc1736微信截图_20200215211505.png'/>



### 基础功能还需要实现的有:      歌词同步       列表播放

#### 其它功能基本上套上我之前写的组件很快能搞定



#### 害,慢慢写吧

2019/2/15