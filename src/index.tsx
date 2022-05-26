import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './app/s1-ui/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/s2-bll/state/store';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

reportWebVitals();