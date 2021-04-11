import React from 'react'
import './index.scss'

export default function TodoItem(props) {
  const {data,openCheckModal,openEditModal,completeItem,removeItem} = props;
  return (
    <>
      <li className="todo-item">
        <div className="check-box">
          <input
            checked={data.completed}
            onChange={()=>{completeItem(data.id)}}
            type="checkbox"
          />
        </div>
        <span 
          className="content"
          style={{'textDecoration':data.completed ? 'line-through':''}}
          >
          {data.content}
        </span>
        <div className="btn-group">
          <button 
            className="btn btn-primary"
            onClick={()=>{openCheckModal(data.id)}}
            >
              查看
          </button>
          <button 
            className="btn btn-primary"
            onClick={()=>{openEditModal(data.id)}}
            >
              编辑
          </button>
          <button 
            className="btn btn-primary"
            onClick={()=>{removeItem(data.id)}}>
              删除
          </button>
        </div>
      </li>
    </>
  )
}
