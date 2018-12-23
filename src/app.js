import React, {Component} from "react";
import TodoList from "./component/todoList";

import "./style/app.css";

// const todos=[
//     {id:0, completed:false, content:"Learn React"},
//     {id:1, completed:false, content:"Learn Redux"},
//     {id:2, completed:false, content:"Learn Jasmine"},
//     {id:2, completed:false, content:"Learn Jest"}
// ];

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <h1>Todo List</h1>
                <TodoList />
            </div>
        )
    }
}
