/*
  红黑树(red-black-tree)是AVL树外另一种自平衡二叉搜索树

  在红黑树中，每个节点都遵循以下规则：
  1）每个节点不是红就是黑
  2）树的根节点是黑的
  3）所有叶节点都是黑的（用NULL引用表示的节点）
  4）如果一个子节点是红的，那么它的两个子节点都是黑的
  5）不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点
  6）从给定的节点到它的后代节点（NULL叶节点）的所有路径包含相同数量的黑节点
  
*/

import { Compare, defaultCompare } from "../../utils";
import BinarySearchTree from "./binary-search-tree";
import { RedBlackNode } from '../models/node.js'

const Colors = {
  BLACK: 'black',
  RED: 'red'
}

export default class RedBlackTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn)
    this.compareFn = compareFn
    this.root = null
  }
  insert(key) {
    if (this.root == null) {
      this.root = new RedBlackNode(key)
      this.root.color = Colors.BLACK
    } else {
      const newNode = this.insertNode(this.root, key) // 插入节点。新插入的节点默认是红色，根节点是黑色
      this.fixTreeProperties(newNode) // 插入节点后验证红黑树属性
    }
  }
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new RedBlackTree(key)
        node.left.parent = node
        return node.left
      } else {
        return this.insertNode(node.left, key)
      }
    } else if (node.right == null) {
      node.right = new RedBlackTree(key)
      node.right.parent = node
      return node.right
    } else {
      return this.insertNode(node.right, key)
    }
  }
  /*
    在插入节点后验证红黑树的属性
    验证红黑树是否平衡以及满足它的所有要求，有两个概念：重新填色和旋转
  */
  fixTreeProperties(node) {
    while (node && node.parent && node.parent.color.isRed() && node.color !== Colors.BLACK) {// 如果一个红色节点的父节点是红色的
      let parent = node.parent
      const grandParent = parent.parent
      // 情形A：父节点是左侧子节点
      if (grandParent && grandParent.left === parent) {
        const uncle = grandParent.right // 叔节点
        // 情形1A：叔节点也是红色————只需要重新填色，使其变成黑色节点
        if (uncle && uncle.color === Colors.RED) {
          grandParent.color === Colors.RED
          parent.color = Colors.BLACK
          uncle.color = Colors.BLACK
          node = grandParent
        } else {
          // 情形2A：节点是右侧子节点————左旋转
          if (node === parent.right) {
            this.rorationRR(parent)
            node = parent
            parent = node.parent
          }
          // 情形3A：节点是左侧子节点————右旋转
          this.rotationLL(grandParent)
          parent.color = Colors.BLACK
          grandParent.color = Colors.RED
          node = parent
        }
      } else { // 情形B：父节点是右侧子节点
        const uncle = grandParent.left
        // 情形1B：叔节点也是红色————只需要重新填色，使其变成黑色节点
        if (uncle && uncle.color === Colors.RED) {
          grandParent.color = Colors.RED
          parent.color = Colors.BLACK
          parent.color = Colors.BLACK
          node = grandParent
        } else {
          // 情形2B: 节点是左侧子节点————右旋转
          if (node === parent.left) {
            this.rotationLL(parent)
            node = parent
            parent = node.parent
          }
          // 情形3B：节点是右侧子节点————左旋转
          this.rorationRR(grandParent)
          parent.color = Colors.BLACK
          grandParent.color = Colors.RED
          node = parent
        }
      }
    }
    this.root.color = Colors.BLACK
  }
  rotationLL(node) {
    const tmp = node.left
    node.left = tmp.right
    if (tmp.right && tmp.right.key) {
      tmp.right.parent = node
    }
    tmp.parent = node.parent
    if (!node.parent) {
      this.root = tmp
    }else{
      if(node === node.parent.left){
        node.parent.left = tmp
      }else{
        node.parent.right = tmp
      }
    }
    tmp.right = node
    node.parent = tmp
  }
  rotationRR(node){
    const tmp = node.right
    node.right = tmp.left
    if(tmp.left && tmp.left.key){
      tmp.left.parent = node
    }
    tmp.parent = node.parent
    if(!node.parent){
      this.root = tmp
    }else{
      if(node === node.parent.left){
        node.parent.left = tmp
      }else{
        node.parent.right = tmp
      }
    }
    tmp.left = node
    node.parent = tmp
  }
}