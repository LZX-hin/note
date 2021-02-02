# webpack

## 第一章 webpack简介

### 1.1 webpack五个核心概念

1.1.1 Entry

​	入口（Entry），让webpack从哪个文件开始打包，并分析这些文件的依赖关系

1.1.2 Output

​	输出（output）指示webpack打包后的资源bundles输出到哪里，以及如何命名

1.1.3 Loader

​	loader让webpack能够去处理非Javascript的文件（webpack自身只理解JavaScript和JSON），相当于一个翻译官，帮webpack翻译不同的文件

1.1.4 Plugins

​	插件（plugins）可以让webpack执行范围更广的任务。下至打包优化和压缩，上至重新定义环境中的变量

1.1.5 Mode

​	

## 第二章 webpack初体验

### 1.1运行指令

- 开发环境：webpack ./src/index.js -o ./build/built.js --mode=development

  webpack会以./src/index.js为入口文件开始打包，打包后输出到 ./build/built.js

​      整体打包环境是开发环境

- 生产环境：webpack ./src/index.js -o ./build/built.js --mode=production

​      webpack会以./src/index.js为入口文件开始打包，打包后输出到 ./build/built.js

​      整体打包环境是生产环境



### 1.2结论：

- webpack能够处理js/json文件，但不能处理css/img等资源
- 生产环境和开发环境都可以将es6语法编译成浏览器能识别的语法（比如es6的import）
- 生产环境比开发环境多了一个压缩js代码