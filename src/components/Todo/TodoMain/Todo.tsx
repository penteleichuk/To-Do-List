import { useState } from "react";
import { v1 } from "uuid";
import { TodoAdd } from "../TodoAdd/TodoAdd";
import { TodoSwitch } from "../TodoSwitch/TodoSwitch";
import { Task } from "../../Tasks/TaskMain/Task";
import './Todo.css'
import { DesignType } from "../../../app/s2-bll/state/appState";

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoListType = {
    id: string
    title: string
    tasks: Array<TasksPropsType>
}

type TasksListType = {
    [key: string]: Array<TasksPropsType>
}

type ToDoPropsType = {
    design: DesignType
}

export const Todo = ({ design }: ToDoPropsType) => {
    const [schedule, setSchedule] = useState<Array<ToDoListType>>([]);
    const [tasks, setTasks] = useState<TasksListType>({});

    const addSchedule = (title: string) => setSchedule([
        { id: v1(), title: title, tasks: [] },
        ...schedule
    ]);

    const removeSchedule = (id: string) => {
        setSchedule([
            ...schedule.filter(s => s.id !== id)
        ])
    }

    const addTasks = (scheduleId: string, title: string) => {
        setTasks({
            [scheduleId]: [
                { id: v1(), isDone: false, title: title },
                ...(tasks[scheduleId] ?? {})
            ],
            ...tasks
        });
        console.log(tasks)
    }

    return (
        <div className="todo">
            <div className='todo__wrapper'>
                <TodoAdd addSchedule={addSchedule} />
                <TodoSwitch design={design} />
            </div>

            <div className='task'>
                {schedule.map(t => <Task key={t.id}
                    id={t.id}
                    tasks={t.tasks}
                    title={t.title}
                    removeSchedule={removeSchedule}
                    addTasks={addTasks}
                />
                )}
            </div>
        </div>
    )
}