- ### 父子组件间的通信

#### 1、props/@方法 + $emit

父组件通过v-bind：数据=“父组件数据”把数据传到子组件

子组件通过props来接收父组件的数据

```
// 父组件
<template>
	<div :msg="parentMsg">我是父组件</div>
</template>
<script>
	export default {
		data(){
			return {
				parentMsg: '我是父组件的data'
			}
		},
		methods: {
			parentMethod(value){
				console.log(value)
				// ‘我来自子组件’
			}
		}
	}
</script>
```

```
// 子组件
<template>
	<div @click="click">来自父组件的参数{{msg}}</div>
</template>
<script>
	export default{
		props:{
			msg:{
				type: String
			}
		},
		data(){
			return {
				child: '我来自子组件'
			}
		},
		methods: {
			click(){
				this.$emit('parentMethod',this.child)
			}
		}
	}
</script>
```

#### 2、回调函数(把子组件的数据传给父组件)

父组件模板把方法传到子组件模板中，然后在子组件中先在props接收这个函数，再调用这个方法，并把子组件的数据传到函数中。

```
// 父组件
<template>
	<div :method="parentMethod">我是父组件</div>
</template>
<script>
	export default {
		methods:{
			parentMethod(){
				console.log('我是父组件的方法')
			}
			// 
		}
	}
</script>
```

```
// 子组件
<template>
	<div @click="click">我是子组件</div>
</template>
<script>
	export default {
		props: {
			method: {
				type: Function,
				default: function(){
					
				}
			}
		},
		data:(){
			return {
				child: '我来自子组件'
			}
		},
		methods: {
			click(){
				this.method(this.child)
			}
		}
	}
</script>
```

__这种做法相较于上面的$emit传参有个好处，就是在用$emit的时候不用指定父组件中的方法名，因为我们可以在子组件中重新定义这个方法的名字。自由度相对比较高。__

### 3、$parent + $children

我们可以在父组件中用this.$children[0].数据名称来获取到子组件的数据，然后在子组件中用this.$parent.数据名称来获取父组件的数据，__注意$children是个数组，因为可以有多个子组件__。

但是不推荐用这个来获取子组件的数据，因为$children不是响应式的，而且不是有序的数组，因为用起来比较麻烦

### 4、provide + inject

直接在父组件中用provide

```
// 父组件
<script>
	export default {
		provide: {
			foo: 'baz'
		}
	}
</script>
```

```
// 子组件
<template>
	<div>
		{{foo}} // baz
	</div>
</template>
<script>
	export default {
		inject: ['foo']
	}
</script>
```

__注意官方文档说这种通信方法主要用于高阶组件中，普通的应用程序并不推荐，所以平时开发的时候不需要用这种方法__

### 5、$attrs + $listeners

假如现在父组件中嵌套一个子组件，子组件中再嵌套一个子孙组件，在这种嵌套多层组件的情况下，可以通过$attrs来实现快速方便的传递数据和获取数据。

```
// 父组件
<template>
	<div></div>
	<child :name="name" @changeName="changeName" />
</template>
<script>
	import child from 'child.vue'
	export default {
		components: {
			child
		}
		data(){
			return {
				name: '张三'
			}
		},
		methods: {
			changeName(){
				this.name = '李四'
			}
		}
	}
</script>
```

```
// 子组件
<template>
	<div></div>
	<grand-child v-bind="$attrs" />
</template>
<script>
	import grandChild from 'grandChild.vue'
	export default {
		components: {
			grandChild
		}
	}
</script>
```

这时候，子组件不使用父组件传过来的数据，而是把这个数据再传给grandChild子孙组件，就可以用v-bind="$attrs"来传递，然后在子孙组件中：

```
// 子孙组件
<template>
	<div>name: {{ $attrs.name }}</div>
</template>
<script>
	export default {
		
	}
</script>
```

通过$attrs对象获取父组件的数据name

__注意：这种方法可以快速便捷地将父组件或祖先组件的数据传递给子孙组件，也是多用于高级组件中__

### 6、ref

