import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {createStore} from 'redux'
import {reducer} from "./reducer/reducer";

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

