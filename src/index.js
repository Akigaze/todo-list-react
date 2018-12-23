import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducer/todoListReducer";
import App from "./app";

const store = createStore(reducer);
const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(
    app,
    document.getElementById("root")
);
