import HashTable from '../../dictionary_hash-table/hashTable.js'
import HashTableLinearProbing from '../../dictionary_hash-table/hashTableLinearProbing.js'

// test
// const hash = new HashTable()
// hash.put('Gandalf','gandalf@email.com')
// hash.put('John','johnsnow@email.com')
// hash.put('Tyrion','tyrion@email.com')
// console.log(hash.hashCode('Gandalf')+'-Gandalf')
// console.log(hash.hashCode('John')+'-John')
// console.log(hash.hashCode('Tyrion')+'-Tyrion')
// console.log(hash.get('Gandalf'))
// console.log(hash.get('John'))
// hash.remove('Gandalf')
// console.log(hash.get('Gandalf'))

// 处理散列表中的冲突
// const hash = new HashTable()
// hash.put('Ygritte', 'Ygritte@email.com')
// hash.put('Jonathan', 'Jonathan@email.com')
// hash.put('Jamie', 'Jamie@email.com')
// hash.put('Jack', 'Jack@email.com')
// hash.put('Jasmine', 'Jasmine@email.com')
// hash.put('Jake', 'Jake@email.com')
// hash.put('Nathan', 'Nathan@email.com')
// hash.put('Athelstan', 'Athelstan@email.com')
// hash.put('Sue', 'Sue@email.com')
// hash.put('Aethelwulf', 'Aethelwulf@email.com')
// hash.put('Sargeras', 'Sargeras@email.com')
// console.log(hash.hashCode('Ygritte') + '-Ygritte')
// console.log(hash.hashCode('Jonathan') + '-Jonathan')
// console.log(hash.hashCode('Jamie') + '-Jamie')
// console.log(hash.hashCode('Jack') + '-Jack')
// console.log(hash.hashCode('Jasmine') + '-Jasmine')
// console.log(hash.hashCode('Jake') + '-Jake')
// console.log(hash.hashCode('Nathan') + '-Nathan')
// console.log(hash.hashCode('Athelstan') + '-Athelstan')
// console.log(hash.hashCode('Sue') + '-Sue')
// console.log(hash.hashCode('Aethelwulf') + '-Aethelwulf')
// console.log(hash.hashCode('Sargeras') + '-Sargeras')
// console.log(hash.toString())

// 问题：后面put的会覆盖前面put的
// 解决方法：1.分离链接 2.线性探查 3.双散列法

// 分离链接
// 含义：分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。
// 特点：分离链接法是解决冲突的最简单的方法，但是在HashTable实例之外还需要额外的存储空间

// 线性探查
// 含义：当想向表中添加一个新元素时，如果索引为position的位置已经被占据了，就会尝试position+1的位置，如果position+1位置也被占据了，就会尝试position+2，以此类推，直到找到空的位置就插入元素
// 线性探查分为两种：
//  1. 软删除
//  2. 检验是否有必要将一个或多个元素移动到之前的位置
const hashTable = new HashTableLinearProbing()
hashTable.put('Ygritte','Ygritte@email.com')
hashTable.put('Jonathan','Jonathan@email.com')
hashTable.put('Jamie','Jamie@email.com')
hashTable.put('Jack','Jack@email.com')
hashTable.put('Jasmine','Jasmine@email.com')
hashTable.put('Jake','Jake@email.com')
hashTable.put('Nathan','Nathan@email.com')
hashTable.put('Athelstan','Athelstan@email.com')
hashTable.put('Sue','Sue@email.com')
hashTable.put('Aethelwulf','Aethelwulf@email.com')
hashTable.put('Sargeras','Sargeras@email.com')
console.log('移除Jonathan前',hashTable.table)
hashTable.remove('Jonathan')
console.log('移除Jonathan后',hashTable.table)

