// 类的访问类型
// private protected public

// 类的内部和类的外部，内部指的是{}中，外部就是指在{}外

// public：表示类中的该属性或方法能够在类的内部和外部被调用
// class Person{
//   public name: string;
//   public sayHello(){
//     console.log(this.name + 'say Hello')
//   }
// }

// const person = new Person();
// person.name = 'abc';
// person.sayHello();


// private：表示类中的该属性或方法只能在类的内部被调用
// class Person{
//   private name: string;
//   public sayHello(){
//     console.log(this.name + 'say Hello')
//   }
// }

// const person = new Person();
// person.name = 'abc'; // 报错，表示name为私有属性
// person.sayHello();


// protected：表示类中的该属性或方法只能在类及其子类内部调用（包括访问）
// class Person{
//   protected name: string;
//   public sayHello(){
//     console.log(this.name + 'say Hello')
//   }
// }

// class Teacher extends Person{
//   public sayBye(){
//     this.name // 不报错
//   }
// }

// const person = new Person();
// person.name = 'abc'; // 报错，表示name只能在Person及其子类中调用（包括访问）
// person.sayHello();