import React from "react";
import { EditableButton } from "../../editableButton/EditableButton";
import {TaskType} from "../../../pages/sheet/s2-bll/slices/taskSlice";
import './ListTask.css'

export const ListTask = React.memo(({ tasks }: { tasks: Array<TaskType> }) => {
    return (
        <div className="task-list">
            <div className="task-list__subtitle">Today</div>
            {tasks.map(t => <EditableButton key={t.id} task={t} />)}
        </div>
    )
});