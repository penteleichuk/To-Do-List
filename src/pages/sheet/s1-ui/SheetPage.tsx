import { useSelector } from "react-redux";
import { DesignType } from "../../../app/s2-bll/state/appState";
import { AppStoreType } from "../../../app/s2-bll/state/store";
import { Sheet } from "./Sheet";

export const SheetPage = (): JSX.Element => {
	const design = useSelector<AppStoreType, DesignType>(state => state.app.theme);
	const classTheme = design === 'dark' ? 'app dark' : 'app';

	return <Sheet design={design} classTheme={classTheme} />
}