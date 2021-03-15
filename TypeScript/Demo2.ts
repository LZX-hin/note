// 静态类型 static typing

// let count: number = 1;
// count = '1'; //警告
// count = 2; // 正常

// let count: number = 1;

interface XiaoJieJie {
  uname: string,
  age: number
}

const xiaohong: XiaoJieJie = {
  uname: 'xiaohong',
  age: 18,
}

console.log(xiaohong.uname)
console.log(xiaohong.age)