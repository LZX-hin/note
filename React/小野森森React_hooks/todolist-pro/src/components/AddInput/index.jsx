import React, {useRef} from 'react'
import './index.scss'

export default function AddInput(props) {
  const {isInputShow, addItem} = props
  const inputRef = useRef()
  function submitValue(){
    const inputValue = inputRef.current.value.trim()
    if(!inputValue){
      return
    }
    addItem(inputValue)
    // 清空输入框
    inputRef.current.value = '';
  }
  return (
    <>
      {
        isInputShow ? (
          <div className="input-wrapper">
            <input 
              ref={inputRef}
              type="text"
              placeholder="请输入待办事件"
            />
            <button 
              className="btn btn-pramiry" 
              onClick={submitValue}>
                增加
            </button>
          </div>
        ) : null
      }
    </>
  )
}
