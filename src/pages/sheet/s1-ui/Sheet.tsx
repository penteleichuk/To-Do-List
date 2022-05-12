import React from "react";
import { DesignType } from "../../../app/s2-bll/state/appState";
import { Todo } from "../../../components/Todo/TodoMain/Todo";

type SheetPropsType = {
	design: DesignType,
	classTheme: string,
}

export const Sheet = React.memo(({ design, classTheme }: SheetPropsType) => {
	return (
		<div className={classTheme}>
			<Todo design={design} />
		</div>
	);
});