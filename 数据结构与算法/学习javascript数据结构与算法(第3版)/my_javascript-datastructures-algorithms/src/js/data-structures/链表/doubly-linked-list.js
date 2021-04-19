import { defaultEquals } from '../../utils'
import Node from '../models/linked-list-models'
import LinkedList from './linked-list'

class DoublyNode extends Node {
  constructor(element,next,prev){
    super(element,next)
    this.prev = prev
  }
}

/*
  双向链表
    1.双向链表提供了从头到尾和从尾到头两种迭代方法
    2.在单向链表中，如果迭代时错过了要找的元素，就需要回到起点，重新迭代。这是双向链表的优势
*/

class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals){
    super(equalsFn)
    // 保存链表中最后一个元素
    this.tail = undefined
  }
  push(element){
    const node = new DoublyNode(element)
    if(this.head == null){
      this.head = node
      this.tail = node
    }else{
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    }
    this.count++
  }
  // 重写插入元素方法insert()
  insert(element, index){
    if(index >= 0 && index <= this.count ){
      const node = new DoublyNode(element)
      let current = this.head
      if(index === 0){// 插入到第一个
        if(this.head == null){
          this.head = node
          this.tail = node
        }else{
          node.next = this.head
          current.prev = node
          this.head = node
        }
      }else if (index === this.count){// 在最后插入
        current = this.tail
        current.next = node
        node.prev = current
        this.tail = node
      }else{ // 在中间插入
        const previous = this.getElementAt(index - 1)
        current = previous.next
        node.next = current
        previous.next = node
        current.prev = node
        node.prev = previous
      }
      this.count++
      return true
    }
    return false
  }
  // 重写removeAt，从任意位置移除元素
  removeAt(index){
    if(index >= 0 && index < this.count){
      let current = this.head
      if(index === 0){// 第一项
        this.head = current.next
        if(this.count === 1){
          this.tail = undefined
        }else{
          this.head.prev = undefined
        }
      }else if(index === this.count - 1){// 最后一项
        current = this.tail
        this.tail = current.prev
        this.tail.next = undefined
      }else{
        current = this.getElementAt(index)
        const previous = current.prev
        // 将previous和current.next连起来——跳过current从而删除current
        previous = current.next
        current.next.prev = previous
      }
      this.count--
      return current.element
    }
    return undefined
  }
  inverseToString(){
    if(this.tail == null){
      return ''
    }
    let objString = `${this.tail.element}`
    let previous = this.tail.prev
    while(previous != null){
      objString = `${objString},${previous.element}`
      previous = previous.prev
    }
    return objString
  }
}