import logo from './logo.svg';
import './App.css';
import React, { useState, useCallback, useEffect } from 'react';


// const useButtonCounter = (initialCount = 0) => {
//   const [count, setCount] = useState(initialCount);

//   const handleClick = () => {
//     setCount(count + 1);
//   };

//   return [count, handleClick];
// }


// const ButtonA = () => {
//   const [count, handleClick] = useButtonCounter(1);

//   console.log('A', count)

//   return <button onClick={handleClick}>按鈕 A</button>
// }

// const ButtonB = () => {
//   const [count, handleClick] = useButtonCounter(1);
//   console.log('B', count)

//   return <button onClick={handleClick}>按鈕 B</button>
// }
// const Input=()=>{
//   return <input placeholder='input value'></input>
// }

//Custom Hook

function New({ todo, setTodos }) {
  //{}解構todos

  //監聽編輯input
  const [editTodo, setEditTodo] = useState('')
  const handleInputEdit = (event) => {
    setEditTodo(event.target.value);
    console.log(event.target.value)
  };
  //編輯資料
  const onEdit = (id) => {

    //迴圈所有todos，並在找到id後替換value值回傳
    // const updatedTodos = todos.map(todo => {
    //   if (todo.id === id) {
    //     return { ...todo, value: editTodo };
    //   }
    //   return todo;
    // });
    //setTodos(updatedTodos) ↓改已下

    setTodos((todos) => {
      // const newVlaue = 
      return todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, value: editTodo };
        }
        return todo
      })
      //map 回傳一個array
      // return newVlaue
    });

    setEditTodo(''); // 清空输入框 Q:為什麼無法清空 v
    // console.log('onEdit')
  }

  return (
    <>
      <button onClick={() => onEdit(todo.id)}>修改</button>
      <input type="text" value={editTodo} onChange={handleInputEdit} />
    </>
  )
}

function App() {

  const [todos, setTodos] = useState([
    { id: 1, value: '買蛋糕', idDone: false },
    { id: 2, value: '買牛奶', idDone: false },
    { id: 3, value: '買麵包', idDone: false },
  ])

  //監聽新增input
  const [newTodo, setNewTodo] = useState('')
  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
    // console.log(event.target.value)
  };

  //新增資料
  const onCreate = () => {

    const newId = todos.length + 1;
    const newTodoItem = { id: newId, value: newTodo, isDone: false };
    setTodos([...todos, newTodoItem]);
    setNewTodo(''); // 清空输入框

    //Q:為什麼todos是舊的陣列而不是新增後的? v
    console.log(todos)

    //Q:怎麼解決產生相同ID的問題 V
    //1.crypto.randomUUID()  亂數字串 支援度? 新語法
    //2.Date.now() 時間  一毫秒>會有問題
    //3.Symbol() =獨一無二 (不建議在react使用)
    //4.let a = 3  a++
    //原方法
    // setTodos(prev => {
    //   console.log('This oldData', prev)
    //   const newData = { id: todos.length, value: todos.length, idDone: false }
    //   return [...prev, newData]
    // })

  }

  //刪除資料
  const onDelete = (id) => {

    setTodos(prev => {
      const next = prev.filter((todo) => todo.id !== id)
      return next
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='todolistName'>TODOLIST</h1>
        {todos.map((todo) => {
          return (
            <div key={todo.id}>
              <span>{todo.value}</span>

              <button onClick={() => onDelete(todo.id)}>刪除</button>
              
              {/* 為什麼不能打 onClick={onDelete(todo.id)}  */}

              <New todo={todo} setTodos={setTodos} />

            </div>
          )
        })}
        <br />
        <label>
          value:
          <input type="text" value={newTodo} onChange={handleInputChange} />
        </label>
        <br />
        <button onClick={onCreate}>新增</button>
      </header>
    </div>
  );
}

const CrudExample = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleAddItem = () => {
    const newItems = [...items];
    newItems.push({ name, age });
    setItems(newItems);
    setName('');
    setAge('');
  };

  const handleEditItem = (index) => {
    const newItems = [...items];
    newItems[index].name = name;
    newItems[index].age = age;
    setItems(newItems);
    setName('');
    setAge('');
  };

  const handleDeleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div>
      <h1>CRUD Example</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>
                <button onClick={() => handleEditItem(index)}>Edit</button>
                <button onClick={() => handleDeleteItem(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add Item</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Age:
        <input type="text" value={age} onChange={handleAgeChange} />
      </label>
      <br />
      <button onClick={handleAddItem}>Add</button>
    </div>
  );
};


export default App;
