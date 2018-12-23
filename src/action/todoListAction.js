import {ADD_TODO} from "../constant/actionType";

export const newTodoAction = (content) => {
    return {type:ADD_TODO, content};
};
