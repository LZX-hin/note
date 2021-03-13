// ts中数组类型注解的方法

// 1. ts类型推断
const numberArr = [1,2,3];

// 2. : number[] 简单类型注解
const numberArr2: number[] = [1,2,3];
const stringArr: string[] = ['1','2','3'];
const undefinedArr: undefined[] = [undefined];
const arr: (number | string)[] = [1,'string',2];

// 3. 数组中嵌套对象
const objInArr: {name: string, age: number}[] = [
  {
    name: '小明',
    age: 18
  },{
    name: '小红',
    age: 19
  }
]
// 3-1. 类型别名 type alias
type objInArrType = {
  name: string,
  age: number
}
const objInArr2: objInArrType[] = [
  {
    name: '小军',
    age: 20
  },{
    name: '小黄',
    age: 29
  }
]
// 3-2. 也可以用class形式
class ObjInArrType2 {
  name: string;
  age: number;
}
const objInArr3: ObjInArrType2[] = [
  {
    name: '小军',
    age: 20
  },{
    name: '小黄',
    age: 29
  }
]