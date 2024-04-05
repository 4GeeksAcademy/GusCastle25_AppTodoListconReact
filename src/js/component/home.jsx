import React, { useEffect } from "react";
import { useState } from "react";
//create your first component
function TodoItem({ label, is_done, delete_todo, toggle_todo }){
	return (
		<div className="container todo-item">
			<input type="checkbox" checked={is_done} onChange={toggle_todo}/>
			<span className="todo-text">{label}</span>
			<button type="button" className="btn btn-danger" onClick={delete_todo}><i className="fas fa-trash-alt"></i></button>
		</div>
	)
}

function Home () {
	const [todos, setTodos] = useState([]);
	const [todoInput, setTodoInput] = useState("");

	useEffect(()=>{
		const local_todos = localStorage.getItem("todos");
		if (local_todos) {setTodos(JSON.parse(local_todos));}
	},[]);

	useEffect(()=>{
		if (todos.length) {
			localStorage.setItem("todos", JSON.stringify(todos));
		}
	}, [todos]);

	return (
		<form onSubmit={e => {e.preventDefault();
			if (todoInput.length > 0) {
				setTodos([{
					label: todoInput,
					is_done: false},...todos,]);
					setTodoInput("");}}}
			className="text-center mt-5 d-flex flex-colum align-items-center justify-content-start">
			<div className="container">
				<h1>Todo list</h1>
				<input
					className="form-control form-control-lg" 
					type="text" 
					placeholder="Import Task" 
					aria-label="todo list input field"
					value={todoInput}
					onChange={e => setTodoInput(e.target.value.trimStart())}/>
				{todos.map((item, idx) => (<TodoItem
					key={idx}
					label={item.label} 
					is_done={item.is_done} 
					toggle_todo={() => setTodos(
						todos.toSpliced(idx, 1 , {
							label: item.label,
							is_done: !item.is_done,}))}
					delete_todo={()=> {
						setTodos(todos.toSpliced(idx, 1));
						localStorage.setItem("todos", JSON.stringify(todos.toSpliced(idx, 1)));
					}}/>
				))}
				<small>{todos.filter((item) => !item.is_done).length} Tasks left to do!</small>
			</div>
		</form>
	);
};

export default Home;
