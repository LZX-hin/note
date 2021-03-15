// ts的基础静态类型和对象静态类型

// 基础静态类型 : xxx (null, undefined, boolean, string, number)
const count: number = 918;
const myName: string = 'lzx';

// 对象静态类型
// 对象
const obj: {
  name: string,
  age: number
} = {
  name: '小明',
  age: 18
}
// 数组
// :string []表示数组中每个元素必须为字符串
const arr: string[] = ['小刘', '小强', '小军'];
// 类
class People{};
const dajiao: People = new People();
// 函数
// 表示fn必须为一个函数，且返回值必须是一个字符串
const fn: ()=>string = ()=>{return '小狼'}