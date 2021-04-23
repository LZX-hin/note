/*
  集合Set是一个没有重复元素且无序的数据结构
*/
class Set{
  constructor(){
    this.items = {}
  }
  add(element){
    if(!this.has(element)){
      this.items[element] = element
      return true
    }
    return false
  }
  delete(element){
    if(this.has(element)){
      delete this.items[element]
      return true
    }
    return false
  }
  has(element){
    return Object.hasOwnProperty.call(this.items,element)
  }
  clear(){
    this.items = {}
  }
  size(){
    return Object.keys(this.items).length
  }
  values(){
    return Object.values(this.items)
  }
  // 返回当前set和另一个set的并集
  union(otherSet){
    const unionSet = new Set()
    this.values().forEach(value=>{
      unionSet.add(value)
    })
    otherSet.values().forEach(value => {
      unionSet.add(value)
    })
    return unionSet
  }
  // 返回当前set和另一个set的交集
  intersection(otherSet){
    const intersectionSet = new Set()

    const values = this.values()
    for(let i=0;i<values.length;i++){
      if(otherSet.has(values[i])){
        intersectionSet.add(values[i])
      }
    }
    return intersectionSet
  }
}

// test
// 使用Set类
// const set = new Set()
// set.add(1)
// console.log(set.values())
// console.log(set.has(1))
// console.log(set.size())

// set.add(2)
// console.log(set.values())
// console.log(set.has(2))
// console.log(set.size())

// set.delete(1)
// console.log(set.values())

// set.delete(2)
// console.log(set.values())

// 并集
// const setA = new Set()
// setA.add(1)
// setA.add(2)
// setA.add(3)

// const setB = new Set()
// setB.add(3)
// setB.add(4)
// setB.add(5)
// setB.add(6)

// const unionAB = setA.union(setB)
// console.log(unionAB.values())

// 交集
const setA = new Set()
setA.add(1)
setA.add(2)
setA.add(3)

const setB = new Set()
setB.add(2)
setB.add(3)
setB.add(4)

const intersectionAB = setA.intersection(setB)
console.log(intersectionAB.values())