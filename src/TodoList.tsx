import React from 'react';
import {FilterValuesType, TaskType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter:(filter:FilterValuesType) =>void
    addTask :(title:string) =>void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksJSXItemList = props.tasks.length
        ? <ul> {
            props.tasks.map((task) => {
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => props.removeTask(task.id)}>x</button>
                    </li>
                )
            })
        }
        </ul>
        : <span>Task List is empty</span>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button onClick={()=>props.addTask('A')}>+</button>
            </div>
            <ul>
                {tasksJSXItemList}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter('all')}>All</button>
                <button onClick={()=>props.changeFilter('active')}>Active</button>
                <button onClick={()=>props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};
export default TodoList;