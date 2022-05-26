import React from "react";
import { ChangeEvent, useState } from "react";
import { FaRegCheckCircle, FaRegCircle, FaTimesCircle } from "react-icons/fa";
import { TaskStatuses } from "../../constants/task";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchRemoveTask, fetchUpdateTask } from "../../pages/sheet/s2-bll/reducers/taskReducer";
import { TaskType } from "../../pages/sheet/s2-bll/state/taskInitState";

export const EditableButton = React.memo(({ task }: { task: TaskType }) => {
	const [title, setTitle] = useState<string>('');
	const [isEditableTitle, setIsEditableTitle] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const removeHandler = (todoId: string, taskId: string) => {
		dispatch(fetchRemoveTask(todoId, taskId));
	}

	const checkedHandler = (todoId: string, taskId: string, status: TaskStatuses) => {
		const newStatus: TaskStatuses = (status == TaskStatuses.New) ? TaskStatuses.Completed : TaskStatuses.New;
		dispatch(fetchUpdateTask(todoId, taskId, { status: newStatus }));
	}

	const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
	}

	const editableTitleHandler = () => {
		setTitle(task.title);
		setIsEditableTitle(true);
	}

	const disabledTitleHandler = () => {
		dispatch(fetchUpdateTask(task.todoListId, task.id, { title: title }));
		setIsEditableTitle(false);
	}

	return <div className={'task-list__wrapper'}>
		{isEditableTitle === false ?
			<div key={task.id} className={`task-list__item ${task.status === TaskStatuses.Completed ? 'task-list__item-active' : ''}`} >

				<div className="task-list__check" onClick={() => checkedHandler(task.todoListId, task.id, task.status)}>
					{task.status === TaskStatuses.Completed ? <FaRegCheckCircle /> : <FaRegCircle />}
				</div>

				<div className="task-list__body" onDoubleClick={editableTitleHandler}>
					<div className="task-list__title">{task.title}</div>
				</div>

				<div className="task-list__remove">
					<FaTimesCircle onClick={() => removeHandler(task.todoListId, task.id)} />
				</div>

			</div> :
			<div className={"task-list__editable"}>
				<input type="text" value={title} onChange={changeTitleHandler} autoFocus onBlur={disabledTitleHandler} />
			</div>
		}
	</div>
});