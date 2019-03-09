import React, {Component} from "react";
import {connect} from "react-redux";
import {isEqual, isFunction} from "lodash";

import {ALL, COMPLETED, UNDO} from "../constant/filterType";
import {changeFilterAction} from "../action/todoListAction";
import {firstLetterUpper} from "../util/stringUtil";

import NewTodoInput from "./newTodoInput";
import Todo from "./todo";
import {FilterButton} from "./filterButton";

export class TodoList extends Component {
    constructor(props) {
        super(props);
        this.filters = getFiltersDefinitions();
        this.state = {
            currentFilter: ALL
        }
    }

    getFilteredTodos = () => {
        let {todos, filter} = this.props;
        if (!isEqual(ALL, filter)) {
            const status = isEqual(COMPLETED, filter);
            todos = todos.filter(todo => isEqual(status, todo.completed));
        }
        return todos;
    };

    getFilterButtons = () => {
        const {currentFilter} = this.state;
        this.filters.forEach(filter => {
            filter.clicked = filter.id === currentFilter
        });
        return this.filters;
    };

    clickFilter = (filter) => {
        const {changeFilter} = this.props;
        this.setState({currentFilter: filter});
        if (isFunction(changeFilter)) {
            changeFilter(filter);
        }
    };

    render(){
        const todos = this.getFilteredTodos();
        const filters = this.getFilterButtons();
        return (
            <div>
                <NewTodoInput/>
                <div className="todo-group">
                    {todos.map(todo => {
                        const {id, completed, content} = todo;
                        return <Todo key={id} id={id} completed={completed} content={content}/>
                    })}
                </div>
                <div className="filter-group">
                    {filters.map(filter => {
                        const {id, text, clicked} = filter;
                        return <FilterButton key={id} id={id} text={text} clicked={clicked} handleClick={this.clickFilter}/>
                    })}
                </div>
            </div>
        )
    }
}

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

const getFiltersDefinitions = () => {
    return [ALL, COMPLETED, UNDO].map(item => {
        return {
            id: item,
            text: firstLetterUpper(item),
            clicked: false
        }
    });
};
