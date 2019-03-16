import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducer/todoListReducer";
import App from "./app";
import {actionLog} from "./util/middlewares";

const store = createStore(reducer, applyMiddleware(actionLog));
const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(
    app,
    document.getElementById("root")
);
