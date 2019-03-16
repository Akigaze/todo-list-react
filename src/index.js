import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import reducer from "./reducer/todoListReducer";
import App from "./app";
import {actionLog} from "./util/middlewares";
import {loadTodoAction} from "./action/todoListAction";

const store = createStore(reducer, applyMiddleware(actionLog, thunk));
loadTodoAction()(store.dispatch);

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(
    app,
    document.getElementById("root")
);
