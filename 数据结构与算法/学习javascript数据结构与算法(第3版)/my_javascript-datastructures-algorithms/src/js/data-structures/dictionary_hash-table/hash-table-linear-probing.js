import { defaultToString } from "../../utils.js";
import HashTable from './hash-table.js'

class ValuePair {
  // 该类是为了让字典的value保存原始的key和value
  constructor(key, value, hash) {
    this.key = key
    this.value = value
  }
  toString() {
    return `[#${this.key}:${this.value}]`
  }
}

/*
  线性探查是第二种解决散列表冲突的方法
  当想向表中添加一个新元素时，如果索引为position的位置已经被占据了，就会尝试position+1的位置，如果position+1位置也被占据了，就会尝试position+2，以此类推，直到找到空的位置就插入元素

  线性探查分为两种：
  1. 软删除
  2. 检验是否有必要将一个或多个元素移动到之前的位置
*/

export default class HashTableLinearProbing extends HashTable {
  constructor(toStrFn = defaultToString) {
    super()
    this.toStrFn = toStrFn
    this.table = {}
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key)
      if (this.table[position] == null) {
        this.table[position] = new ValuePair(key, value)
      } else {
        let index = position + 1
        // 如果当前position位置被占据了，就while遍历出下一个没有被占据的位置
        while (this.table[index] != null) {
          index++
        }
        this.table[index] = new ValuePair(key, value)
      }
      return true
    }
    return false
  }
  get(key) {
    const position = this.hashCode(key)
    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        return this.table[position].value
      }
      let index = position + 1
      while (this.table[index] != null && this.table[index].key !== key) {
        index++
      }
      if (this.table[index] != null && this.table[index].key === key) {
        return this.table[index].value
      }
    }
    return undefined
  }
  remove(key) {
    const position = this.hashCode(key)
    if (this.table[position].key != null) {
      if (this.table[position].key === key) {
        delete this.table[position]
        this.verifyRemoveSideEffect(key, position)
        return true
      }
      let index = position + 1
      while (this.table[index] != null && this.table[index].key != key) {
        index++
      }
      if (this.table[index] != null && this.table[index].key === key) {
        delete this.table[index]
        this.verifyRemoveSideEffect(key, index)
        return true
      }
    }
    return false
  }
  verifyRemoveSideEffect(key, removedPosition) {
    const hash = this.hashCode(key)
    let index = removedPosition + 1
    while (this.table[index] != null) {
      const posHash = this.hashCode(this.table[index].key)
      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index]
        delete this.table[index]
        removedPosition = index
      }
      index++
    }
  }
}
