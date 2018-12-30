import {isEqual} from "lodash";
import * as actionType from "../constant/actionType";
import {ALL} from "../constant/filterType";

const initedState = {
    todos: [],
    filter: ALL
};

const createTodo = (id, content,completed=false) => {
    return {id, content, completed}
};

const updateTodoCompleted = (todos, id, completed) => {
    return todos.map(todo => {
        if(isEqual(id, todo.id)){
            todo.completed = completed;
        }
        return todo;
    });
};

const reducer = (state=initedState, action={}) => {
    switch(action.type){
        case actionType.ADD_TODO : {
            let {todos, filter} = state;
            const todo = createTodo(todos.length, action.content);
            todos.push(todo);
            return {todos:[...todos], filter};
        }
        case actionType.COMPLETE_TODO : {
            let {todos, filter} = state;
            todos = updateTodoCompleted(todos, action.id, true);
            return {todos:[...todos], filter};
        }
        case actionType.CANCEL_COMPLETED_TODO : {
            let {todos, filter} = state;
            todos = updateTodoCompleted(todos, action.id, false);
            return {todos:[...todos], filter};
        }
        case actionType.DELETE_TODO : {
            let {todos, filter} = state;
            todos = todos.filter(todo => !isEqual(todo.id, action.id));
            return {todos:[...todos], filter};
        }
        case actionType.CHANGE_FILTER : {
            let {todos, filter} = state;
            filter = action.filter;
            return {todos:[...todos], filter};
        }
        default:
            return state;
    }
};

export default reducer;
