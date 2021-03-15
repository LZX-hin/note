// interface形式写法：
interface Condition {
  name: string;
  age: number;
  height: number;
  weight?: number; // ?:表示可选项
  [propname: string]: any,
  say(): string
}

// interface还能通过关键字implements来约束class
class Child implements Condition {
  name: '刘英'
  age: 20
  height: 160
  say(){
    return 'abc'
  }
}
  
// 一个接口还可以通过extends关键字继承另一个接口
interface Teacher extends Condition{
  teach(): string
}

const person = {
  name: '小明',
  age: 18,
  height: 174,
  weight: 140,
  sex: '男',
  say(){
    return '你好'
  },
  teach(){
    return '你好2'
  }
}

const screenResume = (person: Condition)=> {
  person.age < 24 && person.height >= 160 && console.log(person.name+'进入面试');
  person.age >= 24 || person.height < 160 && console.log(person.name+'你被淘汰');
}

const getResume = (person: Teacher) => {
  console.log(person.name+'年龄是'+person.age)
  console.log(person.name+'身高是'+person.height)
  person.weight && console.log(person.name + '体重是' + person.weight)
  person.sex && console.log(person.name+'性别是'+person.sex)
  person.teach()
}

screenResume(person)
getResume(person)