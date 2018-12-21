import React, {Component} from "react";
import {NewTodoInput} from "./newTodoInput";
import Todo from "./todo";

export class TodoList extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const {todos} = this.props;
        return(
            <div>
                <NewTodoInput/>
                <TodoGroup todos={todos}/>
                <FilterGroup>
                    <input type="button" value="All"/>
                    <input type="button" value="Completed"/>
                    <input type="button" value="Undo"/>
                </FilterGroup>
            </div>
        )
    }
}

const TodoGroup = (props) => {
    const {todos} = props;
    return todos.map(todo => {
        const {id, completed, content} = todo;
        return <Todo id={id} completed={completed} content={content}/>
    });
}

const FilterGroup = (props) => {
    const {children} = props;
    return (
        <div>
            {children}
        </div>
    )
}
