import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './Views/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
