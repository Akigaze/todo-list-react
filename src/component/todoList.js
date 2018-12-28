import React, {Component} from "react";
import {connect} from "react-redux";
import * as filterType from "../constant/filterType";
import {firstLetterUpper} from "../util/stringUtil";
import {changeFilter} from "../action/todoListAction";

import NewTodoInput from "./newTodoInput";
import Todo from "./todo";

export class TodoList extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const {todos, changeFilter} = this.props;
        let {ALL, COMPLETED, UNDO} = filterType;
        return(
            <div>
                <NewTodoInput/>
                <TodoGroup todos={todos}/>
                <FilterGroup>
                    <input type="button" value={firstLetterUpper(ALL)} onClick={() => {changeFilter(ALL)}}/>
                    <input type="button" value={firstLetterUpper(COMPLETED)} onClick={() => {changeFilter(COMPLETED)}}/>
                    <input type="button" value={firstLetterUpper(UNDO)} onClick={() => {changeFilter(UNDO)}}/>
                </FilterGroup>
            </div>
        )
    }
}

const TodoGroup = (props) => {
    const {todos} = props;
    return todos.map(todo => {
        const {id, completed, content} = todo;
        return <Todo key={`todo-${id}`} id={id} completed={completed} content={content}/>
    });
};

const FilterGroup = (props) => {
    const {children} = props;
    return (
        <div>
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
        changeFilter: (filter) => {dispatch(changeFilter(filter))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