在父组件模板中，通过给子组件标签加上property ref=“一个名”，然后通过this.$refs.一个名.数据来获取子组件的数据（data或methods）



##### 总结：

在日常开发中我们使用__props + $emit实现父子组件互通传参和使用回调函数来实现将子组件数据传递给父组件__（__这种方法相比于$emit自由度更高，不用指定父组件方法名__），然后由于$children是无序的且不是响应式的，所以不推荐使用，而provide + inject官方文档说普通应用程序不推荐用，所以日常开发不使用





- ### Vue中的异步组件


使用异步组件，可以在组件被触发的时候才加载这个组件并渲染到页面，有助于提高页面加载速度。

_下面这个是普通方法引入组件_

```
<template>
	<h1>普通方法引入组件</h1>
	<div v-if="flag">
    	<list />
	</div>
</template>
<script>
	import list from './list.vue'
	export default {
		data(){
			return {
				flag: false
			}
		},
		components: {
			list
		}
	}
</script>
```

这种是普通引入组件的方法，在这个页面一加载的时候就会把这个list组件一起加载。下面是异步组件加载方法：

```
<template>
	<h1>异步组件方法</h1>
	<div v-if="flag">	
		<asynclist />
	</div>
</template>
<script>
import loading from './loading.vue' // 引入loading组件
import error from './error.vue' // 引入error组件
const asynclist = () => ({
	component: import('./list.vue'), // 要引入的组件
	loading, // 引入loading组件，加载组件期间显示的组件
	error, // 引入error组件，加载组件失败显示的组件
	delay: 200, // 延迟加载组件的时间
	timeout: 3000 // 超过这个timeout设置的时间，就会显示error组件
})
export default {
	data(){
		return {
			flag: false
		}
	},
	components: {
		asynclist
	}
}
</script>
```

这种就是异步组件方法，在触发这个组件显示的时候才会加载这个组件，而不是页面首次加载的时候把页面里面的组件全部加载出来。对于大型应用来说，这种也是比较好的优化手段





- ### 路由懒加载


普通路由引入组件方法：

```
import list from '../../list.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/list',
		name: 'list',
		component: list
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
})
```

这种方法是页面一加载 ，就把所有路由都一起下载下来，如果是大型应用，页面首次打开有可能会白屏很久，所以有路由懒加载方法，在触发这个路由的时候才把组件下载下来：

```
Vue.use(VueRouter)

const routes = [
	{
		path: '/list',
		name: 'list',
		component: () => import('../../list.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
})
```





- ### Vue中的样式穿透


有时候在实际开发中，__我们要改变子组件的样式__，就是要实现样式穿透，之前的做法是在没有设置scoped的style标签中直接改子组件的样式：

```
<style>
	.b .a {
		color: red;
	}
</style>
```

但是这样是不可取的，有可能影响其他组件的类名为.a的标签的样式，所以，我们可以用样式穿透来解决这个问题：

```
<style scoped>
	.b >>> .a {
		color: red;
	}
</style>
```

__注意用这个>>>要在设置了scoped的style标签中使用才__





- ### 动态路由


```
const routes = [
	{
		path: '/user/:id',
		component: user
	}
]
```

形如这种/:id的就是Vue Router中的动态路由，我们可以跳到'/user/mike'或者'/user/jason'等的url，而他们渲染的组件都是同一个user组件，mike和jason都是参数，可以通过this.$route.params.id来获取。__但是，需要注意：由于他们用的都是同一个组件，所以vue选择复用这个组件，因此动态路由之间的跳转（比如从'/user/mike'跳到'/user/jason'），是不会再次执行生命周期函数的。因此我们可以通过watch来侦听$route来知道是否跳转了路由，然后获取$route.params.id或者做其他操作__





- ### 自定义指令 Vue.directive('自定义的指令名',{ 钩子函数 })


自定义指令中，所有的钩子函数的第一个参数el指的是指令绑定的元素，__通过这个el，可以直接操作dom！__

如：

我们想页面加载时输入框自动聚焦，可以通过给<input>标签绑定一个自定义指令来实现：

