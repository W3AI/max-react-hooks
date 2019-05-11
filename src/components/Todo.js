import React, { useState } from 'react';

const Todo = props => {
    // Using Multiple States
    const [todoName, setTodoName] = useState('');
    const [todoList, setTodoList] = useState([]);

    // Change Handler for Multiple States
    const inputChangeHandler = (event) => {
        setTodoName(event.target.value);
    };

    const todoAddHandler = () => {
        setTodoList(todoList.concat(todoName));
    };

    // Using One State
    // const [todoState, setTodoState] = useState({userInput: '', todoList: [] });
    // Change Handler for One State
    // const inputChangeHandler = (event) => {
    //     setTodoState({
    //         userInput: event.target.value, 
    //         todoList: todoState.todoList
    //     });
    // };
    // const todoAddHandler = () => {
    //     setTodoState({
    //         userInput: todoState.userInput, 
    //         todoList: todoState.todoList.concat(todoState.userInput)
    //     });
    // };

    return <React.Fragment>
        <input 
        type="text" 
        placeholder="Todo" 
        onChange={inputChangeHandler} 
        value={todoName}/>
        <button type="button" onClick={todoAddHandler} >Add</button>
        <ul>
            {todoList.map(todo => (
                <li key={todo}>{todo}</li>
            ))}
        </ul>
    </React.Fragment>;
};

export default Todo;