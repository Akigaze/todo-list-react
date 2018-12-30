import React, {Component} from "react";
import {connect} from "react-redux";
import {isFunction} from "lodash";
import {updateTodoAction, deleteTodoAction} from "../action/todoListAction";

export class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: props.completed,
            hovered:false
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

    hoverTodo = () => {
        let {hovered} = this.state;
        if (!hovered) {
            this.setState({hovered:true});
        }
    }

    outOfTodo = () => {
        let {hovered} = this.state;
        if (hovered) {
            this.setState({hovered: false});
        }
    }

    clickDeleteIcon = () => {
        const {id, deleteTodo} = this.props
        if (isFunction(deleteTodo)) {
            deleteTodo(id);
        }
    }

    render(){
        const {content} = this.props;
        const {completed, hovered} = this.state;
        const contentStyle = completed ? "todo-completed" : "todo-undo";

        return(
            <div className="todo" onMouseOver={this.hoverTodo} onMouseOut={this.outOfTodo}>
                <p className="todo-content" onClick={this.clickTodo}>
                    <input type="checkbox" className="done-todo" checked={completed} readOnly={true}/>
                    <span className={contentStyle}>{content}</span>
                </p>
                <DeleteIcon value="×" visible={hovered} clickHandler={this.clickDeleteIcon}/>
            </div>
        )
    }
}

const DeleteIcon = (props) => {
    const {value, visible, clickHandler} = props;
    if (!visible){
        return <span/>;
    }
    return (
        <span className="delete-icon" onClick={clickHandler}>
            {value}
        </span>
    )
}

const mapPropsToDispatch = (dispatch) => {
    return {
        updateTodo: (id, isToComplete) => {dispatch(updateTodoAction(id, isToComplete))},
        deleteTodo: (id) => {dispatch(deleteTodoAction(id))}
    }
}

export default connect(undefined, mapPropsToDispatch)(Todo);
