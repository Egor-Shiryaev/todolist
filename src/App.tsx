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
        {id: v1(), title: 'REACT & TS', isDone: false},
    ])

    const removeTask = (taskId: string) => {
        setTasksForTodolist(tasksForTodolist.filter(t => t.id !== taskId))
    }

    const addTask = (title:string) => {
      const newTaskId:string=v1()
        const newTask:TaskType={
          id:newTaskId,
            title:title,
            isDone:false
        }
        const copyTasks =[...tasksForTodolist]
        copyTasks.push(newTask)
        setTasksForTodolist(copyTasks)
    }


    const [filter, setFilter] = useState<FilterValuesType>('all')
    const changeFilter = (filter: FilterValuesType) => setFilter(filter)

    let filteredTasks = tasksForTodolist
    if (filter === 'active') {
        filteredTasks = tasksForTodolist.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        filteredTasks = tasksForTodolist.filter(t => t.isDone === true)
    }
    // GUI Интерфейс для данных
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
