import * as actionType from "../constant/actionType";

export const newTodoAction = (content) => {
    return {type:actionType.ADD_TODO, content};
};

export const updateTodoAction = (id, isToComplete) => {
    const type = isToComplete
                ? actionType.COMPLETE_TODO
                : actionType.CANCEL_COMPLETED_TODO;
    return {type, id};
};
