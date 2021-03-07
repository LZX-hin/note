import {ref,onMounted,onBeforeUnmount} from 'vue';
export default function(){
  const x = ref(-1);
  const y = ref(-1);
  const clickHandler = (event: MouseEvent) => {
    x.value = event.pageX;
    y.value = event.pageY;
  }
  // 页面已经加载完毕了，再进行点击操作
  onMounted(()=>{
    window.addEventListener('click',clickHandler);
  })
  onBeforeUnmount(()=>{
    window.removeEventListener('click',clickHandler);
  })
  return {
    x,y
  }
}