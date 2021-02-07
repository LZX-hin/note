import { parseHtmlToAst } from './astParser';

// 这个方法是将html转换成render函数
function compileToRenderFunction(html){
  // parseHtmlToAst()将html先转换成AST
  const ast = parseHtmlToAst(html);
  console.log(ast);
}

export {
  compileToRenderFunction
}