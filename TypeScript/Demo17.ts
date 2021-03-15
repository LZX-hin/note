// typescript函数中使用泛型

function join<T>(first: T, second: T){
  return `${first}${second}`
}

join<string>("1","1");

// 两个泛型
function join2<T,P>(first: T, second: P){
  return `${first}${second}`
}

join2<string,number>('a',2);

// 泛型中数组的使用
// 写法1
function myFunc<T>(params: T[]){
  return params;
}
// 写法2
function myFunc2<T>(params: Array<T>){
  return params;
}

myFunc<string>(['a','b'])