```
// 全局注册指令

Vue.directive('focus',{
	inserted: function(el){
		el.focus() // 注意focus()是原生监听聚焦事件
	}
})

-------------------------------

<input v-focus />
```

```
// 局部注册指令

export default {
	directives: {
		focus: {
			inserted: function(el){
				el.focus()
			}
		}
	}
}

-------------------------------

<input v-focus />
```



__钩子函数（有哪些可以去看文档）__

每个钩子函数都接收三个参数，（el，binding，vnode）

el是挂载着的dom元素，binding是一个关于这个指令的对象，vnode就是虚拟节点



关于binding对象：

name：指令名，不包括v-前缀;

value：指令的绑定值，比如：v-mydirective=”200“，那么value就是200；

oldValue：置顶绑定的前一个值，只能用在update和componentUpdate两个钩子；

expression：字符串形式的指令表达式，比如：v-mydirective=”msg“，那么expression就是msg；

arg：指令的参数，比如：v-mydirective:foo="200"，那么arg就是foo；

modifiers：指令的修饰符，比如：v-mydirective:foo.a="200"，那么modifiers就是a



__指令的动态参数__

顾名思义指令的参数可以是动态的，比如：v-mydirective[arguments]="value"，arguments是组件实例的数据，是一个变量，那么我们可以通过这个变量去动态的操作dom了！

比如我想固定一个元素在页面上，但是是动态的决定固定在左侧还是在顶部，就可以：

```
<div id="baseexample">
  <p>Scroll down the page</p>
  <p v-pin[position]="200">Stick me 200px from the top of the page</p>
</div>
```

```
Vue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed'
    var pos = binding.arg === 'left' ? 'left' : 'top' // 通过binding.arg可以获取参数position
    el.style[pos] = binding.value + 'px'
  }
})

new Vue({
  el: '#baseexample',
  data(){
  	return {
  		position: 'left'
  	}
  }
})
```



__对象字面量__

如果指令需要多个绑定值，我们可以传一个对象字面量进去。

比如：

```
<div v-mydirective="{ color: 'red', text: 'hello' }"></div>
```

```
Vue.directive('mydirective',{
	bind(el,binding){
		console.log(binding.value.color) // => 'red'
		console.log(binding.value.text) // => 'hello'
	}
})
```

__总结：有哪些场景可以使用自定义指令呢？__

__1、为组件添加loading效果__

__2、按钮级别权限控制 `v-permission`__

__3、代码埋点,根据操作类型定义指令__

__4、input输入框自动获取焦点__





- ### 父组件与子组件的生命周期函数执行顺序


```
// 父组件
<template>
	<div>父组件</div>
	<child />
</template>
export default {
	beforeCreate(){
		console.log('父组件beforeCreated')
	},
	created(){
		console.log('父组件create')
	},
	beforeMount(){
		console.log('父组件beforeMount')
	},
	mounted(){
		console.log('父组件mounted')
	}
}
```

```
// 子组件
<template>
	<div>子组件</div>
</template>
export default {
	beforeCreate(){
		console.log('子组件beforeCreated')
	},
	created(){
		console.log('子组件create')
	},
	beforeMount(){
		console.log('子组件beforeMount')
	},
	mounted(){
		console.log('子组件mounted')
	}
}
```

```
// 最终输出：

父组件beforeCreated
父组件create
父组件beforeMount
子组件beforeCreated
子组件create
子组件beforeMount
子组件mounted
父组件mounted
```

就是说父组件会等子组件挂载完毕才会执行mounted，即挂载完毕



- ### Vue.extend()


Vue.extend()用于创建一个组件构造器（构造函数），通过new这个构造函数可以创建组件实例。

用处：

__可以用于动态创建组件__，像创建一个类似于elementui的message组件。使得可以通过调用api来创建组件，就像原生js的window.alert()一样



例子：

toast组件：

```
<template>
    <div id="toast" v-if="show">
        <div>{{ text }}</div>
    </div>
</template>

<script>
export default {
    name: 'Toast'
}
</script>

<style>
#toast{
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 5px 20px;
  line-height: 26px;
  text-align: center;
  border-radius: 10px;
  opacity: .7;
  color: #000;
  font-size: 14px;
  background: #ccc;
}
</style>
```

