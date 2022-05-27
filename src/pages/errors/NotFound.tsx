import { Link, Navigate } from 'react-router-dom';
import './NotFound.css';

export const NotFound = () => {

	return <div className='not-found'>
		<div className='not-found__wrapper'>
			<aside className='not-found__side'>
				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png" alt="404 Image" />
			</aside>
			<main className='not-found__main'>
				<h1>404</h1>
				<p>
					PAGE NOT FOUND!
				</p>
				<Link to="/">GO HOME</Link>
			</main>
		</div>
	</div>
}