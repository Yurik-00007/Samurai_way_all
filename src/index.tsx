import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {store} from "./redux/redux-store"
import SamuraiJSApp from "./App";

export let reranderEntireTree = () => {
    ReactDOM.render(
        /*
                <BrowserRouter>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </BrowserRouter>
        */

        <SamuraiJSApp/>, document.getElementById('root')
        // <App dialogsPage={ state.dialogsPage } profilePage={ state.profilePage }/>,
    );
}

reranderEntireTree()
store.subscribe(() => {
    reranderEntireTree()
})


