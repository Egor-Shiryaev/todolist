import React from 'react';
import './App.css';
import TodoList from './TodoList';

export type TaskType = { id: number, title: string, isDone: boolean }
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle: string = 'What to learn?'

    const result = React.useState<Array<TaskType>>([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS & ES6', isDone: true},
        {id: 3, title: 'REACT & TS', isDone: false},
    ])
    const tasksForTodolist = result[0]
    const setTasksForTodolist = result[1]
    const removeTask = (taskId: number) => {
        setTasksForTodolist(tasksForTodolist.filter(t => t.id !== taskId))
    }

    const [filter, setFilter] = React.useState<FilterValuesType>('all')

    const changeFilter = (filter: FilterValuesType) => {setFilter(filter)}

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
            />
        </div>
    );
}
export default App;
