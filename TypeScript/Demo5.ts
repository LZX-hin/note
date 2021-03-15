// 函数参数和返回值的类型注解

// : xxx 表示给函数返回值类型注解
function getTotal(one: number, two: number): number{
  return one + two
}
const total = getTotal(1, 2);

// : void 表示函数没返回值
function sayHello(): void{
  console.log('Hello World')
}

// : never 表示函数不能执行完，1. 报错 2.死循环
function errorFn(): never{
  throw new Error('报错了');
  console.log('Hello World');
}
function forNever(): never{
  while(true){}
  console.log('Hello World')
}

// 如果参数是一个对象且结构，想指定里面的属性的类型，这么写是不对的，这么写是对象解构赋值的方法了
// function add({one: number, two: number}){
//   return one + two;
// }
// const total2 = add({one: 1, two: 2})
// 正确写法是：
function add({one, two}: {one: number, two: number}){
  return one + two
}
const total2 = add({one: 1, two: 2});

function getNumber({one}: {one: number}){
  return one
}
const one = getNumber({one: 1})





