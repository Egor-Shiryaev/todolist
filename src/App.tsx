import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';

export type TaskType = { id: string, title: string, isDone: boolean }
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle: string = 'What to learn?'
    const [tasksForTodolist, setTasksForTodolist] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JS & ES6', isDone: true},
        {id: v1(), title: 'REACT & TS', isDone: false},])

    const removeTask = (taskId: string) => {
        setTasksForTodolist(tasksForTodolist.filter(t => t.id !== taskId))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title, // title: title,
            isDone: false
        }
        setTasksForTodolist([newTask, ...tasksForTodolist])
    }

    const [filter, setFilter] = useState<FilterValuesType>('all')
    const changeFilter = (filter: FilterValuesType) => setFilter(filter)

    const getFilterTask = (tasks: Array<TaskType>, filterValue: FilterValuesType) => {
        let filteredTasks = tasks
        if (filterValue === 'active') {
            filteredTasks = tasks.filter(t => !t.isDone)
        }
        if (filterValue === 'completed') {
            filteredTasks = tasks.filter(t => t.isDone)
        }
        return filteredTasks
    }
    // GUI Интерфейс для данных
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={getFilterTask(tasksForTodolist, filter)}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
