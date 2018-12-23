import {newTodoAction} from "../../../src/action/todoListAction";
import {ADD_TODO} from "../../../src/constant/actionType";

describe("Todo List Action Test", function() {
    it("should get a new todo action with todo content", function() {
        const action = newTodoAction("Learn Spring Boot");

        expect(action).toEqual({type:ADD_TODO, content:"Learn Spring Boot"})
    });
});
