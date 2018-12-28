import * as actionType from "../constant/actionType";
import * as filterType from "../constant/filterType";

export const newTodoAction = (content) => {
    return {type:actionType.ADD_TODO, content};
};

export const updateTodoAction = (id, isToComplete) => {
    const type = isToComplete
                ? actionType.COMPLETE_TODO
                : actionType.CANCEL_COMPLETED_TODO;
    return {type, id};
};

export const changeFilter = (filter=filterType.ALL) => {
    return {type:actionType.CHANGE_FILTER, filter};
}
