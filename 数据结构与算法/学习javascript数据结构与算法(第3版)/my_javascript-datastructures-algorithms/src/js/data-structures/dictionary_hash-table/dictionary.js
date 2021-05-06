/*
  字典(映射)dictionary用[键,值]对的形式来存储数据
  在字典中每个键只能有一个值
  字典也称为映射、符号表或关联数组
*/

import { defaultToString } from '../../utils.js'
// defaultToString是将对象转换为字符串，在字典中，理想情况下是用字符串作为key的，所以这里转换一下

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

export default class Dictionary{
  constructor(toStrFn = defaultToString){
    this.toStrFn = toStrFn
    this.table = {}
  }
  set(key,value){
    if(key != null && value != null){
      const tableKey = this.toStrFn(key)
      this.table[tableKey] = new ValuePair(key,value)
      return true
    }
    return false
  }
  // 从字典中移除一个值
  remove(key){
    if(this.hasKey(key)){
      delete this.table[this.toStrFn(key)]
      return true
    }
    return false
  }
  // 检查一个键是否存在字典中
  hasKey(key){
    return this.table[this.toStrFn(key)] != null
  }
  // 从字典中检索一个值
  get(key){
    const valuePair = this.table[this.toStrFn(key)]
    return valuePair == null ? undefined : valuePair.value
  }
  clear(){
    this.table = {}
  }
  // 返回字典中key的个数
  size(){
    return Object.keys(this.table).length
  }
  isEmpty(){
    return this.size() === 0
  }
  // 返回Dictionary类中用于识别值的所有（原始）key
  keys(){
    return this.keyValues().map(valuePair => valuePair.key)
  }
  values(){
    return this.keyValues().map(valuePair => valuePair.value)
  }
  keyValues(){
    const valuePairs = []
    for(const k in this.table){
      if(this.hasKey(k)){
        valuePairs.push(this.table[k])
      }
    }
    return valuePairs
  }
  // 以数组形式返回字典中所有valuePair对象
  valuePairs(){
    return Object.values(this.table)
  }
  forEach(callbackFn){
    const valuePairs = this.keyValues()
    for(let i=0;i<valuePairs.length;i++){
      const result = callbackFn(valuePairs[i].key,valuePairs[i].value)
      if(result === false){
        break
      }
    }
  }
  toString(){
    if(this.isEmpty()){
      return ''
    }
    const valuePairs = this.keyValues()
    let objString = `${valuePairs[0].toString()}`
    for(let i=1;i<valuePairs.length;i++){
      objString = `${objString},${valuePairs[i].toString()}`
    }
    return objString
  }
}