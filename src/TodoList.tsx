import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';
type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}
const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState('')
    const tasksJSXItemList = props.tasks.length
        ? <ul> {
            props.tasks.map((task) => {
                const removeTask = () => props.removeTask(task.id)
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={removeTask}>x</button>
                    </li>)
            })
        }
        </ul>
        : <span>Task List is empty</span>

    const onClickAddTask = () => {
        const trimmedTitle = title.trim() // обрезает пробелы
        if (trimmedTitle) { props.addTask(trimmedTitle)
        }setTitle('')
    }

    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const changeFilterHandlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter) //функция которая возвращает функцию
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask() //
    // при нажатии на клавишу, проверить в объекте события, какая клавиша нажата. Если (e.key===Enter)==true, то верни(запусти) onClickAddTask()

    return (<div> <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeSetLocalTitle}
                       onKeyDown={onKeyDownAddTask}/>
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>{tasksJSXItemList}</ul>
            <div>
                <button onClick={changeFilterHandlerCreator('all')}>All</button>
                <button onClick={changeFilterHandlerCreator('active')}>Active</button>
                <button onClick={changeFilterHandlerCreator('completed')}>Completed</button>
            </div>
        </div>);
};
export default TodoList;