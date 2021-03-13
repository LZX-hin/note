// 抽象类和只读属性的使用

// class Person{
//   // public readonly表示外部只读属性，在外部只能读，但是在内部可以写/读
//   public readonly _name: string
//   constructor(name: string){
//     this._name = name;
//   }
// }

// const person = new Person('小红');
// person._name = '小军';
// console.log(person._name);

abstract class Person{
  abstract skill()
}

class Waiter extends Person{
  skill(){
    console.log('招呼')
  }
}

class BaseTeacher extends Person{
  skill(){
    console.log('初级教学')
  }
}

class SeniorTeacher extends Person{
  skill(){
    console.log('高级教学')
  }
}