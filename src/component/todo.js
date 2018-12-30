import React, {Component} from "react";
import {connect} from "react-redux";
import {isFunction} from "lodash";
import {updateTodoAction} from "../action/todoListAction";

export class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: props.completed
        };
    }

    clickTodo = () => {
        const isToComplete = !this.state.completed;
        this.setState({completed:isToComplete});
        const {id, updateTodo} = this.props;
        if (isFunction(updateTodo)) {
            updateTodo(id, isToComplete);
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

const mapPropsToDispatch = (dispatch) => {
    return {
        updateTodo: (id, isToComplete) => {dispatch(updateTodoAction(id, isToComplete))}
    }
}

export default connect(undefined, mapPropsToDispatch)(Todo);
