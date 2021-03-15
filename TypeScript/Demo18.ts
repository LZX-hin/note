// typescript中类的泛型使用

// 类的泛型基本使用
// class SelectPerson<T>{
//   constructor(private people: T[]){}
//   getPerson(index: number): T{
//     return this.people[index];
//   }
// }

// const selectPerson = new SelectPerson<string>(['小红','小明','小强']);
// console.log(selectPerson.getPerson(0));

// 泛型的继承
// interface Person{
//   name: string
// }
// class SelectPerson<T extends Person>{
//   constructor(private people: T[]){}
//   getPerson(index: number): string{
//     return this.people[index].name;
//   }
// }

// const selectPerson = new SelectPerson([
//   {name: "小红"},
//   {name: "小强"},
//   {name: "小军"}
// ]);
// console.log(selectPerson.getPerson(0));

// 泛型的约束
// <T extends number|string> 表示T只能是number或string
class SelectPerson<T extends number|string>{
  constructor(private people: T[]){}
  getPerson(index: number): T{
    return this.people[index];
  }
}

const selectPerson = new SelectPerson(['小红',1,'小强']);
console.log(selectPerson.getPerson(0));