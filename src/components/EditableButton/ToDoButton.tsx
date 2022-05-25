import { ChangeEvent, useState } from "react"
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchToDoSetTitle } from "../../pages/sheet/s2-bll/reducers/toDoReducer";

type ToDoButtonPropsType = {
	todoId: string;
	title: string;
}

export const ToDoButton = ({ todoId, title }: ToDoButtonPropsType) => {
	const [text, setText] = useState<string>('');
	const [isEditableTitle, setIsEditableTitle] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setText(e.currentTarget.value);
	}

	const doubleClickHandler = () => {
		setText(title);
		setIsEditableTitle(true);
	}

	const blurHandler = () => {
		setIsEditableTitle(false);
		dispatch(fetchToDoSetTitle(todoId, text));
	}

	return <>
		{isEditableTitle === false ?
			<div className="task-add__title" onDoubleClick={doubleClickHandler}>
				{title}
			</div > :
			<div className="task-add__button">
				<input type="text" value={text} onChange={changeHandler} autoFocus onBlur={blurHandler} />
			</div>
		}
	</>
}