import { defaultEquals } from "../../utils"
import LinkedList from "./linked-list"

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
}

function defaultCompare(a,b){
  if(a === b){
    return 0
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

// 有序链表：指保持元素有序的链表结构。将元素插入到正确位置来保证链表的有序性。
class SortedLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals, compareFn = defaultCompare){
    super(equalsFn)
    this.compareFn = compareFn
  }
  push(element){
    if(this.isEmpty()){
      super.push(element)
    }else{
      const index = this.getIndexNextSortedElement(element)
      super.insert(element, index)
    }
  }
  insert(element, index = 0){
    if(this.isEmpty()){
      return super.insert(element, 0)
    }
    const pos = this.getIndexNextSortedElement(element)
    return super.insert(element, pos)
  }
  getIndexNextSortedElement(element){
    let current = this.head
    for(i=0;i<this.size() && current;i++){
      const comp = this.compareFn(element, current.element)
      if(comp === Compare.LESS_THAN){
        return i
      }
      current = current.next
    }
    return i
  }
}