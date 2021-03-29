// 按位非~
// var str = 'abcdef'
// console.log(~str.indexOf('c'))
// if(~str.indexOf('a')){
//   console.log(11)
// }

// 按位与&
// let result = 7&3
// console.log(result)

// 加性操作符
// let res1 = '1'
// let res2 = 2
// let res3 = 3
// console.log(res1+res2+res3)
// let obj = {a:1}
// let arr = ['a','b']
// let res = 1
// console.log(obj+res)

// == 非全等
// 布尔值
// console.log(true == 2) // false 将true转换为数字1，再比较
// console.log(true == 1) // true
// // 字符串
// console.log('12' == 12) // true 将'12'转换为数字12，再比较
// console.log('12a' == 12) // false 所以我估计这里是用Number()转换，而不是用parseInt()来解析
// console.log('1' == true) // true
// // 对象
// console.log({a:'1'} == 1) // false 先将对象通过valueOf()转换成{a:'1'}，再比较
// const a = {a:'1'}
// console.log(a == a) // true
// console.log({a:'1'} == {a:'1'}) // false 所以如果两个对象是同一个堆内存的数据，则true，否则false
// // null和undefined
// console.log(null == undefined)
// // NaN
// console.log(NaN == NaN)

// break和continue
// 在for循环中，只要碰到break就会跳出整个循环，只要碰到continue就会跳过本次循环（无论嵌套了多深）
// let num = 0;
// for(let i=1;i<10;i++){
//   if(i%5 == 0){
//     if(i == 5)
//     break;
//   }
//   ++num
// }
// console.log(num)

// let num2 = 0
// for(let i=1;i<10;i++){
//   if(i%5==0){
//     if(i==5){
//       continue
//     }
//   }
//   num2++
// }
// console.log(num2)