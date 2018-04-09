import React from 'react'
import {render} from 'react-dom'
import App from './App'

import "./index.html"
import 'bootstrap/dist/css/bootstrap.css'

document.addEventListener('DOMContentLoaded', () => {
    render(<App/>, document.getElementById('app'))
});