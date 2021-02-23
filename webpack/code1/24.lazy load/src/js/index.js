console.log('index.js被加载了')

document.getElementById('btn').onclick = function(){
  // 懒加载： 当文件需要使用时才加载
  // 预加载 prefetch：会在使用之前提前加载好文件 
  // 正常普通加载可以认为是并行加载（同一时间加载多个文件）  预加载prefetch：等其他资源（当前需要的文件）加载完毕，等浏览器空闲了再偷偷加载资源（未使用的文件）
  // 懒加载问题：如果文件比较大，当需要时才加载可能会造成页面小卡顿
  // 预加载问题：会有兼容性问题。可以在pc端高版本浏览器中使用，但是移动端或ie中不建议使用，会有很大兼容性问题
  
  import(/*webpackPrefetch: true*/'./test').then(({mul}) => {
    console.log(mul(2,3));
  })
}