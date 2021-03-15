// 类的构造函数

class Person{
  constructor(public name: string){
    this.name = name;
  }
}
const person = new Person('小葱')
console.log(person.name)

class Teacher extends Person{
  constructor(public age: number, public name: string){
    super(name)
    this.age = age;
  }
}
const teacher = new Teacher(18,'小黄')
console.log(teacher.name)
console.log(teacher.age)

// 注意：只要在子类中写了constructor，都要在里面调用super()，否则子类获取不到this，且报错