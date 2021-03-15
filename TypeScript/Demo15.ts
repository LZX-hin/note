// 联合类型和类型保护

interface Waiter{
  anjiao: boolean;
  say: ()=>{}
}
interface Teacher{
  anjiao: boolean;
  skill: ()=>{}
}

// 类型断言 as
// function judgeWho(animal: Waiter|Teacher){
//   if(animal.anjiao){
//     (animal as Teacher).skill()
//   }else{
//     (animal as Waiter).say();
//   }
//   // animal.say()
// }

// in方式
// function judgeWho(animal: Waiter|Teacher){
//   if('skill' in animal){
//     animal.skill();
//   }else{
//     animal.say();
//   }
// }

// typeof方式
function add(first: string|number,second: string|number){
  if(typeof first === "string" || typeof second === "string"){
    return `${first}${second}`
  }else{
    return first+second
  }
}

// instanceof方式
class NumberObj{
  count: number;
  constructor(count: number){
    this.count = count;
  }
}

function addObj(first: object|NumberObj, second: object|NumberObj){
  if(first instanceof NumberObj && second instanceof NumberObj){
    return first.count + second.count
  }else{
    return 0;
  }
}
// instanceof 只能用在类上