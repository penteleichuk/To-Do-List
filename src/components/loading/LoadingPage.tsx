
import './LoadingPage.css';
import {DesignType} from "../../app/s2-bll/appSlice";

export const LoadingPage = ({ design }: { design: DesignType }) => {
	return <div className={design}>
		<div className="wrapper loading-page">
			<div className="lds-ripple"><div></div><div></div></div>
		</div>
	</div>
}