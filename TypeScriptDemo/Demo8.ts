// 初识接口interface

// interface
interface Condition {
  name: string;
  age: number;
  height: number;
  weight?: number; // ?:表示可选项
}

// interface（接口）和type（类型别名）有点像？
// 1. 确实是有点像
// 2. type是用=赋值的，而interface的写法类似于class
// 3. interface是为对象Object写类型注解的，而type的话可以是string这些基本数据类型，如：
// type StrType = string;
// 而interface就不可以这么写

const person = {
  name: '小明',
  age: 18,
  height: 174,
  weight: 140
}

// interface形式写法：
const screenResume = (person: Condition)=> {
  person.age < 24 && person.height >= 160 && console.log(person.name+'进入面试');
  person.age >= 24 || person.height < 160 && console.log(person.name+'你被淘汰');
}

const getResume = (person: Condition) => {
  console.log(person.name+'年龄是'+person.age)
  console.log(person.name+'身高是'+person.height)
  person.weight && console.log(person.name + '体重是' + person.weight)
}

screenResume(person)
getResume(person)

// 非interface形式写法：
const screenResume2 = (name: string, age: number, height: number)=> {
  age < 24 && height >= 160 && console.log(name+'进入面试');
  age >= 24 || height < 160 && console.log(name+'你被淘汰');
}

const getResume2 = (name: string, age: number, height: number) => {
  console.log(name+'年龄是'+age)
  console.log(name+'身高是'+height)
}

// screenResume2('小红',18,162)
// getResume2('小红',18,162)