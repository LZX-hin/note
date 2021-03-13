// 类的概念和使用

class Female {
  content = 'Hi!'
  sayHello(){
    return this.content
  }
}

class Xiaohong extends Female{
  // 重写属性，注意这样重写是不会影响到父类中这个属性的
  sayHello(){
    return super.sayHello() + '你好'
  }
  sayBye(){
    return 'bye!'
  }
}

const goddess = new Xiaohong();
console.log(goddess.sayHello())
// console.log(goddess.sayBye())

const goddess2 = new Female();
console.log(goddess2.sayHello())