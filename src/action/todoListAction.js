import axios from "axios";
import {isEmpty} from "lodash";
import * as actionType from "../constant/actionType";
import * as filterType from "../constant/filterType";

axios.defaults.baseURL = "http://localhost:8081";

export const newTodoAction = (content) => {
    return async (dispatch) => {
        const response = await axios.post("/todos", {content});
        const newTodo = response.data;
        dispatch({type: actionType.ADD_TODO, todo:newTodo})
    };
};

export const updateTodoAction = (id, isToComplete) => {
    const type = isToComplete
                ? actionType.COMPLETE_TODO
                : actionType.CANCEL_COMPLETED_TODO;
    return {type, id};
};

export const changeFilterAction = (filter=filterType.ALL) => {
    return {type:actionType.CHANGE_FILTER, filter};
};

export const deleteTodoAction = (id) => {
    return {type:actionType.DELETE_TODO, id};
};

export const modifyTodoAction = (id, content) => {
    return {type:actionType.UPDATE_TODO_CONTENT, id, content};
};

export const editStartAction = (id) => {
    return {type:actionType.EDIT_START, id};
};

export const loadTodoAction = () => {
    return async (dispatch) => {
         const response = await axios.get('/todos');
         const todos = response.data;
         dispatch({type:actionType.REFRESH_TODOS, todos});
    }
};

//--- second way for async action ---
/*
export const loadTodoAction = () => {
    return (dispatch) => {
        axios.get("/todos").then((response) => {
            const todos = response.data;
            dispatch({type:actionType.REFRESH_TODOS, todos});
        });

    }
};
*/