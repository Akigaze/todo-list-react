import React, {Component} from "react";
import {connect} from "react-redux";
import {isEqual, isFunction} from "lodash";
import {ALL, COMPLETED, UNDO} from "../constant/filterType";
import {firstLetterUpper} from "../util/stringUtil";
import {changeFilterAction} from "../action/todoListAction";

import NewTodoInput from "./newTodoInput";
import Todo from "./todo";

export class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedButton: ALL
        }
    }

    getFilteredTodos = () => {
        let {todos, filter} = this.props
        if (!isEqual(ALL, filter)) {
            const status = isEqual(COMPLETED, filter)
            todos = todos.filter(todo => isEqual(status, todo.completed));
        }
        return todos;
    }

    clickFilter = (filter) => {
        const {changeFilter} = this.props;
        this.setState({clickedButton:filter});
        if (isFunction(changeFilter)) {
            changeFilter(filter);
        }
    }

    render(){
        const {filter, changeFilter} = this.props;
        const {clickedButton} = this.state;
        const todos = this.getFilteredTodos();
        return(
            <div>
                <NewTodoInput/>
                <TodoGroup todos={todos}/>
                <FilterGroup>
                    <input type="button"
                        className={isEqual(ALL, clickedButton) ? "filter-clicked" : "filter-unclicked"}
                        value={firstLetterUpper(ALL)}
                        onClick={() => {this.clickFilter(ALL)}}/>
                    <input type="button"
                        className={isEqual(COMPLETED, clickedButton) ? "filter-clicked" : "filter-unclicked"}
                        value={firstLetterUpper(COMPLETED)}
                        onClick={() => {this.clickFilter(COMPLETED)}}/>
                    <input type="button"
                        className={isEqual(UNDO, clickedButton) ? "filter-clicked" : "filter-unclicked"}
                        value={firstLetterUpper(UNDO)}
                        onClick={() => {this.clickFilter(UNDO)}}/>
                </FilterGroup>
            </div>
        )
    }
}

const TodoGroup = (props) => {
    const {todos} = props;
    const todosList = todos.map(todo => {
        const {id, completed, content} = todo;
        return <Todo key={`todo-${id}`} id={id} completed={completed} content={content}/>
    });
    return (
        <div className="todo-group">
            {todosList}
        </div>
    )
};

const FilterGroup = (props) => {
    const {children} = props;
    return (
        <div className="filter-group">
            {children}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        filter: state.filter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeFilter: (filter) => {dispatch(changeFilterAction(filter))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
