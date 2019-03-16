import React, {Component} from "react";
import {connect} from "react-redux";
import {isFunction} from "lodash";
import {updateTodoAction, deleteTodoAction, modifyTodoAction, editStartAction} from "../action/todoListAction";
import {EDIT_OK, EDIT_PEN, ENTER_CODE, X_DELETE} from "../constant/Characters";

export class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: props.completed,
            hovered: false,
            editing: props.editing
        };
    }

    componentDidMount(){
        if (this.props.editing) {
            const todo = this.refs.todo;
            todo.setAttribute("contentEditable", true);
        }
    }

    startEdit = () =>{
        const todo = this.refs.todo;
        const {id, editStart} = this.props;
        todo.setAttribute("contentEditable", true);
        todo.focus();
        this.setState({editing: true});
        if (isFunction(editStart)) {
            editStart(id);
        }
    };

    endEdit = () =>{
        const {id, modifyTodo} = this.props;
        const {completed} = this.state;
        const todo = this.refs.todo;
        todo.setAttribute("contentEditable", false);
        todo.blur();
        this.setState({editing: false});
        if (isFunction(modifyTodo)) {
            modifyTodo(id, todo.textContent, completed);
        }
    };

    clickTodo = () => {
        const isToComplete = !this.state.completed;
        const isEditing = this.state.editing;
        if (isEditing) {
            return;
        }
        this.setState({completed: isToComplete});
        const {id, content, updateTodo} = this.props;
        if (isFunction(updateTodo)) {
            updateTodo(id, content, isToComplete);
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
        const {editing} = this.state;
        editing ? this.endEdit() : this.startEdit();
    };

    clickDeleteIcon = () => {
        const {id, deleteTodo} = this.props;
        if (isFunction(deleteTodo)) {
            deleteTodo(id);
        }
    };

    editTodo = (event) => {
        if (event.keyCode === ENTER_CODE){
            this.endEdit();
        }
    };

    render() {
        const {content} = this.props;
        const {completed, hovered, editing} = this.state;
        const contentStyle = completed ? "todo-completed" : "todo-undo";
        const todoBorderColor = editing ? "#1E90FF" : "transparent";
        const editIconText = editing ? EDIT_OK : EDIT_PEN;
        return (
            <div className="todo" onMouseOver={this.hoverTodo} onMouseOut={this.outOfTodo}>
                <p className="todo-content" onClick={this.clickTodo}>
                    <input type="checkbox" className="done-todo" checked={completed} readOnly={true}/>
                    <span ref="todo" className={contentStyle} style={{borderColor: todoBorderColor}} onKeyDown={this.editTodo}>
                        {content}
                    </span>
                </p>
                <EditIcon value={editIconText} visible={editing || hovered} clickHandler={this.clickEditIcon}/>
                <DeleteIcon value={X_DELETE} visible={hovered} clickHandler={this.clickDeleteIcon}/>
            </div>
        )
    }
}

const EditIcon = (props) => {
    const {value, visible, editing, clickHandler} = props;
    if (editing || visible) {
        return <span className="edit-icon" onClick={clickHandler}>{value}</span>
    }
    return <span className="edit-icon" style={{backgroundColor: "transparent"}}/>;
};

const DeleteIcon = (props) => {
    const {value, visible, clickHandler} = props;
    if (visible) {
        return <span className="delete-icon" onClick={clickHandler}>{value}</span>
    }
    return <span className="delete-icon" style={{backgroundColor: "transparent"}}/>;
};

const mapPropsToDispatch = (dispatch) => {
    return {
        updateTodo: (id, content, isToComplete) => {dispatch(updateTodoAction(id, content, isToComplete))},
        deleteTodo: (id) => {dispatch(deleteTodoAction(id))},
        modifyTodo: (id, content, status) => {dispatch(modifyTodoAction(id, content, status))},
        editStart: (id) => {dispatch(editStartAction(id))}
    }
};

export default connect(undefined, mapPropsToDispatch)(Todo);
