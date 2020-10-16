(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{506:function(t,a,n){"use strict";n.r(a);var s=n(5),e=Object(s.a)({},(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[t._v("Dockerfile是用来构建Docker镜像的构建文件,是由一系列命令和参数构成的脚本\n"),n("p",[t._v("Dockerfile保留字:")]),t._v(" "),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 基础镜像,当前镜像的父镜像")]),t._v("\nFROM\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#镜像维护者的信息")]),t._v("\nMAINTAINER\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#容器运行时的shell命令")]),t._v("\nRUN\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#暴露的端口")]),t._v("\nEXPOSE\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#进入容器时的默认目录")]),t._v("\nWORKDIR\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#设置镜像内的环境变量")]),t._v("\nENV\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 将文件添加进镜像会解压tar包和处理URL")]),t._v("\nADD\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 同ADD一样,但是不会解压tar包,默认优先使用COPY")]),t._v("\nCOPY\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#容器数据卷,持久化")]),t._v("\nVOLUME \n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#容器启动时运行的命令,多条CMD只会运行最后一条")]),t._v("\nCMD\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#同CMD,但是可以追加")]),t._v("\nENTRYPOINT\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#子镜像继承时候运行的命令")]),t._v("\nONBUILD\n")])])]),n("p",[t._v("Tomcat的Dockerfile启动实例,先用wget去下载tomcat和java")]),t._v(" "),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#下载java的时候直接用wget会被重定向而下载失败,需要加上这几个参数")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("wget")]),t._v(" --no-check-certificate --no-cookies --header "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Cookie: oraclelicense=accept-securebackup-cookie"')]),t._v("  xxxxx\n")])])]),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[t._v("FROM centos\nMAINTAINER lzheng"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("lzheng@outlook.com"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#添加jdk和tomcat进容器")]),t._v("\nADD apache-tomcat-9.0.30.tar.gz /tomcat\nADD jdk-13.0.1_linux-x64_bin.tar.gz /java\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#设置环境变量")]),t._v("\nENV JAVA_HOME /java/jdk-13.0.1\nENV CLASSPATH "),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$JAVA_HOME")]),t._v("/lib/dt.jar"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$JAVA_HOME")]),t._v("/lib/tool.jar\nENV CATALINA_HOME /tomcat/apache-tomcat-9.0.30\nENV CATALINA_BASE /tomcat/apache-tomcat-9.0.30\nENV "),n("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("PATH")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PATH")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$JAVA_HOME")]),t._v("/bin"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$CATALINA_HOME")]),t._v("/lib"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$CATALINA_HOME")]),t._v("/bin\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#启动tomcat")]),t._v("\nCMD ./tomcat/apache-tomcat-9.0.30/bin/startup.sh \n\n")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);