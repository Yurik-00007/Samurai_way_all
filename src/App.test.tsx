import React from 'react';
import './App.css';
import ReactDOM from "react-dom";
import SamuraiJSApp from "./App";


test('render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SamuraiJSApp/>, div)
    ReactDOM.unmountComponentAtNode(div)

})
