/*
  树是一种非顺序数据结构，对于需要快速查找的数据十分有用
  
  树的相关术语：
  1. 根节点。没有父节点，在树的最顶部
  2. 节点。树中的每个元素称为节点，节点分外内部节点和外部节点
    内部节点：至少有一个子节点的节点
    外部节点：没有子节点的节点
  3. 子树。子树由节点和它的后代构成
  4. 深度。节点的深度取决于它的祖先节点数量
  5. 树的高度。取决于所有节点的深度的最大值
  6. 树中每个节点也被称为键
*/

// 二叉搜索树
// 二叉树最多只能有两个子节点
import { Compare, defaultCompare } from '../../utils.js'
import { Node } from '../models/node.js'

export default class BinarySearchTree{
  constructor(compareFn = defaultCompare){
    this.compareFn = compareFn // 用来比较节点值
    this.root = null // Node类型的根节点
  }
  // 插入一个新键
  insert(key){
    if(this.root == null){
      this.root = new Node(key)
    }else{
      this.insertNode(this.root, key)
    }
  }
  // 将节点添加到根节点以外的位置
  insertNode(node, key){
    if(this.compareFn(key, node.key) === Compare.LESS_THAN){// 如果新节点的键(key)小于当前节点的键(node.key)，则要检查当前节点的左子节点是否为空
      if(node.left == null){ // 如果左侧没有子节点，则在这里插入
        node.left = new Node(key)
      }else{// 如果左侧有子节点，则要通过递归调用insertNode()继续找到树的下一层
        this.insertNode(node.left, key)
      }
    }else{ // 如果新节点的键大于当前节点的键，则检测右侧子节点
      if(node.right == null){
        node.right = new Node(key)
      }else{
        this.insertNode(node.right, key)
      }
    }
  }
  search(key){}
  /*
    树的遍历：指的是访问树的每个节点并对它们进行某种操作的过程。
    树的遍历有三种：1.中序 2.先序 3.后序
  */
  /*
    中序遍历：是一种以上行顺序访问BST所有节点的遍历方式，也就是从最小到最大的顺序访问所有节点
    应用：对树进行排序操作
  */
  inOrderTraverse(callback){
    this.inOrderTraverseNode(this.root, callback)
  }
  inOrderTraverseNode(node, callback){
    if(node != null){
      this.inOrderTraverseNode(node.left, callback)
      callback(node.key)
      this.inOrderTraverseNode(node.right, callback)
    }
  }
  /*
    先序遍历：是以优先于后代节点的顺序访问每个节点
    引用：打印一个结构化的文档
    备注：先序遍历和中序遍历的不同点就是：先序遍历会先访问节点本身(先执行callback)，再访问该节点的左节点，最后是右节点
  */
  preOrderTraverse(callback){
    this.preOrderTraverseNode(this.root, callback)
  }
  preOrderTraverseNode(node, callback){
    if(node != null){
      callback(node.key)
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }
  /*
    后序遍历：先访问节点的后代节点，再访问节点本身
    应用：计算一个目录及其子目录中所有文件所占空间的大小
  */
  postOrderTraverse(callback){
    this.postOrderTraverseNode(this.root, callback)
  }
  postOrderTraverseNode(node, callback){
    if(node != null){
      this.postOrderTraverseNode(node.left, callback)
      this.postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }
  // 搜索最小值
  // 在二叉树中，最小值就是最左下角的节点
  min(){
    return this.minNode(this.root)
  }
  // 搜索最小值具体执行函数
  minNode(node){
    let current = node
    while(current != null && current.left != null){
      current = current.left
    }
    return current
  }
  max(){
    return this.maxNode(this.root)
  }
  maxNode(node){
    let current = node
    while(current != null && current.right != null){
      current = current.right
    }
    return current
  }
  search(key){
    return this.searchNode(this.root, key)
  }
  searchNode(node, key){
    if(node == null){
      return false
    }
    if(this.compareFn(key, node.key) === Compare.LESS_THAN){
      return this.searchNode(node.left, key)
    }else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN){
      return this.searchNode(node.right, key)
    }else{
      return true
    }
  }
  remove(key){
    this.root = this.removeNode(this.root, key)
  }
  removeNode(node, key){
    if(node == null){
      return null
    }
    if(this.compareFn(key, node.key) === Compare.LESS_THAN){
      node.left = this.removeNode(node.left, key)
      return node
    }else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN){
      node.right = this.removeNode(node.right, key)
      return node
    }else{
      if(node.left == null && node.right == null){
        node = null
        return node
      }
      if(node.left == null){
        node = node.right
        return node
      }else if(node.right == null){
        node = node.left
        return node
      }
      const aux = this.minNode(node.right)
      node.key = aux.key
      node.right = this.removeNode(node.right, aux.key)
      return node
    }
  }
}