/*
  二叉搜索树问题：树的一条边可能会非常深
  解决：AVL树

  AVL树是一种自平衡二叉搜索树，它规定了树中的每个节点的左右两侧子树高度差最大为1。当然，AVL树本身也是二叉搜索树
*/
import { defaultCompare } from '../../utils.js';
import BinarySearchTree from './binary-search-tree.js'

const BalenceFactor = {
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
  // 1. LL：向右旋转
  rotationLL(node){
    const tmp = node.left
    node.left = tmp.right
    tmp.right = node
    return tmp
  }
}