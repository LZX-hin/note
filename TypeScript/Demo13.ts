// 类的setter getter static

// setter getter
// class Person{
//   constructor(private _age: number){
//     this._age = _age;
//   }
//   // _age是私有属性，但是可以通过getter对外暴露
//   get age(){
//     return this._age;
//   }
//   // 也可以通过setter来修改私有属性
//   set age(age: number){
//     this._age = age;
//   }
// }

// const person = new Person(26);
// person.age = 24;
// console.log(person.age)

// 静态类static
class Person{
  static sayHello(){
    return 'Hello!';
  }
}
// static方法可以直接通过类来调用，而无须实例化对象
console.log(Person.sayHello());