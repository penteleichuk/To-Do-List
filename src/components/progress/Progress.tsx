import './Progress.css';

export const Progress = ({ enabled = false }: { enabled?: boolean }) => {
	return <>
		{enabled && <div className="progress-bar">
			<div className="progress-bar__value"></div>
		</div>}
	</>
}