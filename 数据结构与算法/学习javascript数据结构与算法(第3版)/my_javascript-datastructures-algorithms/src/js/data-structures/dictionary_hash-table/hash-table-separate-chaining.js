import { defaultToString } from "../../utils";
import LinkedList from '../linked-list/linked-list.js'
import HashTable from './hashTable.js'

class ValuePair{
  // 该类是为了让字典的value保存原始的key和value
  constructor(key, value){
    this.key = key
    this.value = value
  }
  toString(){
    return `[#${this.key}:${this.value}]`
  }
}

/*
  分离链接是用于解决散列表冲突的一种结构
  方法是通过给散列表中每个位置创建一个链表，将元素存储在内，所以HashTableSeperateChaining主要是put、get、remove三个方法与HashTable不同
*/
export default class HashTableSeperateChaining extends HashTable{
  constructor(toStrFn=defaultToString){
    super()
    this.toStrFn = toStrFn
    this.table = {}
  }
  put(key,value){
    if(key != null && value != null){
      const position = this.hashCode(key)
      if(this.table[position] == null){
        this.table[position] = new LinkedList()
      }
      this.table[position].push(new ValuePair(key, value))
      return true
    }
    return false
  }
  get(key){
    const position = this.hashCode(key)
    const linkedList = this.table[position]
    if(linkedList != null && !linkedList.isEmpty()){
      let current = linkedList.getHead()
      while(current != null){
        if(current.element.key === key){
          return current.element.value
        }
        current = current.next
      }
    }
    return undefined
  }
  remove(key){
    const position = this.hashCode(key)
    const linkedList = this.table[position]
    if(linkedList != null && !linkedList.isEmpty()){
      let current = linkedList.getHead()
      while(current != null){
        if(current.element.key === key){
          // 找到链表中的位置，并remove删除
          linkedList.remove(current.element)
          // 删除链表中这个元素后，如果链表是空的，则删除整个链表
          if(linkedList.isEmpty()){
            delete this.table[position]
          }
          return true
        }
        current = current.next
      }
    }
    return false
  }
}