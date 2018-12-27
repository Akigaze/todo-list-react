import {newTodoAction, updateTodoAction} from "../../../src/action/todoListAction";
import * as actionType from "../../../src/constant/actionType";

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
});
