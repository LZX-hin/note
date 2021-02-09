/*
  <div id="app" style="color: red;font-size: 20px;">
    你好，{{name}}
    <span class="text" style="color: green;">{{age}}</span>
  </div>

  创建元素： _c() --> createElement()
  创建文本： _v() --> createTextNode()
  解析Mustache插值： _s() --> {{name}} --> -S(name)
**/

// 我们要生成以下这堆东西
// function vrender(){
//   return `
//     _c(
//       "div",
//       {
//         "id": "app", 
//         "style": { 
//           "color": "red", 
//           "font-size": "20px" 
//         }
//       },
//       _v("你好，"+_s(name)),
//       _c(
//         "span",
//         {
//           "class": "text", 
//           "style": { 
//             "color": "green" 
//           }
//         },
//         _v(_s(age))
//       )
//     )
//   `;
// }

function formatProps(attrs){
  let attrStr = '';
  for(let i=0;i<attrs.length;i++){
    let attr = attrs[i];
    if(attr.name === 'style'){
      let styleAttrs = {};
      attr.value.split(';').forEach(styleAttr => {
        let [key, value] = styleAttr.split(':');
        styleAttrs[key] = value;
      })
      attr.value = styleAttrs;
    }
    attrStr += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  console.log(`{${attrStr.slice(0, -1)}}`)
  return `{${attrStr.slice(0, -1)}}`
}

function generateChild(node){
  
}

function getChildren(el){
  const children = el.children;
  if(children){
    return children.map(c => {
      generateChild(c)
    }).join(',')
  }
}

function generate(el){
  console.log(el)
  let children = getChildren(el);
  let code = `
    _c('${el.tag}',
    ${ el.attrs.length > 0 ? `${formatProps(el.attrs)}` : 'undefined' }
    ${children ? `,${children}` : '' })
  `;

  return code;
}

export {
  generate
}