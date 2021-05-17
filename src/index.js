import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

import "react-datetime/css/react-datetime.css";
import "react-multi-date-picker/styles/backgrounds/bg-gray.css"

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>, 
    document.getElementById('root'))