> __注意在vue文件中，我们不需要写data之类的选项，因为这些都是要动态创建的，只需要写一个name就可以了。__
>



创建组件的js文件：

```
import Vue from 'vue'
import Toast from './views/toast.vue'

const ToastConstructor = Vue.extend(Toast) // Vue.extend()接受一个组件实例作为参数
// ToastConstructor为组件构造器

function showToast (text,duration=2000){
	const toastDOM = new ToastConstructor({
		el: document.createElement('div'), // 组件将会替换掉这个el
		data(){
			return {
				text: text,
				show: true
			}
		},
	})
	
	// duration秒后，toast组件消失
	setTimeout(()=>{
		toastDOM.show = false
	},duration)
	
	// 挂载toast组件到真实dom
	document.body.appendChild(toastDOM.$el)
}

function toastRegistry (Vue){
	Vue.prototype.$toast = showToast
}

export default toastRegistry; // 最后导出这个注册组件的方法
// 其实就是在Vue的原型上加上一个方法而已

```



在main.js文件中通过Vue.use()把$toast挂到Vue原型上：

```
import toastRegistry from '/toastConstructor.js'

Vue.use(toastRegistry); // 其实就是执行toastRegistry方法
```



在组件上使用：

```
<template>
  <div id="app">
    <div id="nav">
      <button @click="showToast">点击显示组件</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showToast(){
      this.$toast('温馨提示，今天要上班',1500)
    }
  }
}
</script>
```

> __总结：这个方法可以动态创建组件，通过调用api来创建组件，使用起来更加方便__
>





- ### vm.$set()


有时候我们在data选项中写了一个对象，然后在后续（初始化后）可能还要给对象添加属性，并且要显示到页面上。比如在data选项中有一个对象foo，里面有name和sex这两个属性，然后我们想在触发addAge事件后给foo对象添加一个属性age，并渲染到页面上：

```
<template>
	<div>
		<div @click="addAge">添加age</div>
		姓名：{{foo.name}}
		性别：{{foo.sex}}
		年龄：{{foo.age}}
	</div>
</template>
<script>
	export default {
		data(){
			return {
				foo: {
					name: '张三',
					sex: '男'
				}
			}
		},
		methods: {
			addAge(){
				this.foo.age = 30
			}
		}
	}
</scirpt>
```

这时候发现，虽然能打印出this.foo.age等于30，但是页面上并没有显示。这是因为__vue是通过Object.defineProperty()来监听对象的键的getter和setter来实现响应式的，会在vue实例初始化的时候劫持数据并监听，如果我们在后续的操作添加键值对，那么vue是无法监听到这个键的变化的__。



__这时候我们需要用vm.$set()方法来给新添加的键实现监听：__

```
<template>
	<div>
		<div @click="addAge">添加age</div>
		姓名：{{foo.name}}
		性别：{{foo.sex}}
		年龄：{{foo.age}}
	</div>
</template>
<script>
	export default {
		data(){
			return {
				foo: {
					name: '张三',
					sex: '男'
				}
			}
		},
		methods: {
			addAge(){
				this.$set(this.foo,'age',30)
			}
		}
	}
</scirpt>
```

> __总结：这是其中一种让vue能监听到新增的key的值变化的方法，第二种是在一开始data选项中的对象中就有这个属性，然后给个空值，后面直接赋值就可以了。第三种就是用vm.$forceUpdate()，这种方法强制更新，但是不推荐，因为会消耗不必要的性能__
>





- ### filters过滤器


使用filters过滤器来格式化文本，更方便

比如我们要把一个后端返回的时间戳显示成YYYY-MM-DD HH:MM:SS的形式，普通做法就是computed中计算一个值，在里面遍历数组然后将每个元素都转换。既使用了计算属性，又要遍历，很麻烦

