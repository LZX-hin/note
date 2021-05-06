import { defaultEquals } from '../../utils'
import { Node } from '../models/linked-list-models'

/*
  链表是一个类似数组的数据结构
  链表的特点：
    1. 在链表中添加或者删除元素时候不用移动其他元素
    2. 在数组中可以直接访问某个位置的元素，而在链表中需要从链表头开始遍历元素直到找到对应索引的元素
*/

// 实现一个链表类
export default class LinkedList {
  constructor(equalsFn = defaultEquals){
    // count用于存储链表中元素数量
    this.count = 0 
    // 用于保存链表中第一个元素
    this.head = undefined
    this.equalsFn = equalsFn
  }
  // 向链表尾部添加一个新元素
  push(element){
    const node = new Node(element)
    // current表示链表最后一个元素
    let current
    if(this.head == null){
      this.head = node
    }else{
      current = this.head
      // 遍历链表，并找出链表的最后一个元素，赋值给current
      while(current.next != null){
        current = current.next
      }
      // 当执行完while后，current就是链表中最后一个元素，此时最后一个元素的next指向新添加的元素
      current.next = node
    }
    // count记录链表元素个数
    this.count++
  }
  // 向链表的特定位置插入一个新元素
  insert(element,index){
    if(index >= 0 && index <= this.count){
      const node = new Node(element)
      if(index === 0){
        const current = this.head
        node.next = current
        this.head = node
      }else{
        const previous = this.getElementAt(index - 1)
        const current = previous.next
        node.next = current
        previous.next = node
      }
      this.count++
      return true
    }
    return false
  }
  // 返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回undefined
  getElementAt(index){
    if(index >= 0 && index <= this.count){
      let node = this.head
      // 遍历链表，结束循环时，node就是index这个位置的节点
      for(let i=0;i<index && node != null;i++){
        node = node.next
      }
      return node
    }
    return undefined
  }
  // 从链表中移除一个元素
  remove(element){
    const index = this.indexOf(element)
    return this.removeAt(index)
  }
  // 返回元素在链表中的索引。如果链表中没有该元素则返回-1
  indexOf(element){
    let current = this.head
    for(let i=0;i<this.count && current != null;i++){
      if(this.equalsFn(element,current.element)){
        return i
      }
      current = current.next
    }
    return -1
  }
  // 从链表的特定位置中移除一个元素
  removeAt(index){
    // 检查越界值，如果index大于0且大于链表长度，则返回undefined
    if(index >= 0 && index < this.count){
      let current = this.head
      if(index === 0){// 移除第一项
        // 如果移除第一个元素，使this.head指向第一个元素的next，就是指向了链表中第二个元素
        this.head = current.next
      }else{// 移除第一项外的元素
        // 方法一：通过遍历+替换位置
        // let previous
        // for(let i=0;i<index;i++){ // 这里current最后就是要移除的节点，而previous就是要移除的节点的前一个节点
        //   previous = current
        //   current = current.next
        // }
        
        // 方法二：使用方法getElementAt()
        const previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = current.next

        // 将previous.next与current.next连在一起，意思其实就是跳过了current，从而将它移除
        previous.next = current.next
      }
      // 链表长度减一
      this.count--
      return current.element
    }
    return undefined
  }
  // 如果链表中不包含任何元素，则返回true，否则返回false
  isEmpty(){
    return this.size() === 0
  }
  // 返回链表中包含的元素个数
  size(){
    return this.count
  }
  getHead(){
    return this.head
  }
  // 返回表示整个链表的字符串
  toString(){
    if(this.head == null){
      return ''
    }
    let objString = `${this.head.element}`
    let current = this.head.next
    for(let i=1;i<this.size() && current != null;i++){
      objString = `${objString},${current.element}`
      current = current.next
    }
    return objString
  }
}