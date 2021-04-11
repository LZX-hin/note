function _addZero(value){
  return value < 10 ? ('0' + value) : value;
}

function formatDateTime(timeStamp){
  const date = new Date(timeStamp)
  const y = date.getFullYear()
  const m = date.getMonth()+1
  const d = date.getDate()
  const h = _addZero(date.getHours())
  const i = _addZero(date.getMinutes())
  const s = _addZero(date.getSeconds())
  return `${y}年${m}月${d}日 ${h}:${i}:${s}`;
}
export {
  formatDateTime
}