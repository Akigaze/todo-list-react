import React, {Component} from "react";
import TodoList from "./component/todoList";

import "./style/app.css";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="container">
                <h1 className="title">Todo List</h1>
                <TodoList />
            </div>
        )
    }
}
