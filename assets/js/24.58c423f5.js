(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{515:function(t,s,a){"use strict";a.r(s);var n=a(5),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[t._v("?\tJVM类加载分为三个部分\n"),a("blockquote",[a("p",[t._v("加载")]),t._v(" "),a("p",[t._v("连接")]),t._v(" "),a("p",[t._v("初始化")])]),t._v(" "),a("h3",{attrs:{id:"加载"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#加载"}},[t._v("#")]),t._v(" 加载")]),t._v(" "),a("p",[t._v("加载过程主要进行了三个操作")]),t._v(" "),a("p",[t._v("1.通过类的全限定类名来获取该类的二进制字节类")]),t._v(" "),a("p",[t._v("2.将字节类的静态存储结构转为方法区的运行时数据结构")]),t._v(" "),a("p",[t._v("3.在堆中生成此类的 "),a("strong",[t._v("java.lang.Class")]),t._v(" 对象 作为访问元空间这些数据结构的入口")]),t._v(" "),a("p",[t._v("?\t双亲委派机制&沙箱安全机制:  当一个类加载器收到了加载某类的请求时,该类加载器会把这个请求委派给父类加载器,直到获取不到父类加载器,才会尝试自己加载,如果不能加载该类则会往下委托下层的加载器")]),t._v(" "),a("h4",{attrs:{id:"jvm提供了三种系统加载器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jvm提供了三种系统加载器"}},[t._v("#")]),t._v(" jvm提供了三种系统加载器：")]),t._v(" "),a("blockquote",[a("ol",[a("li",[t._v("启动类加载器（Bootstrap ClassLoader）：C++实现，在java里无法获取，"),a("strong",[t._v("负责加载/lib")]),t._v("下的类。")]),t._v(" "),a("li",[t._v("扩展类加载器（Extension ClassLoader）： Java实现，可以在java里获取，"),a("strong",[t._v("负责加载/lib/ext")]),t._v("下的类。")]),t._v(" "),a("li",[t._v("系统类加载器/应用程序类加载器（Application ClassLoader）：是与我们接触对多的类加载器，我们写的代码默认就是由它来加载，ClassLoader.getSystemClassLoader返回的就是它。")])])]),t._v(" "),a("p",[t._v("双亲委派代码实现:")]),t._v(" "),a("div",{staticClass:"language-java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("protected")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Class")]),a("span",{pre:!0,attrs:{class:"token generics"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("loadClass")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("boolean")]),t._v(" resolve"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("throws")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ClassNotFoundException")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    \t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 同步上锁")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("synchronized")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getClassLoadingLock")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 先查看这个类是不是已经加载过")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Class")]),a("span",{pre:!0,attrs:{class:"token generics"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" c "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("findLoadedClass")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("c "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" t0 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("nanoTime")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                \t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 递归，双亲委派的实现，先获取父类加载器，不为空则交给父类加载器")]),t._v("\n                    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("parent "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                        c "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" parent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("loadClass")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 前面提到，bootstrap classloader的类加载器为null，通过find方法来获得")]),t._v("\n                    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                        c "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("findBootstrapClassOrNull")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ClassNotFoundException")]),t._v(" e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n                "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("c "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果还是没有获得该类，调用findClass找到类")]),t._v("\n                    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" t1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("nanoTime")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                    c "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("findClass")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n                    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// jvm统计")]),t._v("\n                    sun"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("misc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("PerfCounter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getParentDelegationTime")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addTime")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("t1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" t0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                    sun"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("misc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("PerfCounter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getFindClassTime")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addElapsedTimeFrom")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("t1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                    sun"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("misc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("PerfCounter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getFindClasses")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("increment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 连接类")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("resolve"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolveClass")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("c"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" c"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("双亲委派机制确保了jdk官方类的唯一性")]),t._v(" "),a("h3",{attrs:{id:"连接"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#连接"}},[t._v("#")]),t._v(" 连接")]),t._v(" "),a("p",[t._v("连接分为校验,准备,解析")]),t._v(" "),a("h4",{attrs:{id:"校验"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#校验"}},[t._v("#")]),t._v(" 校验")]),t._v(" "),a("p",[t._v("?\t校验为了确保Class文件的字节流中的信息符合JVM规范,主要进行一下校验")]),t._v(" "),a("blockquote",[a("ol",[a("li",[t._v("文件格式验证：基于字节流验证。 (开头标识为:CAFE BABE)")]),t._v(" "),a("li",[t._v("元数据验证：基于方法区的存储结构验证。")]),t._v(" "),a("li",[t._v("字节码验证：基于方法区的存储结构验证。")]),t._v(" "),a("li",[t._v("符号引用验证：基于方法区的存储结构验证。")])])]),t._v(" "),a("h4",{attrs:{id:"准备"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#准备"}},[t._v("#")]),t._v(" 准备")]),t._v(" "),a("p",[t._v("?\t 在方法区中给类的类变量(static修饰)分配内存，然后初始化其值，如果类变量是常量，则直接赋值为该常量值否则为java类型的默认的零值。")]),t._v(" "),a("h4",{attrs:{id:"解析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#解析"}},[t._v("#")]),t._v(" 解析")]),t._v(" "),a("p",[t._v("把类型中的符号引用转换为直接引用。")]),t._v(" "),a("p",[t._v("主要有以下四种：")]),t._v(" "),a("blockquote",[a("ol",[a("li",[t._v("类或接口的解析")]),t._v(" "),a("li",[t._v("字段解析")]),t._v(" "),a("li",[t._v("类方法解析")]),t._v(" "),a("li",[t._v("接口方法解析")])])]),t._v(" "),a("h3",{attrs:{id:"初始化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#初始化"}},[t._v("#")]),t._v(" 初始化")]),t._v(" "),a("p",[t._v("?\t 这个阶段才真正开始执行java代码，静态代码块和设置变量的初始值为程序员设定的值。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("JVM首先加载class文件，静态代码段和class文件一同被装载并且只加载一次 \n")])])]),a("p",[t._v("?\t众所周知,类加载完了并不是一定会初始化,比如我不new对象,那他就不会初始化,在下面5中情况下,类才会被初始化")]),t._v(" "),a("h4",{attrs:{id:"主动引用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#主动引用"}},[t._v("#")]),t._v(" 主动引用")]),t._v(" "),a("p",[t._v("1.new对象")]),t._v(" "),a("p",[t._v("2.读取或者设置类的静态属性")]),t._v(" "),a("p",[t._v("3.用反射对没有初始化过的类进行调用")]),t._v(" "),a("p",[t._v("4.如果该类的父类没有被初始化,则会先初始化该父类")]),t._v(" "),a("p",[t._v("5.程序入口那个类(启动main方法的类)")]),t._v(" "),a("h4",{attrs:{id:"被动引用-不会发送初始化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#被动引用-不会发送初始化"}},[t._v("#")]),t._v(" 被动引用(不会发送初始化)")]),t._v(" "),a("p",[t._v("1.子类访问父类的静态变量")]),t._v(" "),a("p",[t._v("2.通过数组定义的类  A[] a=new A[10];")]),t._v(" "),a("p",[t._v("3.引用常量 final")]),t._v(" "),a("h4",{attrs:{id:"子类和父类的初始化顺序"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#子类和父类的初始化顺序"}},[t._v("#")]),t._v(" 子类和父类的初始化顺序")]),t._v(" "),a("blockquote",[a("p",[t._v("1.首先初始化父类的static变量和static块，按出现顺序；")]),t._v(" "),a("p",[t._v("2.初始化子类的static变量和static块，按出现顺序；")]),t._v(" "),a("p",[t._v("3.初始化父类的普通变量和构造块，按出现顺序，然后调用父类的构造函数；")]),t._v(" "),a("p",[t._v("4.初始化子类的普通变量和构造块，按出现顺序，然后调用子类的构造函数。")])])])}),[],!1,null,null,null);s.default=e.exports}}]);