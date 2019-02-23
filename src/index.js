import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import App from './App'

import "./index.html"
import 'bootstrap/dist/css/bootstrap.css'

document.addEventListener('DOMContentLoaded', () => {
    render( <BrowserRouter>
            <App/>
        </BrowserRouter>, document.getElementById('app'))
});