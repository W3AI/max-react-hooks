import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const Todo = props => {
    // Using Multiple States
    const [todoName, setTodoName] = useState('');
    const [submittedTodo, setSubmittedTodo] = useState(null);
    // const [todoList, setTodoList] = useState([]);

    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE': 
                return  state.filter((todo) => todo.id !== action.payload);
            default: 
        }
    };

    const [ todoList, dispatch ] = useReducer(todoListReducer, []);

    // useEffect - to include as input a function to execute when component loads first time
    useEffect(() => {
        axios.get('https://react-hooks-todos.firebaseio.com/todos.json').then(result => {
            console.log(result);
            const todoData = result.data;
            const todos = [];
            for (const key in todoData) {
                todos.push({ id: key, name: todoData[key].name });
            }
            dispatch({type: 'SET', payload: todos});
        });
        // to use return as a cleanup after the last useEffect lines above
        return () => {
            console.log('Cleanup');
        };
    }, []);    // [array of predecessors tasks/vars] or [] for compDidMount / first comp load

    const mouseMoveHandler = event => {
        console.log(event.clientX, event.clientY);
    }

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler);
        // clanup return
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        }
    }, []); // with [] tasks are exec with didMount and cleanup at didUnmount

    useEffect(
        () => {
            if (submittedTodo) {
                dispatch({type: 'ADD', payload: submittedTodo});
            }
        }, [submittedTodo]
    );

    // Change Handler for Multiple States
    const inputChangeHandler = (event) => {
        setTodoName(event.target.value);
    };

    const todoAddHandler = () => {
        axios
            .post('https://react-hooks-todos.firebaseio.com/todos.json', { name: todoName })
            .then(res => {
                setTimeout(() => {
                    const todoItem = { id: res.data.name, name: todoName };
                    setSubmittedTodo(todoItem);
                }, 3000);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const todoRemoveHandler = todoId => {
        dispatch({type: 'REMOVE', payload: todoId})
    }

    return <React.Fragment>
        <input
            type="text"
            placeholder="Todo"
            onChange={inputChangeHandler}
            value={todoName} />
        <button type="button" onClick={todoAddHandler}>
            Add
        </button>
        <ul>
            {todoList.map(todo => (
                <li key={todo.id} onClick={todoRemoveHandler.bind(this, todo.id)}>
                    {todo.name}
                </li>
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