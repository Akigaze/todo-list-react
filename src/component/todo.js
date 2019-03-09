import React, {Component} from "react";
import {connect} from "react-redux";
import {isFunction} from "lodash";
import {updateTodoAction, deleteTodoAction, modifyTodoAction} from "../action/todoListAction";
import {EDIT_PEN, ENTER_CODE, X_DELETE} from "../constant/Characters";

export class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: props.completed,
            hovered: false,
            editing: false
        };
    }

    clickTodo = () => {
        const isToComplete = !this.state.completed;
        const isEditing = this.state.editing;
        if (isEditing) {
            return;
        }
        this.setState({completed: isToComplete});
        const {id, updateTodo} = this.props;
        if (isFunction(updateTodo)) {
            updateTodo(id, isToComplete);
        }
    };

    hoverTodo = () => {
        let {hovered} = this.state;
        if (!hovered) {
            this.setState({hovered: true});
        }
    };

    outOfTodo = () => {
        let {hovered} = this.state;
        if (hovered) {
            this.setState({hovered: false});
        }
    };

    clickEditIcon = () => {
        const todo = this.refs.todo;
        todo.setAttribute("contentEditable", true);
        todo.focus();
        this.setState({editing: true});
    };

    clickDeleteIcon = () => {
        const {id, deleteTodo} = this.props;
        if (isFunction(deleteTodo)) {
            deleteTodo(id);
        }
    };

    editTodo = (event) => {
        const {id, modifyTodo} = this.props;
        if (event.keyCode === ENTER_CODE){
            const todo = this.refs.todo;
            todo.setAttribute("contentEditable", false);
            this.setState({editing: false});
            if (isFunction(modifyTodo)) {
                modifyTodo(id, todo.textContent);
            }
        }
    };

    render() {
        const {content} = this.props;
        const {completed, hovered} = this.state;
        const contentStyle = completed ? "todo-completed" : "todo-undo";
        return (
            <div className="todo" onMouseOver={this.hoverTodo} onMouseOut={this.outOfTodo}>
                <p className="todo-content" onClick={this.clickTodo}>
                    <input type="checkbox" className="done-todo" checked={completed} readOnly={true}/>
                    <span ref="todo" className={contentStyle} onKeyDown={this.editTodo}>{content}</span>
                </p>
                <EditIcon value={EDIT_PEN} visible={hovered} clickHandler={this.clickEditIcon}/>
                <DeleteIcon value={X_DELETE} visible={hovered} clickHandler={this.clickDeleteIcon}/>
            </div>
        )
    }
}

const EditIcon = (props) => {
    const {value, visible, clickHandler} = props;
    if (visible) {
        return <span className="edit-icon" onClick={clickHandler}>{value}</span>
    }
    return <span/>;
};

const DeleteIcon = (props) => {
    const {value, visible, clickHandler} = props;
    if (visible) {
        return <span className="delete-icon" onClick={clickHandler}>{value}</span>
    }
    return <span/>;
};

const mapPropsToDispatch = (dispatch) => {
    return {
        updateTodo: (id, isToComplete) => {dispatch(updateTodoAction(id, isToComplete))},
        deleteTodo: (id) => {dispatch(deleteTodoAction(id))},
        modifyTodo: (id, content) => {dispatch(modifyTodoAction(id, content))}
    }
};

export default connect(undefined, mapPropsToDispatch)(Todo);
