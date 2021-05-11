const Colors = {
  BLACK: 'black',
  RED: 'red'
}

// 树节点
export class Node {
  constructor(key){
    this.key = key // 节点值
    this.left = null // 左侧子节点引用
    this.right = null // 右侧子节点引用
  }
}
// 红黑树节点
export class RedBlackNode extends Node{
  constructor(key){
    super(key)
    this.key = key
    this.color = Colors.RED // 当前节点颜色
    this.parent = null // 父节点
  }
  isRed(){
    return this.color === Colors.RED
  }
}