import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './sass/index.css';
import App from './js/App';
import registerServiceWorker from './registerServiceWorker';
import { CookiesProvider } from 'react-cookie';
import 'whatwg-fetch';

ReactDOM.render(
	<Router basename="/">
		<CookiesProvider>
			<App />
		</CookiesProvider>
	</Router>,
	document.getElementById('root')
);

registerServiceWorker();
