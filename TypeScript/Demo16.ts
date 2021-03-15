// typescript中的Enum类型

// const Status = {
//   zero: 0,
//   one: 1,
//   two: 2
// }

enum Status{
  zero = 1,
  one,
  two
}

function getServe(status: any){
  if(status === Status.zero){
    return '零'
  }else if(status === Status.one){
    return '一'
  }else if(status === Status.two){
    return '二'
  }
}

console.log(Status.zero) // 1
console.log(Status.one) // 2
console.log(Status.two) // 3

console.log(Status.zero, Status[1])

// const result = getServe(2) // 输出：二
const result = getServe(Status.two) // 输出：二
console.log('输出：'+result)