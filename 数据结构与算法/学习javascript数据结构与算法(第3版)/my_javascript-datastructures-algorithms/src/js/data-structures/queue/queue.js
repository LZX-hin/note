class Queue {
  constructor(){
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  enqueue(element){
    this.items[this.count] = element;
    this.count++;
  }
  dequeue(){
    if(this.isEmpty()){
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }
  peek(){
    if(this.isEmpty()){
      return undefined;
    }
    return this.items[this.lowestCount];
  }
  isEmpty(){
    return this.count - this.lowestCount === 0;
  }
  size(){
    return this.count - this.lowestCount;
  }
  clear(){
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }
  toString(){
    if(this.isEmpty()){
      return ''
    }
    let objString = `${this.items[this.lowestCount]}`;
    for(let i = this.lowestCount + 1;i<this.count;i++){
      objString = `${objString},${this.items[i]}`
    }
    return objString;
  }
}

// test
// 使用Queue类
// const queue = new Queue();
// queue.enqueue('John');
// queue.enqueue('David');
// queue.enqueue('Ross')
// queue.dequeue()
// queue.dequeue()

// 击鼓传花
function hotPotato(elementList, num){
  const queue = new Queue()
  const eliminatedList = []

  for(let i=0;i<elementList.length;i++){
    queue.enqueue(elementList[i])
  }
  while(queue.size() > 1){
    for(let i=0;i<num;i++){
      queue.enqueue(queue.dequeue())
    }
    eliminatedList.push(queue.dequeue())
  }
  return {
    eliminated: eliminatedList,
    winner: queue.dequeue()
  }
}

const names = ['John','Jack','Camila','Ingrid','Carl']
const result = hotPotato(names,7)
result.eliminated.forEach(item => {
  console.log(`被淘汰的${item}`)
})
console.log('胜利者:',result.winner)