```
<template>
	<ul>
		<li v-for="(item,index) in timeList" :key="index">
			{{item.date}}
		</li>
	</ul>
</template>
<script>
import { format } from '@/utils/date'
export default {
	data (){
		list // 后端返回的数据
	},
	computed: {
		timeList (){
			return this.list.map(item => {
				return {
					date: format(item.date,'yyyy-MM-DD HH:mm:ss')
				}
			})
		}
	}
}
</script>
```

但是如果通过过滤器，就会方便好多：

```
<template>
	<ul>
		<li v-for="(item,index) in timeList" :key="index">
			{{item.date | formateDate}} // 只需要在需要格式化的数据后用 ' | 过滤器名 '的方法就ok
		</li>
	</ul>
</template>
<script>
import { format } from '@/utils/date'
export default {
	data (){
		list // 后端返回的数据
	},
	filters: {
		formatDate (value){
			return format(value,'yyyy-MM-DD HH:mm:ss')
		}
	}
}
</script>
```

这种文本格式化用过滤器，代码就简洁很多了





- ### 封装axios请求（包含拦截器）


益善2 http.js





- ### Vue中引入全局组件

```
// 在自定义的index.js文件中写一段注册全局组件的代码（这个index.js文件最好与组件同级）

import buttonC from '@/common/components/button_c'
import titleMessage from '@/common/components/title_message_c'
import areaChoose from '@/common/components/area_choose'
import areaPicker from '@/common/components/area_picker'
import richContent from '@/common/components/rich_content'
import uploadFile from '@/common/components/upload_file'
import remoteJs from '@/common/components/remote'

export default {
  install: (Vue) => {
    Vue.component('buttonC', buttonC)
    Vue.component('titleMessage', titleMessage)
    Vue.component('areaChoose', areaChoose)
    Vue.component('areaPicker', areaPicker)
    Vue.component('richContent', richContent)
    Vue.component('uploadFile', uploadFile)
    Vue.component('remoteJs', remoteJs)
  }
}
// 把这个对象暴露出去
```

```
// main.js
import components from '@/components/index';

Vue.use(components)
// 使用了Vue.use()才是真正让vue执行了上面的代码，注册了全局组件
```

Vue.use()接受的参数可以是：1、对象；2、函数

如果是一个对象，那么对象中要有install()方法

> __注意：其实elementui也是用这种Vue.use()方法注册全局组件，所以我们在使用的时候不用再在每个.vue文件中import引入elementui的组件，而是直接使用__
>





- ### 使用require.context()自动引入模块（文件）


有时候我们需要在一个文件中import很多文件，如果文件很多，则工作量大很多。这些情况下，我们需要import大量文件：

1、配置路由的时候要import很多.vue文件：

<img src="C:\Users\hin\AppData\Roaming\Typora\typora-user-images\image-20200928160455118.png" alt="image-20200928160455118" style="zoom:67%;" />

2、开发了一系列的基础组件，然后把所有基础组件导入到index.js文件中，把这些导入的文件放入一个数组中，再对数组进行遍历从而注册这些组件。



_针对第二种情况举个例子：_

__普通做法：__

```
import CustomDialog from './custom/CustomDialog.vue'
import CustomGrid from './custom/CustomGrid.vue'
import CustomInput from './custom/CustomInput.vue'
import CustomLoading from './custom/CustomLoading.vue'
import CustomSelect from './custom/CustomSelect.vue'

const components = [
	CustomDialog,
	CustomGrid,
	CustomInput,
	CustomLoading,
	CustomSelect
]

components.forEach(component => {
	Vue.component(component.name, component.default)
})
```

__require.context()基本语法：__

```
directory: 要扫描的目录(相对于当前文件)
useSubdirectories: 是否扫描所有的子级文件
regExp: 要扫描的文件，用正则匹配

require.context(directory, useSubdirectories, regExp)
```

__通过require.context()注册组件：__

```
const context = require.context('./', false, /\.vue$/);
匹配当前文件目录下所有的.vue文件，不扫描其子级文件

// context.keys()返回匹配到的所有文件的路径(相对路径)
context.keys().forEach(key => {
	// 通过context(key)获取到对应的文件 .default表示export default导出的内容
	component = context(key).default;
	Vue.component(component.name, component)
})
```

