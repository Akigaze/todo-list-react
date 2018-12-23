import reducer from "../../../src/reducer/todoListReducer";
import {ADD_TODO} from "../../../src/constant/actionType";
import {ALL} from "../../../src/constant/filterType";


describe("Todo List Reducer Test", () => {
    let initedState;

    beforeEach(function() {
        initedState = {
            todos: [],
            filter: ALL
        }
    });

    it("should return initail state with todos and filter", function() {
        const state = reducer();

        expect(state).toHaveProperty("todos", []);
        expect(state).toHaveProperty("filter", ALL);
    });

    it("should add a todo to the todos of state when get ADD_TODO action", function() {
        const action = {type:ADD_TODO, content:"Learn Spring Boot"};
        const expectTodo = {
            id:expect.any(Number),
            content:"Learn Spring Boot",
            completed:false
        };
        const state = reducer(undefined, action);

        expect(state.todos).toHaveLength(1);
        expect(state.todos).toContainEqual(expectTodo);
    });
})
