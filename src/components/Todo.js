import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = props => {
    // Using Multiple States
    const [todoName, setTodoName] = useState('');
    const [todoList, setTodoList] = useState([]);

    // useEffect - to include as input a function to execute when component loads first time
    useEffect(() => {
        axios.get('https://react-hooks-todos.firebaseio.com/todos.json').then(result => {
            console.log(result);
            const todoData = result.data;
            const todos = [];
            for (const key in todoData) {
                todos.push({id: key, name: todoData[key].name});
            }
            setTodoList(todos);
        });
    }, [] );    // [array of predecessors tasks/vars] or [] for compDidMount / first comp load

    // Change Handler for Multiple States
    const inputChangeHandler = (event) => {
        setTodoName(event.target.value);
    };

    const todoAddHandler = () => {
        setTodoList(todoList.concat(todoName));
        axios.post('https://react-hooks-todos.firebaseio.com/todos.json', {name: todoName})
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
    };

    return <React.Fragment>
        <input 
        type="text" 
        placeholder="Todo" 
        onChange={inputChangeHandler} 
        value={todoName}/>
        <button type="button" onClick={todoAddHandler}>Add</button>
        <ul>
            {todoList.map(todo => (
                <li key={todo.id}>{todo.name}</li>
            ))}
        </ul>
    </React.Fragment>;
};

export default Todo;

    // Copied here from above return statement
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