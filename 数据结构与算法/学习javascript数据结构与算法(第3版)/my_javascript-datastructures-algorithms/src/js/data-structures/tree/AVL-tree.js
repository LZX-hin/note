/*
  二叉搜索树问题：树的一条边可能会非常深
  解决：AVL树

  AVL树是一种自平衡二叉搜索树，它规定了树中的每个节点的左右两侧子树高度差最大为1。当然，AVL树本身也是二叉搜索树
*/
import { Compare, defaultCompare } from '../../utils.js';
import BinarySearchTree from './binary-search-tree.js'

const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5
}

// AVL树在添加或删除节点时会尝试自平衡。
/*
  AVL树中的概念：
  1. 节点的高度：从节点到其任意子节点的边的最大值
  2. 平衡因子：在AVL树中需要对每个节点进行右子树节点高度和左子树高度进行计算差值，该值应为0，-1，1，如果不是这三个值就要平衡该树。
*/
export default class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn)
    this.compareFn = compareFn
    this.root = null
  }
  // 计算一个节点的高度
  getNodeHeight(node) {
    if (node == null) {
      return -1
    }
    return Math.max(
      this.getNodeHeight(node.left), this.getNodeHeight(node.right)
    ) + 1
  }
  // 计算一个节点的平衡因子
  getBalanceFactor(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      case 2:
        return BalanceFactor.UNBALANCED_LEFT
      default:
        return BalanceFactor.BALANCED
    }
  }
  /*
    平衡操作——AVL旋转，有单旋转和双旋转两种
    对应四种场景：
  */
  // 1. LL：向右单旋转：出现在左侧子节点高度大于右侧子节点高度，并且左侧子节点也是平衡或左侧较重
  rotationLL(node){
    const tmp = node.left
    node.left = tmp.right
    tmp.right = node
    return tmp
  }
  // 2. RR：向左单旋转：出现在右侧子节点高度大于左侧子节点高度时，并且右侧子节点也是平衡或右侧较重
  rotationRR(node){
    const tmp = node.right
    node.right = tmp.left
    tmp.left = node
    return tmp
  }
  // 3. LR：向右双旋转：出现在左侧子节点高度大于右侧子节点高度，并且左侧子节点的右侧较重
  rotationLR(node){
    node.left = this.rotationRR(node.left)
    return this.rotationLL(node)
  }
  // 4. RL：向左双旋转：出现在右侧子节点高度大于左侧子节点高度，并且右侧子节点的左侧较重
  rotationRL(node){
    node.right = this.rotationLL(node.right)
    return this.rotationRR(node)
  }
  insert(key){
    this.root = this.insertNode(this.root, key)
  }
  insertNode(node, key){
    if(node == null){
      return new Node(key)
    }else if(this.compareFn(key, node.key) === Compare.LESS_THAN){
      node.left = this.insertNode(node.left, key)
    }else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN){
      node.right = this.insertNode(node.right, key)
    }else{
      return node
    }
    // 如果需要，将树进行平衡操作
    const BalanceFactor = this.getBalanceFactor(node)
    if(BalanceFactor === BalanceFactor.UNBALANCED_LEFT){
      if(this.compareFn(key,node.left.key) === Compare.LESS_THAN){
        node = this.rotationLL(node)
      }else{
        return this.rotationLR(node)
      }
    }
    if(BalanceFactor === BalanceFactor.UNBALANCED_RIGHT){
      if(this.compareFn(key, node.right.key) === Compare.BIGGER_THAN){
        node = this.rotationRR(node)
      }else{
        return this.rotationRL(node)
      }
    }
    return node
  }
  removeNode(node, key){
    node = super.removeNode(node, key)
    if(node == null){
      return node
    }
    const balanceFactor = this.getBalanceFactor(node)
    if(balanceFactor === BalanceFactor.UNBALANCED_LEFT){
      const balanceFactorLeft = this.getBalanceFactor(node.left)
      if(balanceFactorLeft === BalanceFactor.BALANCED || balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT){
        return this.rotationLL(node)
      }
      if(balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT){
        return this.rotationLR(node.left)
      }
    }
    if(balanceFactor === BalanceFactor.UNBALANCED_RIGHT){
      const balanceFactorRight = this.getBalanceFactor(node.right)
      if(balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT){
        return this.rotationRR(node)
      }
      if(balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT){
        return this.rotationRL(node.right)
      }
    }
    return node
  }
}