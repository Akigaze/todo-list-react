import {
    newTodoAction,
    updateTodoAction,
    changeFilterAction,
    deleteTodoAction,
    modifyTodoAction,
    editStartAction
} from "../../../src/action/todoListAction";
import * as actionType from "../../../src/constant/actionType";
import * as filterType from "../../../src/constant/filterType";

describe("Todo List Action Test", () => {
    it("should get a new todo action with todo content", () => {
        const action = newTodoAction("Learn Spring Boot");

        expect(action).toEqual(
            {type:actionType.ADD_TODO, content:"Learn Spring Boot"}
        );
    });

    it("should get a to complete todo action with todo id", () => {
        const action = updateTodoAction(1, true);

        expect(action).toEqual({type:actionType.COMPLETE_TODO, id:1});
    });

    it("should get a to cancel todo action with todo id", () => {
        const action = updateTodoAction(1, false);

        expect(action).toEqual({type:actionType.CANCEL_COMPLETED_TODO, id:1});
    });

    it("should get a change filter action with filter type", () => {
        const action = changeFilterAction(filterType.COMPLETED);

        expect(action).toEqual({type:actionType.CHANGE_FILTER, filter:filterType.COMPLETED});
    });

    it("should get a change filter action with ALL as default filter type", () => {
        const action = changeFilterAction();

        expect(action).toEqual({type:actionType.CHANGE_FILTER, filter:filterType.ALL});
    });

    it("should get a delete todo action with todo id", () => {
        const action = deleteTodoAction(1);

        expect(action).toEqual({type:actionType.DELETE_TODO, id:1});
    });

    it("should get a modify todo action with todo id and new content", () => {
        const action = modifyTodoAction(1, "Learn React");

        expect(action).toEqual({type:actionType.UPDATE_TODO_CONTENT, id:1, content: "Learn React"});
    });

    it("should get a edit start action with todo id", () => {
        const action = editStartAction(1);

        expect(action).toEqual({type:actionType.EDIT_START, id:1});
    });
});
