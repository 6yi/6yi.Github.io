(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{548:function(s,t,a){"use strict";a.r(t);var n=a(5),r=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[s._v("frp是内网穿透工具,ss是代理工具,这两个组合起来就可以做成一个内网VPN,具体应用场景嘛,那就是在外访问学校内网啥的了...\n"),a("h4",{attrs:{id:"废话不多说了-先在客户端上配置一下frp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#废话不多说了-先在客户端上配置一下frp"}},[s._v("#")]),s._v(" 废话不多说了,先在客户端上配置一下frp")]),s._v(" "),a("div",{staticClass:"language-ini extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ini"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("[common]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#绑定服务端")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("server_addr")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),s._v(" 59.110.173.180")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("server_port")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),s._v(" 12345")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#启用tcp或者UDP看你自己心情,我感觉tcp好点,UDP可能丢包")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v("[ssr]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("type")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),s._v(" tcp")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#远程端口")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("remote_port")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),s._v(" 2333")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#你本地的代理工具暴露的接口")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("local_port")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),s._v(" 2333")]),s._v("\n")])])]),a("h4",{attrs:{id:"代理的工具配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#代理的工具配置"}},[s._v("#")]),s._v(" 代理的工具配置")]),s._v(" "),a("p",[s._v("这里我用的是ss(Shadowsocks),你也可以用其它的代理工具,比如openVPN,V2ray啥啥的,看你的选择吧,我图方便就用的Python版本")]),s._v(" "),a("p",[s._v("先安装一下python版本的ss服务端")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("pip "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" shadowsocks\n")])])]),a("p",[s._v("然后就可以在*\\python3.8\\Scripts\\目录下找到找到ssserver.exe了")]),s._v(" "),a("p",[s._v("我们在当前目录下创建一个ss的配置文件,这些配置我就不多说了")]),s._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"server"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"0.0.0.0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"server_port"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2333")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"local_address"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"127.0.0.1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"local_port"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2333")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"password"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"9054"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"timeout"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("300")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"method"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"RC4-MD5"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"fast_open"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("之后先启动frp,再启动ss,然后就完事了\n看图,是可以访问到学校内网的,也可以访问到自己的路由器管理页面\n"),a("img",{attrs:{src:"http://59.110.173.180/usr/uploads/2019/12/3926081252.png",alt:"微信截图_20191221190537.png"}})])])}),[],!1,null,null,null);t.default=r.exports}}]);