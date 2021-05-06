/*
  散列表HashTable
  散列算法作用是尽可能快地在数据结构中找到一个值
*/

import { defaultToString } from "../../utils.js";

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

export default class HashTable{
  constructor(toStrFn = defaultToString){
    this.toStrFn = toStrFn
    this.table = {}
  }
  // 创建散列函数
  loseloseHashCode(key){
    if(typeof key === 'number'){
      return key
    }
    const tableKey = this.toStrFn(key)
    let hash = 0
    for(let i=0;i<tableKey.length;i++){
      hash += tableKey.charCodeAt(i)
    }
    return hash % 37
  }
  // 更好的散列函数
  djb2HashCode(key){
    const tableKey = this.toStrFn(key)
    let hash = 5381
    for(let i=0;i<tableKey.length;i++){
      hash = (hash * 3) + tableKey.charCodeAt(i)
    }
    return hash % 1013
  }
  hashCode(key){
    return this.djb2HashCode(key)
  }
  put(key,value){
    if(key != null && value != null){
      const position = this.hashCode(key)
      this.table[position] = new ValuePair(key,value)
      return true
    }
  }
  remove(key){  
    const hash = this.hashCode(key)
    const valuePair = this.table[hash]
    if(valuePair != null){
      delete this.table[hash]
      return true
    }
    return false
  }
  get(key){
    const valuePair = this.table[this.hashCode(key)]
    return valuePair == null ? undefined : valuePair
  }
  toString(){
    if(this.isEmpty()){
      return ''
    }
    const keys = Object.keys(this.table)
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`
    for(let i=1;i<keys.length;i++){
      objString = `${objString},\n{${keys[i]} => ${this.table[keys[i]].toString()}}`
    }
    return objString
  }
  isEmpty(){
    return Object.keys(this.table).length === 0 ? true : false
  }
}