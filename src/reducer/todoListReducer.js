import * as actionType from "../constant/actionType";
import {ALL} from "../constant/filterType";

const initedState = {
    todos: [],
    filter: ALL
};

const createTodo = (id, content,completed=false) => {
    return {id, content, completed}
};

const reducer = (state=initedState, action={}) => {
    switch(action.type){
        case actionType.ADD_TODO : {
            let {todos, filter} = state;
            const todo = createTodo(todos.length,action.content);
            todos.push(todo);
            return {todos:[...todos], filter};
        }
        default:
            return state;
    }
};

export default reducer;
