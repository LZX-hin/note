// 实现一个基于数组的栈
class Stack {
  constructor(){
    this.items = [];
  }
  // 向栈顶添加元素
  push(element){
    this.items.push(element);
  }
  // 移除栈顶元素
  pop(){
    return this.items.pop();
  }
  // 返回栈顶元素
  peek(){
    return this.items[this.items.length - 1];
  }
  // 判断栈是否为空，空返回true，否则返回false
  isEmpty(){
    return this.items.length === 0;
  }
  // 清空栈
  clear(){
    this.items = [];
  }
  // 返回栈中元素个数
  size(){
    return this.items.length;
  }
}

const stack = new Stack();
stack.push(5);
stack.push(8);
stack.push(11);
console.log(stack.size());
console.log(stack.isEmpty());
stack.push(15)
stack.pop();
stack.pop();
console.log(stack.size())