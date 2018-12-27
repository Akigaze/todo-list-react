import React, {Component} from "react";
import {isEmpty} from "lodash";

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed:false
        };
    }

    clickTodo = () => {
        const isToComplete = !this.state.completed;
        this.setState({completed:isToComplete});
        const {id, unpdateTodo} = this.props;
        if (!isEmpty(unpdateTodo)) {
            unpdateTodo(id, isToComplete);
        }
    }

    render(){
        const {content} = this.props;
        const {completed} = this.state;
        const contentStyle = completed ? "todo-completed" : "todo-undo";

        return(
            <p onClick={this.clickTodo}>
                <input type="checkbox" checked={completed} readOnly={true}/>
                <span className={contentStyle}>{content}</span>
            </p>
        )
    }
}