只要在当前路径下有.vue文件，就会自动通过Vue.component进行注册。

> _注意：当然，还有些组件不需要用Vue.component来注册，而是通过在Vue的prototype上绑定方法从而创建组件的，比如消息提示。就要用一个数组装着不用Vue.component注册的组件名，判断当前这个组件名如果不在这个数组中，则用Vue.component来注册_ 。 __具体可以看base-web的wms2的components/index.js如何自动导入模块的__
>





- ### 监听组件生命周期（hook）

1、内部监听组件生命周期

有时候我们需要在组件销毁前做一些操作，比如销毁定时器

```
<script>
	export default {
		data() {
			return {
				timer: null
			}
		}
		created() {
			timer = setInterval(()=>{
				console.log('内部监听组件生命周期函数')
			},3000)
		}
		beforeDestroyed(){
			clearInterval(this.timer);
		}
	}
</script>
```

然而，我们可以通过hook监听组件生命周期，使代码看起来更加直观：

```
<script>
	export default {
		data() {
			return {
				timer: null
			}
		}
		created() {
			timer = setInterval(()=>{
				console.log('内部监听组件生命周期函数')
			},3000)
			this.$once('hook:beforeDestroyed', function(){
				clearInterval(this.timer);
			})
		}
	}
</script>
```

> 在Vue组件中，可以通过__$on__或者__$once__配合__hook__来监听生命周期，比如监听created钩子，可以用this.$on('hook:created', function(){})



2、外部监听组件生命周期（父作用域监听子组件的生命周期）：

比如现在有个需求：在子组件中我们用了`ref`，然后想在父作用域中通过`this.$refs`拿到这个子组件的某些数据，在父作用域中作某些操作。此时如果在父作用域的created钩子中想通过`this.$refs`来获取子组件，会发现此时的`this.$refs`是一个空对象，_这是因为此时子组件还没挂载，dom中并没有这个子组件_，（有关父子组件的生命周期执行顺序，可以看上面）。这时我们肯定想在这个子组件挂载完毕后再在父作用域中通过this.$refs获取，那我们怎么在父作用域中知道子组件是否已挂载呢？这就可以使用外部监听组件生命周期的方法了：

```
// 子组件 childCom
<template>
	<div ref="childCom">
		<h1>我是子组件</h1>
		<div>监听子组件生命周期</div>
	</div>
</template>
<script>
	export default {
	
		...
		
	}
</script>
```

```
// 父组件
<template>
	<h1>我是父组件</h1>
	<child-com @hook:mounted="$_monComMounted"></child-com>
</template>
<script>
	export default {
		methods: {
			$_monComMounted(){
				this.$refs.childCom.***
			}
		}
	}
</script>
```

**在父作用域中，可以在子组件标签上用`v-on`配合`hook`来监听子组件生命周期**。

> 在某些场景这个外部监听组件生命周期还是十分有用的，比如像上面的例子，在父作用域通过`$refs`拿到子组件的数据，必须要等子组件挂载完毕(mounted)才能获取到。





- ### watch的immediate和created(){}哪个先执行？

  _设置了`immediate: true`的watch是要比created(){}生命周期函数要先执行。_

  那如果我们想组件初始化之后（即执行完了created函数）在监听，怎么办呢？

  我们可以在created函数中用vm.$watch()方法来监听一个数据。

  ```
  <script>
  export default {
  	data() {
  		return {
  			title: 'watch'
  		}
  	},
  	created(){
  		this.$watch(
  			function(){
  				return this.title
  			},
  			function(newVal,oldVal){
  				console.log(newVal)
  				console.log(oldVal)
  			},
  			{
  				immediate: true,
  				deep: true
  			}
  		)
  	}
  }
  </script>
  ```

  

> 注：vm.$watch()接受三个参数，第一个是监听的数据，第二个是监听的回调，第三个是监听的配置。其中监听的数据比较特别，要注意使用，可查看官网：https://cn.vuejs.org/v2/api/#vm-watch