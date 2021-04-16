// 1.用对象实现栈
// class Stack {
//   constructor(){
//     this._count = 0;
//     this._items = {};
//   }
//   // 向栈顶添加元素
//   push(element){
//     this._items[this._count] = element;
//     this._count++;
//   }
//   // 判断栈是否为空，空返回true，否则返回false
//   isEmpty(){
//     return this._count === 0;
//   }
//   // 验证一个栈的大小
//   size(){
//     return this._count;
//   }
//   // 从栈中弹出元素
//   pop(){
//     if(this.isEmpty()) return undefined;
//     this._count--;
//     const result = this._items[this._count];
//     delete this._items[this._count];
//     return result;
//   }
//   // 查看栈顶的值
//   peek(){
//     if(this.isEmpty()) return undefined;
//     return this._items[this._count-1]
//   }
//   // 清空栈
//   clear(){
//     this._items = {};
//     this._count = 0;
//   }
//   toString(){
//     if(this.isEmpty()) return '';
//     let objString = `${this._items[0]}`
//     for(let i=1;i<this._count;i++){
//       objString = `${objString},${this._items[i]}`;
//     }
//     return objString;
//   }
// }

// 2.用WeakMap实现类(WeakMap中的key只能是对象/数组)
const items = new WeakMap();

class Stack{
  constructor(){
    items.set(this,[])
  }
  push(element){
    const s = items.get(this)
    s.push(element);
  }
  pop(){
    const s = items.get(this)
    const popItem = s.pop()
    return popItem
  }
  peek(){
    const s = items.get(this)
    return s[s.length - 1]
  }
  isEmpty(){
    const s = items.get(this)
    return s.length === 0
  }
  clear(){
    let s = items.get(this)
    s = [];
  }
  size(){
    return items.get(this).length;
  }
}

// 用栈解决问题：

// 1) 从十进制到二进制
function decimalToBinary(decNumber){
  const remStack = new Stack();
  let number = decNumber;
  let rem;
  let binaryString = '';

  while(number > 0){
    rem = Math.floor(number % 2);
    remStack.push(rem);
    number = Math.floor(number / 2);
  }

  while(!remStack.isEmpty()){
    binaryString += remStack.pop().toString()
  }

  return binaryString;
}

// test
// console.log(decimalToBinary(233))
// console.log(decimalToBinary(7))

// 2) 进制转换算法
// 基于穿进去的数为基数进行进制转换
function baseConverter(decNumber, base){
  const remStack = new Stack();
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let number = decNumber;
  let rem;
  let baseString = '';
  if(!(base >= 2 && base <= 36)){
    return '';
  }

  while(number > 0){
    rem = Math.floor(number % base)
    remStack.push(rem)
    number = Math.floor(number / base)
  }

  while(!remStack.isEmpty()){
    baseString += digits[remStack.pop()]
  }

  return baseString;
}

console.log(baseConverter(1000345,2))
console.log(baseConverter(17,16))
