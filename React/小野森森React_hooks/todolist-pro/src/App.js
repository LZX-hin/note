import { useState, useCallback, useEffect } from 'react'
import './App.css';
import MyHeader from './components/Header'
import AddInput from './components/AddInput'
import TodoItem from './components/TodoItem'
import CheckModal from './components/Modal/CheckModal'
import EditModal from './components/Modal/EditModal'

function App() {
  const [isInputShow, setInputShow] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [isShowCheckModal, setShowCheckModal] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [isShowEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem('todoData') || '[]')
    setTodoList(todoData)
  }, []);

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoList))
  }, [todoList])

  const addItem = useCallback(value => {
    const dataItem = {
      id: new Date().getTime(),
      content: value,
      completed: false
    }
    setTodoList(todoList => [...todoList, dataItem])
    setInputShow(false)
  }, [])

  const openCheckModal = useCallback((id) => {
    setCurrentData(() => todoList.filter(item => item.id === id)[0])
    setShowCheckModal(true)
  }, [todoList])

  const openEditModal = useCallback((id) => {
    setCurrentData(() => todoList.filter(item => item.id === id)[0])
    setShowEditModal(true)
  }, [todoList])

  const submitEdit = useCallback((newData, id) => {
    setTodoList((todoList) =>
      todoList.map(item => {
        if (item.id === id) {
          item = newData
        }
        return item
      })
    )
    setShowEditModal(false)
  }, [])

  const completeItem = useCallback((id)=>{
    setTodoList(todoList => 
      todoList.map(item => {
        if(item.id === id){
          item.completed = !item.completed
        }
        return item
      })
    )
  },[])

  const removeItem = useCallback((id)=>{
    setTodoList(todoList => todoList.filter(item => item.id !== id))
  },[])

  return (
    <div className="App">
      <CheckModal
        isShowCheckModal={isShowCheckModal}
        data={currentData}
        closeModal={() => { setShowCheckModal(false) }}
      ></CheckModal>
      <EditModal
        isShowEditModal={isShowEditModal}
        data={currentData}
        submitEdit={submitEdit}
      ></EditModal>
      <MyHeader openInput={() => { setInputShow(!isInputShow) }}></MyHeader>
      <AddInput
        isInputShow={isInputShow}
        addItem={addItem}
      >
      </AddInput>
      <ul className="todo-list">
        {
          todoList.map(item => {
            return (
              <TodoItem
                key={item.id}
                data={item}
                openCheckModal={openCheckModal}
                openEditModal={openEditModal}
                completeItem={completeItem}
                removeItem={removeItem}
              >

              </TodoItem>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;